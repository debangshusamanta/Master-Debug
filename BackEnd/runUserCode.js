import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const tempDir = path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

function detectLanguage(code) {
  if (code.includes('#include') && code.includes('int main')) return 'cpp';
  if (code.includes('public class') || code.includes('System.out')) return 'java';
  if (code.includes('def ') || code.includes('print(')) return 'python';
  return null;
}

export default function runUserCode(code, input = "", languageOverride = "") {
  return new Promise((resolve, reject) => {
    if (!code || typeof code !== 'string') return reject("❌ Code is empty or invalid.");

    const language = languageOverride || detectLanguage(code);
    if (!language) return reject("❌ Could not detect language from code.");

    const filename = language === 'java' ? 'Main' : `temp-${Date.now()}`;
    let fileExt = '', compileCmd = [], runCmd = [];

    switch (language) {
      case 'cpp':
        fileExt = 'cpp';
        compileCmd = ['g++', `${tempDir}/${filename}.cpp`, '-o', `${tempDir}/${filename}`];
        runCmd = [`${tempDir}/${filename}`];
        break;

      case 'java':
        fileExt = 'java';
        compileCmd = ['javac', `${tempDir}/${filename}.java`];
        runCmd = ['java', '-cp', tempDir, filename];
        break;

      case 'python':
        fileExt = 'py';
        runCmd = ['python', `${tempDir}/${filename}.py`];
        break;

      default:
        return reject("❌ Unsupported language.");
    }

    const filePath = `${tempDir}/${filename}.${fileExt}`;
    fs.writeFileSync(filePath, code);

    const runProcess = () => {
      const proc = spawn(runCmd[0], runCmd.slice(1), { timeout: 8000 });

      let stdout = '', stderr = '';

      proc.stdout.on('data', (data) => stdout += data.toString());
      proc.stderr.on('data', (data) => stderr += data.toString());

      // 🟢 Feed input only if non-empty, always end stdin
      if (typeof input === 'string') {
        proc.stdin.write(input.endsWith('\n') ? input : input + '\n');
        proc.stdin.end();
      }

      proc.on('close', (exitCode) => {
        try {
          fs.unlinkSync(filePath);
          if (language === 'cpp') fs.unlinkSync(`${tempDir}/${filename}`);
          if (language === 'java') fs.unlinkSync(`${tempDir}/${filename}.class`);
        } catch {}

        if (exitCode !== 0) {
          return reject(`❌ Execution failed with exit code ${exitCode}:\n${stderr}`);
        }

        resolve(stdout || "✅ Code ran successfully, but no output.");
      });
    };

    if (compileCmd.length > 0) {
      const compile = spawn(compileCmd[0], compileCmd.slice(1));
      let compileErr = '';

      compile.stderr.on('data', (data) => compileErr += data.toString());

      compile.on('close', (exitCode) => {
        if (exitCode !== 0) {
          try { fs.unlinkSync(filePath); } catch {}
          return reject(`❌ Compilation failed:\n${compileErr}`);
        }
        runProcess();
      });
    } else {
      runProcess();
    }
  });
}
