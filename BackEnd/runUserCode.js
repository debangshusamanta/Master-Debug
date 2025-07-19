import fs from 'fs';
import { exec } from 'child_process';
import path from 'path';
import os from 'os';
import crypto from 'crypto';

const tempDir = os.tmpdir(); // safer cross-platform temp folder

const generateUniqueFilename = (language) => {
  const id = crypto.randomBytes(6).toString('hex');
  if (language === 'java') return `Main_${id}`;
  return `temp-${id}`;
};

const runCode = (language, code, input) => {
  return new Promise((resolve, reject) => {
    const filename = generateUniqueFilename(language);
    let filePath = '';
    let compileCmd = [];
    let runCmd = [];

    // File setup
    switch (language) {
      case 'cpp':
        filePath = path.join(tempDir, `${filename}.cpp`);
        compileCmd = ['g++', filePath, '-o', path.join(tempDir, filename)];
        runCmd = [path.join(tempDir, filename)];
        break;
      case 'java':
        filePath = path.join(tempDir, `${filename}.java`);
        compileCmd = ['javac', filePath];
        runCmd = ['java', '-cp', tempDir, filename];
        break;
      case 'python':
        filePath = path.join(tempDir, `${filename}.py`);
        runCmd = ['python', filePath];
        break;
      case 'javascript':
        filePath = path.join(tempDir, `${filename}.js`);
        runCmd = ['node', filePath];
        break;
      default:
        return reject("Unsupported language");
    }

    // Write file
    try {
      fs.writeFileSync(filePath, code);
    } catch (err) {
      return reject("❌ Failed to write file: " + err.message);
    }

    const runCompiledCode = () => {
      const execProcess = exec(runCmd.join(' '), (err, stdout, stderr) => {
        cleanupFiles(); // Cleanup no matter what
        if (err) return reject(stderr || err.message);
        return resolve(stdout);
      });

      if (input) {
        execProcess.stdin.write(input);
        execProcess.stdin.end();
      }
    };

    const cleanupFiles = () => {
      try {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath); // source
        if (language === 'cpp' && fs.existsSync(path.join(tempDir, filename))) {
          fs.unlinkSync(path.join(tempDir, filename)); // binary
        }
        if (language === 'java' && fs.existsSync(path.join(tempDir, `${filename}.class`))) {
          fs.unlinkSync(path.join(tempDir, `${filename}.class`));
        }
      } catch (cleanupErr) {
        console.warn("⚠️ Cleanup warning:", cleanupErr.message);
      }
    };

    if (language === 'cpp' || language === 'java') {
      exec(compileCmd.join(' '), (err, stdout, stderr) => {
        if (err) {
          cleanupFiles();
          return reject(stderr || err.message);
        }
        runCompiledCode();
      });
    } else {
      runCompiledCode(); // No compile step
    }
  });
};

export default runCode;
