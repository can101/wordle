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
    const myPassword = "mSc2xpeKAEWTEMtUDjG7VpugySMAQjZL3nj6aLbJDv5xW3T2eY9BKGsbh6sPrVuwrMcNjFwCtRj7mFjuW9AEpmWwH3Px38vr7ShnRDcEXCEHrBwTaSFDM4sRwJ9ZghTHFuAHpPpQTVPtvzn8wrpEfWNBZVMdwULmzse6dU4kxWVVvSNrGdTfWYe5cDhbmwqGaWQyrTE654BFPaSHKBTQEJxfMqNuWMNCnHwuEAXTrZYhybhe4VPcEUt6BszLPKrsTtpyx7yQRsGrvRFfhcSr4M2hLXyWtuY7tRrSBdhPTRAV5QtpA6vS4nfCTxuptTNtyQ9KEdRPGStRUTa2TeH76hTressyMFv5VP7Pnk5x6HjHz8ZNcJ2cAKfYzrn3sJ8Src3Hk6wmW9XjXzBUBCuabcMbTSYNyRz8tkm6FLDfWtcgRT8eZEUHNKdBwCjz997aEdhCCru7e3NUF6qypnrfAHm2Y6ANSHm8PgeTR5xm4cMMKm6qFz3vaTK8JHf8C8xrmSc2xpeKAEWTEMtUDjG7VpugySMAQjZL3nj6aLbJDv5xW3T2eY9BKGsbh6sPrVuwrMcNjFwCtRj7mFjuW9AEpmWwH3Px38vr7ShnRDcEXCEHrBwTaSFDM4sRwJ9ZghTHFuAHpPpQTVPtvzn8wrpEfWNBZVMdwULmzse6dU4kxWVVvSNrGdTfWYe5cDhbmwqGaWQyrTE654BFPaSHKBTQEJxfMqNuWMNCnHwuEAXTrZYhybhe4VPcEUt6BszLPKrsTtpyx7yQRsGrvRFfhcSr4M2hLXyWtuY7tRrSBdhPTRAV5QtpA6vS4nfCTxuptTNtyQ9KEdRPGStRUTa2TeH76hTressyMFv5VP7Pnk5x6HjHz8ZNcJ2cAKfYzrn3sJ8Src3Hk6wmW9XjXzBUBCuabcMbTSYNyRz8tkm6FLDfWtcgRT8eZEUHNKdBwCjz997aEdhCCru7e3NUF6qypnrfAHm2Y6ANSHm8PgeTR5xm4cMMKm6qFz3vaTK8JHf8C8xr";
    // const myPassword = process.env.SALT_KEY;
    let encrypted = CryptoJS.AES.encrypt(JSON.stringify(words), myPassword).toString();
    return {
        statusCode: 200,
        body: JSON.stringify({ dados: encrypted, myPassword })
    }

}