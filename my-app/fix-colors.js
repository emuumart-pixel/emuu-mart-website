const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('./src');
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;
  content = content.replace(/shadow-pink/g, 'shadow-md');
  content = content.replace(/bg-soft-pink/g, 'bg-soft-bg');
  content = content.replace(/bg-mid-pink/g, 'bg-gray-200');
  content = content.replace(/border-pink-50/g, 'border-gray-100');
  content = content.replace(/border-pink-100/g, 'border-gray-200');
  content = content.replace(/from-soft-pink/g, 'from-gray-100');
  content = content.replace(/to-mid-pink/g, 'to-gray-200');
  content = content.replace(/hover:bg-soft-pink/g, 'hover:bg-soft-bg');
  content = content.replace(/hover:bg-mid-pink/g, 'hover:bg-gray-200');
  if (content !== original) {
    fs.writeFileSync(f, content, 'utf8');
  }
});
console.log('Colors replaced successfully');
