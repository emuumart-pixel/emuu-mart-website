const fs = require('fs');
const path = require('path');

function extractStyle(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const start = content.indexOf('<style>');
  const end = content.indexOf('</style>');
  if (start !== -1 && end !== -1) {
    return content.substring(start + 7, end).trim();
  }
  return '';
}

const indexCss = extractStyle(path.join(__dirname, '../index.html'));
const adminCss = extractStyle(path.join(__dirname, '../admin.html'));

const combinedCss = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Playfair+Display:wght@700&display=swap');

/* ====== STOREFRONT STYLES ====== */
${indexCss}

/* ====== ADMIN STYLES ====== */
${adminCss}
`;

fs.writeFileSync(path.join(__dirname, 'src/index.css'), combinedCss);
console.log('CSS extracted successfully to src/index.css');
