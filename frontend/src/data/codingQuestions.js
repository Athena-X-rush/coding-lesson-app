export const codingQuestions = [
  {
    id: 'python_factorial',
    title: 'Python Factorial Function',
    description: 'Write a function that calculates the factorial of a given number.',
    language: 'python',
    difficulty: 'Easy',
    xp: 100,
    starter_code: `def factorial(n):
    # Write your code here
    # Return the factorial of n
    pass`,
    test_cases: [
      { id: 1, input: 5, expected: 120 },
      { id: 2, input: 3, expected: 6 },
      { id: 3, input: 0, expected: 1 }
    ],
    requirements: [
      'Handle edge cases (0! = 1)',
      'Use recursion or iteration',
      'Return integer result'
    ]
  },
  {
    id: 'javascript_reverse',
    title: 'JavaScript String Reversal',
    description: 'Write a function that reverses a given string without using built-in reverse methods.',
    language: 'javascript',
    difficulty: 'Easy',
    xp: 100,
    starter_code: `function reverseString(str) {
    // Write your code here
    // Return the reversed string
    // Do not use str.reverse()
}`,
    test_cases: [
      { id: 1, input: 'hello', expected: 'olleh' },
      { id: 2, input: 'world', expected: 'dlrow' },
      { id: 3, input: 'coding', expected: 'gnidoc' }
    ],
    requirements: [
      'Do not use built-in reverse()',
      'Handle empty strings',
      'Return string result'
    ]
  },
  {
    id: 'python_palindrome',
    title: 'Python Palindrome Checker',
    description: 'Write a function that checks if a given string is a palindrome.',
    language: 'python',
    difficulty: 'Medium',
    xp: 150,
    starter_code: `def is_palindrome(s):
    # Write your code here
    # Return True if palindrome, False otherwise
    pass`,
    test_cases: [
      { id: 1, input: 'racecar', expected: True },
      { id: 2, input: 'hello', expected: False },
      { id: 3, input: 'level', expected: True }
    ],
    requirements: [
      'Ignore case and spaces',
      'Handle empty strings',
      'Return boolean result'
    ]
  },
  {
    id: 'javascript_fizzbuzz',
    title: 'JavaScript FizzBuzz',
    description: 'Write a function that returns FizzBuzz for numbers divisible by 3, 5, or both.',
    language: 'javascript',
    difficulty: 'Medium',
    xp: 150,
    starter_code: `function fizzBuzz(n) {
    // Write your code here
    // Return array or string based on FizzBuzz rules
    // Fizz for multiples of 3
    // Buzz for multiples of 5
    // FizzBuzz for multiples of both
}`,
    test_cases: [
      { id: 1, input: 3, expected: 'Fizz' },
      { id: 2, input: 5, expected: 'Buzz' },
      { id: 3, input: 15, expected: 'FizzBuzz' },
      { id: 4, input: 7, expected: 7 }
    ],
    requirements: [
      'Handle all test cases correctly',
      'Return appropriate type (string or number)',
      'Follow FizzBuzz rules exactly'
    ]
  },
  {
    id: 'python_sorting',
    title: 'Python Bubble Sort',
    description: 'Implement the bubble sort algorithm to sort an array of numbers.',
    language: 'python',
    difficulty: 'Hard',
    xp: 200,
    starter_code: `def bubble_sort(arr):
    # Write your code here
    # Implement bubble sort algorithm
    # Return sorted array
    pass`,
    test_cases: [
      { id: 1, input: [5, 2, 8, 1, 9], expected: [1, 2, 5, 8, 9] },
      { id: 2, input: [3, 1, 4, 1, 5, 9, 2, 6], expected: [1, 1, 2, 3, 4, 5, 6, 9] },
      { id: 3, input: [1], expected: [1] }
    ],
    requirements: [
      'Implement bubble sort algorithm',
      'Do not use built-in sort()',
      'Return new sorted array',
      'Handle edge cases'
    ]
  },
  {
    id: 'javascript_array_sum',
    title: 'JavaScript Array Sum',
    description: 'Write a function that sums all numbers in an array, including nested arrays.',
    language: 'javascript',
    difficulty: 'Medium',
    xp: 150,
    starter_code: `function sumArray(arr) {
    // Write your code here
    // Handle nested arrays
    // Return sum of all numbers
}`,
    test_cases: [
      { id: 1, input: [1, 2, 3], expected: 6 },
      { id: 2, input: [1, [2, 3], 4], expected: 10 },
      { id: 3, input: [], expected: 0 }
    ],
    requirements: [
      'Handle nested arrays',
      'Use recursion or iteration',
      'Return number result',
      'Handle empty arrays'
    ]
  }
];
