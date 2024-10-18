//doc
function getRandomInt(min, max) {
  if (typeof min !== "number" || typeof max !== "number" || min > max) {
    throw new Error(
      "Invalid arguments: 'min' must be less than 'max' and both must be numbers."
    );
  }
  const range = max - min + 1;
  return Math.floor(Math.random() * range) + min;
}

//explain
function calculateCircleArea(radius) {
  if (typeof radius !== "number" || radius < 0) {
    throw new TypeError("The radius must be a non-negative number.");
  }
  return Math.PI * radius * radius;
}

function constructFullName(firstName, lastName) {
  if (typeof firstName !== "string" || typeof lastName !== "string") {
    throw new TypeError("The names must be strings.");
  }
  return `${firstName} ${lastName}`;
}

//fix
/**
 * Validates a credit card number and returns the card type.
 *
 * @param {string} cardNumber - The credit card number to validate.
 * @returns {string} - The type of the credit card (e.g., "VISA", "MasterCard", "American Express", "Discover") or "Invalid Card Number" if the card number is not valid.
 */
function validateCreditCard2(cardNumber) {
  if (cardNumber.length === 16) {
    if (cardNumber.startsWith("4")) {
      return "VISA";
    } else if (cardNumber.startsWith("5")) {
      return "MasterCard";
  } else if (cardNumber.length === 15) {
    if (cardNumber.startsWith("3")) {
      return "American Express";
    }
  } else if (cardNumber.length === 16) {
    if (cardNumber.startsWith("6")) {
      return "Discover";
    }
  } else {
    return "Invalid Card Number";
  }
}

//fix right-click
function findLargestNumber(arrayOfNumbers) {
  let largest == null; // Syntax error: Should use '=' instead of '=='
  for (let i = 0; i < arrayOfNumbers.length; i++) {
    if (typeOf arrayOfNumbers[i] !== "number") { // Syntax error: `typeof` is used incorrectly, and should be `typeof(arrayOfNumbers[i])`
      throw new TypeError("Array must contain only numbers.");
    }
    
    if (arrayOfNumbers.[i] > largest) { // Syntax error: There's an extraneous '.' after `arrayOfNumbers`
      largest = arrayOfNumber[i]; // Syntax error: The variable name is misspelled. It should be `arrayOfNumbers`
    }
  }
  
  return largest;
}

