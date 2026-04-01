import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, CheckCircle, XCircle, Clock, Trophy } from 'lucide-react';

const CodingChallenge = ({ question, onComplete, onSolve }) => {
  const [userCode, setUserCode] = useState(question.starter_code || '');
  const [testResults, setTestResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  const runTests = () => {
    setIsRunning(true);
    setTestResults([]);
    
    // Simulate running tests (in real app, this would execute code)
    setTimeout(() => {
      const results = question.test_cases.map(testCase => {
        try {
          // Simple evaluation (in production, use proper code execution)
          let result = evaluateCode(userCode, testCase.input, question.language);
          const passed = result === testCase.expected;
          
          return {
            id: testCase.id,
            input: testCase.input,
            expected: testCase.expected,
            actual: result,
            passed: passed
          };
        } catch (error) {
          return {
            id: testCase.id,
            input: testCase.input,
            expected: testCase.expected,
            actual: `Error: ${error.message}`,
            passed: false
          };
        }
      });
      
      setTestResults(results);
      setIsRunning(false);
      
      // Check if all tests passed
      const allPassed = results.every(result => result.passed);
      if (allPassed) {
        setXpEarned(question.xp);
        if (onComplete) onComplete(question.id, question.xp);
        if (onSolve) onSolve();
      }
    }, 1500);
  };

  const evaluateCode = (code, input, language) => {
    // Simple evaluation for demo (in production, use proper code execution)
    if (language === 'python') {
      // Simple Python evaluation
      if (code.includes('def factorial')) {
        return factorial(parseInt(input));
      }
      if (code.includes('def reverse')) {
        return input.toString().split('').reverse().join('');
      }
    }
    
    if (language === 'javascript') {
      // Simple JavaScript evaluation
      if (code.includes('function reverse')) {
        return input.toString().split('').reverse().join('');
      }
      if (code.includes('function factorial')) {
        return factorial(parseInt(input));
      }
    }
    
    return 'Not implemented';
  };

  const factorial = (n) => {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
  };

  const allTestsPassed = testResults.length > 0 && testResults.every(result => result.passed);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Play className="w-5 h-5 text-blue-500" />
          {question.title}
        </h3>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {question.difficulty}
          </span>
          <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
            +{question.xp} XP
          </span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          {question.description}
        </p>
        {question.requirements && (
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
              Requirements:
            </h4>
            <ul className="list-disc list-inside text-sm text-blue-600 dark:text-blue-400">
              {question.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-gray-700 dark:text-gray-300">
            Your Solution:
          </h4>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            {question.language}
          </div>
        </div>
        <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
          <Editor
            height="200px"
            language={question.language === 'python' ? 'python' : 'javascript'}
            value={userCode}
            onChange={setUserCode}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true
            }}
          />
        </div>
      </div>

      <div className="mb-4">
        <button
          onClick={runTests}
          disabled={isRunning || !userCode.trim()}
          className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        >
          {isRunning ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Running Tests...
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Run Tests & Submit
            </>
          )}
        </button>
      </div>

      {testResults.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            Test Results:
            {allTestsPassed && (
              <span className="text-green-600 dark:text-green-400">
                <Trophy className="w-4 h-4" />
                All Passed!
              </span>
            )}
          </h4>
          <div className="space-y-2">
            {testResults.map((result, index) => (
              <div
                key={result.id}
                className={`p-3 rounded-lg border ${
                  result.passed
                    ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
                    : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">
                    Test Case {result.id}
                  </span>
                  <span className="flex items-center gap-1">
                    {result.passed ? (
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                    )}
                    {result.passed ? 'Passed' : 'Failed'}
                  </span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <div>Input: {result.input}</div>
                  <div>Expected: {result.expected}</div>
                  <div>Actual: {result.actual}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {xpEarned > 0 && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
            <Trophy className="w-5 h-5" />
            <span className="font-bold text-lg">
              +{xpEarned} XP Earned!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodingChallenge;
