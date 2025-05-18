#!/usr/bin/env node

/**
 * BookMouse - A minimal ISBN validator
 * 
 * Usage: node bookMouse.js <ISBN>
 */

// Get ISBN from command line arguments
const isbn = process.argv[2];

if (!isbn) {
  console.error('Please provide an ISBN number as an argument');
  console.error('Usage: node bookMouse.js <ISBN>');
  process.exit(1);
}

// Remove any hyphens or spaces from the ISBN
const cleanISBN = isbn.replace(/[-\s]/g, '');

/**
 * Validates ISBN-10
 * @param {string} isbn - The ISBN-10 string to validate
 * @returns {boolean} - Whether the ISBN-10 is valid
 */
function validateISBN10(isbn) {
  if (isbn.length !== 10) return false;
  
  // Check if all characters except last are digits
  // Last character can be 'X' (representing 10)
  if (!/^\d{9}[\dX]$/.test(isbn)) return false;
  
  // Calculate checksum
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(isbn[i]) * (10 - i);
  }
  
  // Handle the check digit (last character)
  const lastChar = isbn[9];
  if (lastChar === 'X') {
    sum += 10;
  } else {
    sum += parseInt(lastChar);
  }
  
  return sum % 11 === 0;
}

/**
 * Validates ISBN-13
 * @param {string} isbn - The ISBN-13 string to validate
 * @returns {boolean} - Whether the ISBN-13 is valid
 */
function validateISBN13(isbn) {
  if (isbn.length !== 13) return false;
  
  // All characters must be digits
  if (!/^\d{13}$/.test(isbn)) return false;
  
  // Calculate checksum
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(isbn[i]) * (i % 2 === 0 ? 1 : 3);
  }
  
  const checkDigit = (10 - (sum % 10)) % 10;
  return parseInt(isbn[12]) === checkDigit;
}

// Determine which validation to use based on length
if (cleanISBN.length === 10) {
  if (validateISBN10(cleanISBN)) {
    console.log(`🐭 BookMouse says: ${isbn} is a valid ISBN-10! 📚`);
  } else {
    console.log(`🐭 BookMouse says: ${isbn} is NOT a valid ISBN-10! ❌`);
  }
} else if (cleanISBN.length === 13) {
  if (validateISBN13(cleanISBN)) {
    console.log(`🐭 BookMouse says: ${isbn} is a valid ISBN-13! 📚`);
  } else {
    console.log(`🐭 BookMouse says: ${isbn} is NOT a valid ISBN-13! ❌`);
  }
} else {
  console.log(`🐭 BookMouse says: ${isbn} is not a valid ISBN format! ❌`);
  console.log('ISBNs should be 10 or 13 digits (excluding hyphens or spaces)');
}