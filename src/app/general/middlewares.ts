import bcrypt from 'bcryptjs-react';
import tweetnacl from 'tweetnacl';
import tweetnaclUtil from 'tweetnacl-util';
import { tReposition, tStringObject } from './types';
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
  // convert the password string to bytes in UTF-8 encoding
  const passwordBytes = tweetnaclUtil.decodeUTF8(password);
  // hash the password to derive a symmetric encryption key
  const fullHash = tweetnacl.hash(passwordBytes);
  // get the length of full hash
  const fullHashLength = fullHash.length;
  // get the length of password
  const passwordLength = password.length;
  // get hash closure function
  const getHash = (length: number) => {
    // set initial positions
    const positions = { start: 0, end: 0 };
    // starting from the lenght of key or nonce minus password position
    positions.start = length - passwordLength;
    // starting from the lenght of password minus key or nonce position
    if (positions.start < 0) {
      positions.start = passwordLength - length;
    }
    // check max length is not over the full hash length
    if (fullHashLength - positions.start - length >= 0) {
      // end position is under or equal the full hash length
      positions.end = positions.start + length;
    } else {
      // end position is over the full hash length so start from the beginning
      positions.start = 0;
      positions.end = length;
    }
    // return subarray of full hash
    return fullHash.subarray(positions.start, positions.end);
  };
  // get the hash for nonce
  const nonce = getHash(tweetnacl.secretbox.nonceLength);
  // reverses the full hash before key generation for increasing the security
  fullHash.reverse();
  // get the hash for key
  const key = getHash(tweetnacl.secretbox.keyLength);
  // return the key and nonce
  return { nonce, key };
};

// Encrypt data with password
export const tweetNaClEncryptData = (
  data: any,
  password: string,
): false | string => {
  // convert the data to bytes in UTF-8 encoding
  const dataBytes = tweetnaclUtil.decodeUTF8(JSON.stringify(data));
  // get symmetric key and nonce to secretbox
  const { nonce, key } = tweetNaClSecretBoxParts(password);
  // encrypt the data using the symmetric key and nonce
  const encryptedBytes = tweetnacl.secretbox(dataBytes, nonce, key);
  // return the encrypted data in Base64 string or false if encrypting failed
  return encryptedBytes ? tweetnaclUtil.encodeBase64(encryptedBytes) : false;
};

// Decrypt data with password
export const tweetNaClDecryptData = (
  encryptedData: string,
  password: string,
): false | tStorageInitialState['decodedData'] => {
  // decode the encrypted data from Base64 to obtain the actual bytes
  const encryptedBytes = tweetnaclUtil.decodeBase64(encryptedData);
  // get symmetric key and nonce to secretbox
  const { nonce, key } = tweetNaClSecretBoxParts(password);
  // decrypt the data using the symmetric key and nonce
  const decryptedBytes = tweetnacl.secretbox.open(encryptedBytes, nonce, key);
  // if the decryption failed return false
  if (!decryptedBytes) {
    return false;
  }
  // convert the decrypted bytes back to a UTF-8 string
  const decryptedData = tweetnaclUtil.encodeUTF8(decryptedBytes);
  // return parsed original data
  return JSON.parse(decryptedData);
};

// Convert a string first letter upper case and all others to lower case
export const upperCaseFirst = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

// General alphabetic reorder
export const alphabetReorder = <T extends tStringObject>(
  array: T[],
  key: keyof T,
  ascend = true,
) => {
  // creating a deep copied array to avoid mutating the original array
  const sortedArray = [...array];
  // sorting function
  const sorting = (a: T, b: T) =>
    a[key].localeCompare(b[key], undefined, { sensitivity: 'accent' });
  // reverse the array elements if descending order is required
  return ascend
    ? sortedArray.sort(sorting)
    : sortedArray.sort((a, b) => sorting(b, a));
};

// Repostioning object array blocks
export const repositionBlocks = <T>(
  blockKey: keyof T,
  dataBlocks: T[],
  repositionedBlockId: tReposition['id'],
  selectedBlock: tReposition,
) => {
  let index = 0;
  const repositionedBlock = { index: 0, data: {} as T };
  const reorderedData = [] as T[];
  dataBlocks.forEach((block) => {
    // storing data of repositioned block
    if (block[blockKey] === repositionedBlockId) {
      repositionedBlock.data = block;
    } else {
      // the insertion occurs before or after this selected block
      if (block[blockKey] === selectedBlock.id) {
        // if repositioned block is wanted to be pushed after the selected block
        if (selectedBlock.position === 'after') {
          // selected block push before the repositioned block
          reorderedData.push(block);
          // increase index to show the next position of reordered data array
          index++;
        }
        // push an empty block into the new position for repositioned block
        reorderedData.push({} as T);
        // store current index of reordered data array for repositioned block
        repositionedBlock.index = index;
        // increase index to show the next position of reordered data array
        index++;
        // if the insertion occurs after the selected block, goes the next round to avoid pushing selected block into the array again in next steps
        if (selectedBlock.position === 'after') {
          return;
        }
      }
      // push blocks into reordered array
      reorderedData.push(block);
      // increase index to show the next position of reordered data array
      index++;
    }
  });
  // insert the repositioned block at its new position
  reorderedData[repositionedBlock.index] = repositionedBlock.data;
  return reorderedData;
};
