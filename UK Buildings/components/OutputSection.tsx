
import React from 'react';
import { UtilityDemands } from '../types';
import DemandCard, { ElectricityIcon, GasIcon, WaterIcon } from './DemandCard';

interface OutputSectionProps {
  demands: UtilityDemands;
}

const OutputSection: React.FC<OutputSectionProps> = ({ demands }) => {
  const { electricityKVA, gasKWhYear, waterLitersDay } = demands;

  const gasMWhYear = gasKWhYear !== null ? (gasKWhYear / 1000).toFixed(1) : null;
  const waterM3Month = waterLitersDay !== null ? ((waterLitersDay * 30) / 1000).toFixed(1) : null;

  const cardThemes = {
    electricity: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-300', iconBg: 'bg-blue-100', iconText: 'text-blue-600' },
    gas: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-300', iconBg: 'bg-orange-100', iconText: 'text-orange-600' },
    water: { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-300', iconBg: 'bg-teal-100', iconText: 'text-teal-600' },
  };

  return (
    <div id="results-printable" className="mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Estimated Demands</h2>
      {electricityKVA === null && gasKWhYear === null && waterLitersDay === null && (
        <p className="text-gray-600 text-center py-4">Enter valid floor area to see estimates.</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DemandCard
          title="Electricity Demand"
          value={electricityKVA}
          unit="kVA"
          subtext="⚡ Estimated Peak Demand (Incl. 15% safety margin)"
          icon={<ElectricityIcon />}
          colorTheme={cardThemes.electricity}
        />
        <DemandCard
          title="Annual Gas Consumption"
          value={gasKWhYear}
          unit="kWh/year"
          subtext={gasMWhYear !== null ? `🔥 ~${gasMWhYear} MWh/year` : undefined}
          icon={<GasIcon />}
          colorTheme={cardThemes.gas}
        />
        <DemandCard
          title="Daily Water Usage"
          value={waterLitersDay}
          unit="Liters/day"
          subtext={waterM3Month !== null ? `💧 ~${waterM3Month} m³/month` : undefined}
          icon={<WaterIcon />}
          colorTheme={cardThemes.water}
        />
      </div>
    </div>
  );
};

export default OutputSection;
