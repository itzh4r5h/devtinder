import crypto from "node:crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;
const KEY_VERSION = 1;
const HKDF_INFO = "devtinder-chat-v1";

let masterKey = null;

// call once on startup - the server must not run without a valid key
export const assertChatKey = () => {
  const key = process.env.CHAT_ENCRYPTION_KEY;
  if (!key || !/^[0-9a-f]{64}$/i.test(key)) {
    throw new Error("CHAT_ENCRYPTION_KEY must be 32 bytes as 64 hex characters");
  }
  masterKey = Buffer.from(key, "hex");
};

const getMasterKey = () => {
  if (!masterKey) assertChatKey();
  return masterKey;
};

// every conversation gets its own key derived from the master key
const getConversationKey = (conversationId) =>
  Buffer.from(crypto.hkdfSync("sha256", getMasterKey(), conversationId.toString(), HKDF_INFO, 32));

// binds the ciphertext to its conversation and sender, so a row moved or edited in the db fails to decrypt
const getAad = (conversationId, senderId) => Buffer.from(`${conversationId}:${senderId}`);

export const encryptMessage = (text, conversationId, senderId) => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, getConversationKey(conversationId), iv);
  cipher.setAAD(getAad(conversationId, senderId));

  const ciphertext = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);

  return {
    ciphertext: ciphertext.toString("base64"),
    iv: iv.toString("base64"),
    authTag: cipher.getAuthTag().toString("base64"),
    keyVersion: KEY_VERSION,
  };
};

// returns null if the message was tampered with or can't be decrypted
export const decryptMessage = ({ ciphertext, iv, authTag, sender }, conversationId) => {
  try {
    const decipher = crypto.createDecipheriv(
      ALGORITHM,
      getConversationKey(conversationId),
      Buffer.from(iv, "base64"),
    );
    decipher.setAAD(getAad(conversationId, sender._id ?? sender));
    decipher.setAuthTag(Buffer.from(authTag, "base64"));

    return Buffer.concat([
      decipher.update(Buffer.from(ciphertext, "base64")),
      decipher.final(),
    ]).toString("utf8");
  } catch {
    return null;
  }
};
