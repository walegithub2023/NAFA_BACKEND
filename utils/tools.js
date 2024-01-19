const crypto = require("node:crypto");
const iv = crypto.randomBytes(16);
const jwt = require("jsonwebtoken");

//token payload encryption and decryption before sign
const encrypt = (text) => {
  let cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(process.env.CUSTOM_ENCRPYTION_SECRET),
    iv
  );
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString("hex"), encryptedData: encrypted.toString("hex") };
};

// decrpyt encrypted information
const decrypt = (text) => {
  let iv = Buffer.from(text.iv, "hex");
  let encryptedText = Buffer.from(text.encryptedData, "hex");

  let decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(process.env.CUSTOM_ENCRPYTION_SECRET),
    iv
  );
  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

const createJwtToken = async (info) => {
  return await jwt.sign(info, process.env.JWT_ENCRPYTION_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = {
  encrypt,
  decrypt,
  createJwtToken,
};
