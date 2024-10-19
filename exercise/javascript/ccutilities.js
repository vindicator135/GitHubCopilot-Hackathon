/**
 * Validates a credit card number using the Luhn algorithm.
 * The Luhn algorithm, also known as the "modulus 10" or "mod 10" algorithm,
 * is a simple checksum formula used to validate a variety of identification numbers,
 * most notably credit card numbers.
 * @param {string} cardNumber The credit card number to validate.
 * @returns {boolean} Returns true if the card number is valid, false otherwise.
 */
function validateCardNumber(cardNumber) {
  const regex = /^[0-9]{13,19}$/;
  if (!regex.test(cardNumber)) {
    return false;
  }

  let sum = 0;
  let shouldDouble = false;

  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i));
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

/**
 * Masks a credit card number, showing only the last 4 digits.
 * @param {string} cardNumber The credit card number to mask.
 * @returns {string} The masked credit card number.
 */
function maskCardNumber(cardNumber) {
  return cardNumber.slice(-4).padStart(cardNumber.length, "*");
}

/**
 * Validates the expiration date of a credit card.
 * @param {string} month The expiration month in MM format.
 * @param {string} year The expiration year in YY or YYYY format.
 * @returns {boolean} Returns true if the expiration date is valid, false otherwise.
 */
function validateExpiryDate(month, year) {
  const current = new Date();
  const expDate = new Date();

  // Handle different year formats
  if (year.length === 2) {
    year = `20${year}`;
  }

  expDate.setFullYear(year, month - 1, 1);
  expDate.setMonth(expDate.getMonth() + 1); // Set to the first day of the next month

  return expDate > current;
}

/**
 * Calls a mock API to submit a credit card application.
 * @param {object} applicationData The application data to be submitted.
 * @returns {Promise<object>} A promise that resolves to the response from the API.
 */
async function submitApplication(applicationData) {
  const apiUrl = "https://mockapi.example.com/submit";

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(applicationData),
  });

  if (!response.ok) {
    throw new Error(`API request failed with status: ${response.status}`);
  }

  return response.json();
}

/**
 * Validates the CVV number of a credit card.
 * @param {string} cvv The CVV number to validate.
 * @param {string} cardType The type of the credit card (e.g., 'Visa', 'MasterCard').
 * @returns {boolean} Returns true if the CVV is valid, false otherwise.
 */
function validateCVV(cvv, cardType) {
  const regex = /^[0-9]{3,4}$/;
  if (!regex.test(cvv)) {
    return false;
  }

  if (cardType === "American Express" && cvv.length !== 4) {
    return false;
  } else if (cvv.length !== 3) {
    return false;
  }

  return true;
}

//Export the functions for testing and use
module.exports = {
  validateCardNumber,
  maskCardNumber,
  validateExpiryDate,
  submitApplication,
  validateCVV,
};
