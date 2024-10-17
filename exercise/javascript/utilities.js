/**
 * Generates a random integer between min and max inclusive.
 * @param {number} min The lower bound of the random range.
 * @param {number} max The upper bound of the random range.
 * @returns {number} A random integer between min and max.
 */
function getRandomInt(min, max) {
  // Verify that min and max are numbers and min is less than max
  if (typeof min !== "number" || typeof max !== "number" || min > max) {
    throw new Error(
      "Invalid arguments: 'min' must be less than 'max' and both must be numbers."
    );
  }

  // Calculate and return the random integer
  const range = max - min + 1;
  return Math.floor(Math.random() * range) + min;
}

/**
 * Calculates the area of a circle.
 * @param {number} radius The radius of the circle.
 * @returns {number} The area of the circle.
 */
function calculateCircleArea(radius) {
  // Verify the radius is a non-negative number
  if (typeof radius !== "number" || radius < 0) {
    throw new TypeError("The radius must be a non-negative number.");
  }

  // Return the area of the circle
  return Math.PI * radius * radius;
}

/**
 * Constructs a full name from given first and last names.
 * @param {string} firstName The first name.
 * @param {string} lastName The last name.
 * @returns {string} A string representing the full name.
 */
function constructFullName(firstName, lastName) {
  // Verify that the names are strings
  if (typeof firstName !== "string" || typeof lastName !== "string") {
    throw new TypeError("The names must be strings.");
  }

  // Return the full name
  return `${firstName} ${lastName}`;
}

//Export the functions for testing
module.exports = {
  getRandomInt,
  calculateCircleArea,
  constructFullName,
};
