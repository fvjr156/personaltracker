const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

const bundledHtmlPath = path.join(__dirname, 'dist', 'index.html');
let targetPath = bundledHtmlPath;

try {
  if (fs.existsSync(bundledHtmlPath)) {
    const htmlContent = fs.readFileSync(bundledHtmlPath);
    targetPath = path.join(os.tmpdir(), 'personaltracker.html');
    fs.writeFileSync(targetPath, htmlContent);
  }
} catch (err) {
  console.error('Failed to stage temporary file:', err);
}

const command = process.platform === 'win32' 
  ? `start "" "${targetPath}"` 
  : process.platform === 'darwin' 
    ? `open "${targetPath}"` 
    : `xdg-open "${targetPath}"`;

exec(command, (err) => {
  if (err) {
    console.error('Failed to open browser:', err);
  }
});