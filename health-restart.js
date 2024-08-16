const fs = require('fs');

// Path to the file you want to modify
const filePath = './mock';

// Read the file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Modify the file content
  const modifiedData = data.replace('old text', 'new text');

  // Write the modified content back to the file
  fs.writeFile(filePath, modifiedData, 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    console.log('File successfully modified.');
  });
});
