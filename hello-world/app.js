// app.js
const mathOperation = require('./mathOperation');

const num1 = 20;
const num2 = 5;

console.log(`Addition: ${mathOperation.add(num1, num2)}`);
console.log(`Subtraction: ${mathOperation.subtract(num1, num2)}`);
console.log(`Multiplication: ${mathOperation.multiply(num1, num2)}`);
console.log(`Division: ${mathOperation.divide(num1, num2)}`);
