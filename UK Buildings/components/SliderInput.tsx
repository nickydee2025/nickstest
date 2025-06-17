
import React from 'react';

interface SliderInputProps {
  label: string;
  id: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit: string;
  onChange: (value: number) => void;
  disabled?: boolean;
}

const SliderInput: React.FC<SliderInputProps> = ({ label, id, value, min, max, step = 1, unit, onChange, disabled }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}: <span className="font-semibold">{value}</span> {unit}
      </label>
      <input
        type="range"
        id={id}
        name={id}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        disabled={disabled}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:accent-gray-400"
      />
    </div>
  );
};

export default SliderInput;
