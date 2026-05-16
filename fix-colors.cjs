const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/bg-brand-primary/g, 'bg-[#283628]');
  content = content.replace(/text-brand-primary/g, 'text-[#283628]');
  content = content.replace(/border-brand-primary/g, 'border-[#283628]');
  content = content.replace(/bg-brand-tint/g, 'bg-[#E8EDE8]');
  content = content.replace(/bg-brand-light/g, 'bg-[#3D5A3D]');
  fs.writeFileSync(filePath, content);
}

function walkDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    let fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      replaceInFile(fullPath);
    }
  });
}

walkDir(path.join(__dirname, 'src'));
console.log('Replaced all brand classes with hex codes.');
