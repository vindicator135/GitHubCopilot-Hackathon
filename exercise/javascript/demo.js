// *************************************************************
// Demo 1:
// Question: What are the popular JavaScript testing frameworks?
// Answer:

// Demo 2:
// Generate a function that validates a credit card number.
// The function will return if its VISA, MasterCard, American Express, Discover.

// Inline Chat: If not suggested, ask GHCP to add a more elegant error handler to the credit card function above using Ctrl + i (Inline chat)

// Inline chat prompt: Rather than throwing error when card number is invalid, I want a more elegant error message.

// *************************************************************

// *************************************************************
// Demo 3:
// Test the Credit Card function using the console.
//console.log(validateCreditCard("4712303894023455")); // Expected: "VISA"

// How to run the test:
// *************************************************************

// *************************************************************
// Demo 4:
// Copilot Chat: I want to use JEST framework for testing my application.

// Unit Test the Credit Card function using /tests
// Export the function to be used in the test file.
// *************************************************************

// *************************************************************
// Demo 5:
// Inline chat: Find and fix a syntax error in the code below.

// /**
//  * Validates a credit card number and returns the card type.
//  *
//  * @param {string} cardNumber - The credit card number to validate.
//  * @returns {string} - The type of the credit card (e.g., "VISA", "MasterCard", "American Express", "Discover") or "Invalid Card Number" if the card number is not valid.
//  */
// function validateCreditCard2(cardNumber) {
//   if (cardNumber.length === 16) {
//     if (cardNumber.startsWith("4")) {
//       return "VISA";
//     } else if (cardNumber.startsWith("5")) {
//       return "MasterCard";
//   } else if (cardNumber.length === 15) {
//     if (cardNumber.startsWith("3")) {
//       return "American Express";
//     }
//   } else if (cardNumber.length === 16) {
//     if (cardNumber.startsWith("6")) {
//       return "Discover";
//     }
//   } else {
//     return "Invalid Card Number";
//   }
// }
// *************************************************************
