const randomWords = require("random-words");
const CryptoJS = require('crypto-js')

exports.handler = async function (event, context) {
    let words = randomWords({
        exactly: 10,
        wordsPerString: 1,
        min: 5,
        maxLength: 5,
        formatter: (word) => word.toUpperCase(),
    }).filter((word) => word.length === 5);
    const myPassword = process.env.SALT_KEY || "test";
    let encrypted = CryptoJS.AES.encrypt(JSON.stringify(words), myPassword).toString();
    return {
        statusCode: 200,
        body: JSON.stringify({ dados: encrypted })
    }

}