const fs = require('fs');
const path = require('path');

const folderPath = 'd:/xinconan/bookfree'; // 替换为指定文件夹的路径

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  files.forEach(file => {
    const extname = path.extname(file);
    const filename = path.basename(file, extname);
    
    if (extname === '.PDF') {
      const oldPath = path.join(folderPath, file);
      const newPath = path.join(folderPath, `${filename}.pdf`);

      fs.rename(oldPath, newPath, err => {
        if (err) {
          console.error(err);
        } else {
          console.log(`Renamed file: ${file}`);
        }
      });
    }
  });
});