const fs = require('fs');
const path = require('path');

const dist = path.join(__dirname, 'dist');
if (fs.existsSync(dist)) {
  fs.rmSync(dist, { recursive: true, force: true });
}
fs.mkdirSync(dist, { recursive: true });

// Copy all root HTML, TXT, JSON, MD files
fs.readdirSync(__dirname).forEach(file => {
  if (file.endsWith('.html') || file.endsWith('.txt') || file.endsWith('.md') || file === 'vercel.json') {
    fs.copyFileSync(path.join(__dirname, file), path.join(dist, file));
  }
});

// Recursively copy assets directory
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const assetsDir = path.join(__dirname, 'assets');
if (fs.existsSync(assetsDir)) {
  copyDir(assetsDir, path.join(dist, 'assets'));
}

console.log('Build completed successfully. Files copied to dist/.');
