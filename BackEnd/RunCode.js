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
  if (code.includes('console.log') || code.includes('function')) return 'js';
  return null;
}

export default function runCode(code) {
  return new Promise((resolve, reject) => {
    if (!code || typeof code !== 'string') return reject("❌ Code is empty or invalid.");

    const language = detectLanguage(code);
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

      case 'js':
        fileExt = 'js';
        runCmd = ['node', `${tempDir}/${filename}.js`];
        break;
    }

    const filePath = `${tempDir}/${filename}.${fileExt}`;
    fs.writeFileSync(filePath, code);

    const runProcess = () => {
      const proc = spawn(runCmd[0], runCmd.slice(1));
      let stdout = '', stderr = '';

      const timeout = setTimeout(() => {
        proc.kill();
        return reject("⏰ Execution timed out after 5 seconds.");
      }, 5000);

      proc.stdout.on('data', data => stdout += data.toString());
      proc.stderr.on('data', data => stderr += data.toString());

      proc.on('close', code => {
        clearTimeout(timeout);

        try {
          fs.unlinkSync(filePath);
          if (language === 'cpp') fs.unlinkSync(`${tempDir}/${filename}`);
          if (language === 'java') fs.unlinkSync(`${tempDir}/${filename}.class`);
        } catch (err) {
          console.error("⚠️ Cleanup failed:", err);
        }

        if (code !== 0 && language !== 'java' && language !== 'python') {
          return reject(`❌ Runtime Error:\n${stderr || 'Unknown error occurred'}`);
        }

        resolve(`🎉 Congratulations! ✅ You successfully fixed all bugs!\n\n Your Output:\n${stdout}`);
      });
    };

    if (compileCmd.length > 0) {
      const compile = spawn(compileCmd[0], compileCmd.slice(1));
      let compileErr = '';

      compile.stderr.on('data', data => compileErr += data.toString());

      compile.on('close', code => {
        // Java-specific: check if .class file exists
        if (language === 'java') {
          const classFilePath = `${tempDir}/${filename}.class`;
          if (!fs.existsSync(classFilePath)) {
            fs.unlinkSync(filePath);
            return reject(`❌ Java compilation failed:\n${compileErr || 'No class file generated.'}`);
          }
        }

        if (code !== 0) {
          fs.unlinkSync(filePath);
          return reject(`❌ Compilation Error:\n${compileErr}`);
        }

        runProcess();
      });
    } else {
      runProcess();
    }
  });
}
