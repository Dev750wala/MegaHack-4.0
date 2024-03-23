const { spawn } = require('child_process');


const pythonScript = 'scanner.py';


const imagePath = 'demo.png';

// Spawn a Python process to run the script
const pythonProcess = spawn('python', [pythonScript, imagePath]);

pythonProcess.stdout.on('data', (data) => {
  console.log(`Python script stdout: ${data}`);
});

pythonProcess.stderr.on('data', (data) => {
  console.error(`Python script stderr: ${data}`);
});

pythonProcess.on('close', (code) => {
  console.log(`Python script process exited with code ${code}`);
  if (code === 0) {
    console.log('Process completed successfully');
  } else {
    console.error('Process failed');
  }
});
