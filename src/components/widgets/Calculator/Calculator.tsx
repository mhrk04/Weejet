"use client";

import { useState } from 'react';

const Calculator = () => {
  // State to manage the current value and previous value
  const [currentValue, setCurrentValue] = useState<string>('0');
  const [previousValue, setPreviousValue] = useState<string>('');
  const [operation, setOperation] = useState<string | null>(null);

  // Handle number button clicks
  const handleNumberClick = (number: string) => {
    // Prevent multiple leading zeros
    if (currentValue === '0' && number === '0') return;
    
    // Replace current value if it's 0, otherwise append
    setCurrentValue(
      currentValue === '0' ? number : currentValue + number
    );
  };

  // Handle operation button clicks
  const handleOperationClick = (op: string) => {
    // If there's a previous operation, calculate first
    if (previousValue) {
      calculateResult();
    }
    
    // Set the operation and move current value to previous
    setOperation(op);
    setPreviousValue(currentValue);
    setCurrentValue('0');
  };

  // Calculate the result of the current operation
  const calculateResult = () => {
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    
    let result: number;
    switch (operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '*':
        result = prev * current;
        break;
      case '/':
        result = prev / current;
        break;
      default:
        return;
    }
    
    // Update values after calculation
    setCurrentValue(result.toString());
    setPreviousValue('');
    setOperation(null);
  };

  // Clear the calculator
  const handleClear = () => {
    setCurrentValue('0');
    setPreviousValue('');
    setOperation(null);
  };

  return (
    <div className="calculator-container max-w-xs mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">Simple Calculator</h2>
      
      {/* Display area */}
      <div className="mb-4 text-right">
        <div className="text-sm text-gray-500 h-6">
          {previousValue} {operation || ''}
        </div>
        <div className="text-2xl font-bold">{currentValue}</div>
      </div>
      
      {/* Number and Operation Buttons */}
      <div className="grid grid-cols-4 gap-2">
        {/* Number buttons */}
        {['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'].map((num) => (
          <button
            key={num}
            onClick={() => handleNumberClick(num)}
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            {num}
          </button>
        ))}
        
        {/* Operation buttons */}
        {['+', '-', '*', '/'].map((op) => (
          <button
            key={op}
            onClick={() => handleOperationClick(op)}
            className="bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
          >
            {op}
          </button>
        ))}
        
        {/* Equals and Clear buttons */}
        <button
          onClick={calculateResult}
          className="col-span-2 bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          =
        </button>
        <button
          onClick={handleClear}
          className="col-span-2 bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default Calculator;