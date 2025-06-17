
import React from 'react';

interface NumberInputProps {
  label: string;
  id: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  error?: string | null;
  min?: number;
}

const NumberInput: React.FC<NumberInputProps> = ({ label, id, value, placeholder, onChange, error, min }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers and a single decimal point if needed, though floor area is likely integer.
    // For simplicity, this basic input allows any text, validation is external.
    onChange(e.target.value);
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type="number"
        id={id}
        name={id}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        min={min?.toString()}
        className={`mt-1 block w-full py-2 px-3 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default NumberInput;
