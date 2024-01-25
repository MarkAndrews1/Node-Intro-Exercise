const fs = require('fs');
const axios = require('axios');

const argv = process.argv;
let path;

function cat(path, output) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        if (output) {
            catWrite(output, data)
        } else {
            console.log(data)
        }
    })
}

function catWrite(output, text) {
    fs.writeFile(output, text, "utf8", function (err) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Successfully copied to ${output}!`);
    });
}

async function webCat(url, output) {
    try {
        let res = await axios.get(url)
        if (output) {
            webCatWrite(output, res.data)
        } else {
            console.log(res)
        }
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

async function webCatWrite(output, content) {
    fs.writeFile(output, content, "utf8", function (err) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Successfully copied to ${output}!`);
    });
}


if (argv[2] === '--out') {
    path = argv[4]
    output = argv[3]

    if (path.slice(0, 4) === 'http') {
        webCat(path, output)
    } else {
        cat(path, output)
    }
} else {
    path = argv[2]
    if (path.slice(0, 4) === 'http') {
        webCat(path)
    } else {
        cat(path)
    }
}

