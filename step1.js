const fs = require('fs');

function cat(arg){
    fs.readFile(arg, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            process.exit(1);
          }
          console.log(data)
    })
}

cat(process.argv[2])