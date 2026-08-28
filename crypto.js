// MyVault - Secure Crypto Module
// Real vault encryption will use Web Crypto API.

const MyVaultCrypto = {

  async deriveKey(masterPassword, salt) {
    const encoder = new TextEncoder();

    const passwordKey = await crypto.subtle.importKey(
      "raw",
      encoder.encode(masterPassword),
      "PBKDF2",
      false,
      ["deriveKey"]
    );

    return crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: salt,
        iterations: 600000,
        hash: "SHA-256"
      },
      passwordKey,
      {
        name: "AES-GCM",
        length: 256
      },
      false,
      ["encrypt", "decrypt"]
    );
  },

  randomBytes(length = 16) {
    return crypto.getRandomValues(
      new Uint8Array(length)
    );
  },

  async encrypt(key, data) {
    const encoder = new TextEncoder();
    const iv = this.randomBytes(12);

    const encrypted = await crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv
      },
      key,
      encoder.encode(JSON.stringify(data))
    );

    return {
      iv: Array.from(iv),
      data: Array.from(new Uint8Array(encrypted))
    };
  },

  async decrypt(key, encryptedData) {
    const decoder = new TextDecoder();

    const decrypted = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: new Uint8Array(encryptedData.iv)
      },
      key,
      new Uint8Array(encryptedData.data)
    );

    return JSON.parse(decoder.decode(decrypted));
  }
};
