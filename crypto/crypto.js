const crypto = require('crypto');
require("dotenv").config();


const encryptionKey ="0123456789ABCDEF0123456789ABCDEF";

function encrypt(data) {
  const iv = crypto.randomBytes(16).toString('hex');
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(encryptionKey), Buffer.from(iv, 'hex'));
  let encryptedData = cipher.update(JSON.stringify(data), 'utf8', 'base64');
  encryptedData += cipher.final('base64');
  return {
    iv: iv,
    data: encryptedData,
  };
}

function decrypt(encryptedData) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(encryptionKey), Buffer.from(encryptedData.iv, 'hex'));
  let decryptedData = decipher.update(encryptedData.data, 'base64', 'utf8');
  decryptedData += decipher.final('utf8');
  return JSON.parse(decryptedData);
}

module.exports = {
  encrypt,
  decrypt,
};
