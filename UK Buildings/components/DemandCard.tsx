
import React from 'react';

interface DemandCardProps {
  title: string;
  value: string | number | null;
  unit: string;
  subtext?: string;
  icon: React.ReactElement<{ className?: string }>; // Updated prop type
  colorTheme: {
    bg: string;
    text: string;
    border: string;
    iconBg: string;
    iconText: string;
  };
}

const DemandCard: React.FC<DemandCardProps> = ({ title, value, unit, subtext, icon, colorTheme }) => {
  const displayValue = value !== null && typeof value === 'number' ? value.toFixed(1) : (value || 'N/A');

  return (
    <div className={`rounded-lg shadow-lg p-6 ${colorTheme.bg} border ${colorTheme.border}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-lg font-semibold ${colorTheme.text}`}>{title}</h3>
        <div className={`p-2 rounded-full ${colorTheme.iconBg}`}>
          {/* Updated cloneElement call */}
          {React.cloneElement(icon, { className: `h-6 w-6 ${colorTheme.iconText}` })}
        </div>
      </div>
      <p className={`text-3xl font-bold ${colorTheme.text}`}>
        {displayValue} <span className="text-xl">{unit}</span>
      </p>
      {subtext && <p className={`text-sm mt-1 ${colorTheme.text} opacity-80`}>{subtext}</p>}
    </div>
  );
};

// SVG Icons
export const ElectricityIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
  </svg>
);

export const GasIcon: React.FC<{className?: string}> = ({className}) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.608c0-2.636.99-5.942 2.992-7.068a8.261 8.261 0 0 1 3.37 2.674Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75h.008v.008H12V9.75Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="m5.002 11.215.002.002a23.334 23.334 0 0 0 13.992 0l.002-.002A2.996 2.996 0 0 1 21 14.25a2.996 2.996 0 0 1-2.996 2.996A2.996 2.996 0 0 1 15 14.25a2.996 2.996 0 0 1-.004-2.998.001.001 0 0 0 0-.004Zm8.991 0-.002.002a23.334 23.334 0 0 1-13.992 0l-.002-.002A.001.001 0 0 0 3 11.211a2.996 2.996 0 0 1 2.996-2.996A2.996 2.996 0 0 1 9 11.25a2.996 2.996 0 0 1 .004 2.998.001.001 0 0 0 0 .004Z" />
  </svg>
);


export const WaterIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
  </svg>
);


export default DemandCard;
