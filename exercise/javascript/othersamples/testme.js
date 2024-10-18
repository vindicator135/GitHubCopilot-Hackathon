// Generate a function that will accept two numbers and an arithmetic operator. The function will perform the operation between the numbers and return the result.

function performOperation(num1, num2, operator) {
  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num1 / num2;
  }
}

function reverseString(str) {
  return str.split("").reverse().join("");
}

function memoizedFibonacci(n, memo = {}) {
  if (n in memo) {
    return memo[n];
  }

  if (n <= 1) {
    return n;
  }

  memo[n] = memoizedFibonacci(n - 1, memo) + memoizedFibonacci(n - 2, memo);
  return memo[n];
}

// Export all the functions for testing
module.exports = {
  performOperation,
  reverseString,
  memoizedFibonacci,
};
