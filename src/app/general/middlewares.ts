import bcrypt from 'bcryptjs-react';
import tweetnacl from 'tweetnacl';
import util from 'tweetnacl-util';
import { tStorageInitialState } from '../storage/storageTypes';

// Scroll to element
export const scrollToElement = (
  behavior: 'auto' | 'smooth' = 'auto',
  element: Element | (Window & typeof globalThis) = window,
) => {
  element.scrollTo({
    top: 0,
    left: 0,
    behavior: behavior,
  });
};

// Set data into localstorage
export const setLocalStorage = (
  key: string,
  value: string | object | object[],
) => {
  if (typeof value !== 'string') value = JSON.stringify(value);
  localStorage.setItem(key, value);
};

// Get data from localstorage
export const getLocalStorage = (key: string) => {
  const value = localStorage.getItem(key);
  if (value) {
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  } else {
    return null;
  }
};

// Hash password
export const bcryptHash = async (password: string) => {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
};

// Check password
export const bcryptCompare = async (
  password: string,
  hashedPassword: string,
) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Creating secretbox parts
const tweetNaClSecretBoxParts = (password: string) => {
  // Convert the password string to bytes in UTF-8 encoding
  const passwordBytes = util.decodeUTF8(password);
  // Hash the password to derive a symmetric encryption key
  const fullHash = tweetnacl.hash(passwordBytes);
  // Get the length of full hash
  const fullHashLength = fullHash.length;
  // Get the length of password
  const passwordLength = password.length;
  // Get hash closure function
  const getHash = (length: number) => {
    // Set initial positions
    const positions = { start: 0, end: 0 };
    // Starting from the lenght of key or nonce minus password position
    positions.start = length - passwordLength;
    // Starting from the lenght of password minus key or nonce position
    if (positions.start < 0) {
      positions.start = passwordLength - length;
    }
    // Check max length is not over the full hash length
    if (fullHashLength - positions.start - length >= 0) {
      // End position is under or equal the full hash length
      positions.end = positions.start + length;
    } else {
      // End position is over the full hash length so start from the beginning
      positions.start = 0;
      positions.end = length - 1;
    }
    //Return subarray of full hash
    return fullHash.subarray(positions.start, positions.end);
  };
  // Get the hash for nonce
  const nonce = getHash(tweetnacl.secretbox.nonceLength);
  // Reverses the full hash before key generation for increasing the security
  fullHash.reverse();
  // Get the hash for key
  const key = getHash(tweetnacl.secretbox.keyLength);
  // Return the key and nonce
  return { nonce, key };
};

// Encrypt data with password
export const tweetNaClEncryptData = (
  data: any,
  password: string,
): false | string => {
  // Convert the data to bytes in UTF-8 encoding
  const dataBytes = util.decodeUTF8(JSON.stringify(data));
  // Get symmetric key and nonce to secretbox
  const { nonce, key } = tweetNaClSecretBoxParts(password);
  // Encrypt the data using the symmetric key and nonce
  const encryptedBytes = tweetnacl.secretbox(dataBytes, nonce, key);
  // Return the encrypted data in Base64 string or false if encrypting failed
  return encryptedBytes ? util.encodeBase64(encryptedBytes) : false;
};

// Decrypt data with password
export const tweetNaClDecryptData = (
  encryptedData: string,
  password: string,
): false | tStorageInitialState['decodedData'] => {
  // Decode the encrypted data from Base64 to obtain the actual bytes
  const encryptedBytes = util.decodeBase64(encryptedData);
  // Get symmetric key and nonce to secretbox
  const { nonce, key } = tweetNaClSecretBoxParts(password);
  // Decrypt the data using the symmetric key and nonce
  const decryptedBytes = tweetnacl.secretbox.open(encryptedBytes, nonce, key);
  // If the decryption failed return false
  if (!decryptedBytes) {
    return false;
  }
  // Convert the decrypted bytes back to a UTF-8 string and parse it as JSON to get the original data
  const decryptedData = util.encodeUTF8(decryptedBytes);
  // Return parsed data
  return JSON.parse(decryptedData);
};
