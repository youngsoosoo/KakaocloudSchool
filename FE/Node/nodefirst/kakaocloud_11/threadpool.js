const crypto = require('crypto');

const pass = 'pass';
const salt = 'salt';
const start = 'start';

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log("1:", Date.now() - start);
})