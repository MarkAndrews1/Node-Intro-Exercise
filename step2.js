const fs = require('fs');
const axios = require('axios');

const argv = process.argv;
const path = argv[2]

function cat(arg){
    fs.readFile(arg, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            process.exit(1);
          }
          console.log(data)
    })
}

async function webCat(arg) {
    try {
        let res = await axios.get(arg)
        console.log(res)
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

if(path.slice(0,4)  === 'http'){
    webCat(path)
}else {
    cat(path)
}