import React, { useState } from "react";

const Calculator: React.FC = () => {
  const [input, setInput] = useState<string>("");

  const handleClick = (value: string) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
  };

  const handleCalculate = () => {
    try {
      // eslint-disable-next-line no-eval
      setInput(eval(input).toString());
    } catch {
      setInput("Error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-5">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-72">
        <div className="bg-gray-700 p-3 rounded text-right text-xl mb-4">
          {input || "0"}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {["7", "8", "9", "/",
            "4", "5", "6", "*",
            "1", "2", "3", "-",
            "0", ".", "=", "+"].map((item) => (
            <button
              key={item}
              className="bg-gray-600 p-4 rounded text-xl hover:bg-gray-500"
              onClick={() => item === "=" ? handleCalculate() : handleClick(item)}
            >
              {item}
            </button>
          ))}
          <button
            className="col-span-2 bg-red-600 p-4 rounded text-xl hover:bg-red-500"
            onClick={handleClear}
          >
            C
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
