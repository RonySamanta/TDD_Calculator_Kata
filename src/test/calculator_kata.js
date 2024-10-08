class StringCalculator {
  add(numbers) {
    if (!numbers) return 0;

    let delimiter = /,|\n/;
    if (numbers.startsWith("//")) {
      const customDelimiterMatch = numbers.match(/^\/\/(.*?)\n/);
      if (customDelimiterMatch) {
        delimiter = new RegExp(customDelimiterMatch[1], "g");
        numbers = numbers.slice(customDelimiterMatch[0].length);
      }
    }

    const numArray = numbers.split(delimiter);
    const parsedNumbers = numArray
      .map((n) => parseInt(n, 10))
      .filter((n) => !isNaN(n));
    const negativeNumbers = parsedNumbers.filter((n) => n < 0);
    if (negativeNumbers.length) {
      throw new Error(
        `Negative numbers not allowed: ${negativeNumbers.join(", ")}`
      );
    }
    return parsedNumbers.reduce((sum, num) => sum + num, 0);
  }
}

const calculator = new StringCalculator();

// Testing the basic functionality
console.log(calculator.add(""));
console.log(calculator.add("1"));
console.log(calculator.add("1,5"));

// Handle any amount of numbers
console.log(calculator.add("1,2,3,4") === 10);

// Handle new lines as delimiters
console.log(calculator.add("1\n2,3") === 6);

// Support custom delimiters
console.log(calculator.add("//;\n1;2") === 3);
console.log(calculator.add("//|\n1|2|3") === 6);

//Handle negative numbers
try {
  console.log(calculator.add("1,-2,3"));
} catch (error) {
  console.log(error.message);
}
