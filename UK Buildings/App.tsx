
import React, { useState, useEffect, useCallback } from 'react';
import { FormData, UtilityDemands, BuildingType } from './types';
import { INITIAL_FORM_DATA } from './constants';
import { useUtilityCalculations } from './hooks/useUtilityCalculations';
import InputSection from './components/InputSection';
import OutputSection from './components/OutputSection';
import Button from './components/Button';

// html2pdf is globally available from CDN
declare var html2pdf: any;

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [demands, setDemands] = useState<UtilityDemands>({
    electricityKVA: null,
    gasKWhYear: null,
    waterLitersDay: null,
  });
  const [floorAreaError, setFloorAreaError] = useState<string | null>(null);

  const calculatedDemands = useUtilityCalculations(formData);

  const validateFloorArea = useCallback((areaStr: string): boolean => {
    const area = parseFloat(areaStr);
    if (isNaN(area) || area <= 0) {
      setFloorAreaError('Floor area must be a number greater than 0.');
      return false;
    }
    setFloorAreaError(null);
    return true;
  }, []);

  useEffect(() => {
    if (validateFloorArea(formData.floorArea)) {
      setDemands(calculatedDemands);
    } else {
      setDemands({ electricityKVA: null, gasKWhYear: null, waterLitersDay: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, calculatedDemands]); // validateFloorArea is memoized

  const handleFormChange = useCallback(<K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData((prev) => {
      const newState = { ...prev, [key]: value };
      if (key === 'floorArea') {
        validateFloorArea(value as string);
      }
      // If "Include advanced factors" is unchecked, reset advanced fields to defaults
      if (key === 'includeAdvanced' && value === false) {
        newState.occupancyDensity = INITIAL_FORM_DATA.occupancyDensity;
        newState.hvacType = INITIAL_FORM_DATA.hvacType;
        newState.itEquipmentLevel = INITIAL_FORM_DATA.itEquipmentLevel;
      }
      // If building type changes, reset advanced options to their defaults for that type (or global defaults)
      // This is to prevent keeping advanced settings that might not apply well to a new building type
      // For now, simpler: just reset to global defaults when advanced is toggled off.
      return newState;
    });
  }, [validateFloorArea]);

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    setFloorAreaError(null);
    setDemands({ electricityKVA: null, gasKWhYear: null, waterLitersDay: null });
  };

  const handleExportPDF = () => {
    const element = document.getElementById('results-printable');
    if (element) {
        const buildingTypeName = formData.buildingType;
        const floorArea = formData.floorArea;
        const opt = {
            margin:       0.5,
            filename:     `Utility_Demand_Report_${buildingTypeName}_${floorArea}m2.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        // Add a title to the PDF
        const reportTitle = document.createElement('h1');
        reportTitle.innerText = `Utility Demand Report: ${buildingTypeName} - ${floorArea}m²`;
        reportTitle.className = 'text-2xl font-bold text-center mb-4 text-gray-800';
        
        const contentWrapper = document.createElement('div');
        contentWrapper.appendChild(reportTitle);
        contentWrapper.appendChild(element.cloneNode(true)); // Clone to avoid modifying the original
        
        html2pdf().from(contentWrapper).set(opt).save();
    } else {
        alert("Could not find results to export.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            UK Building Utility Demand Estimator
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Estimate utility needs for various building types.
          </p>
        </header>

        <InputSection 
          formData={formData} 
          onFormChange={handleFormChange}
          floorAreaError={floorAreaError}
        />

        <OutputSection demands={demands} />

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            onClick={handleExportPDF} 
            variant="primary"
            disabled={demands.electricityKVA === null}
          >
            Download Report (PDF)
          </Button>
          <Button onClick={handleReset} variant="secondary">
            Reset All
          </Button>
        </div>

        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>
            Estimates based on CIBSE benchmarks and simplified factors. Actual demands may vary significantly based on specific usage patterns, equipment efficiency, local climate conditions, and building characteristics. Results should be considered indicative and used for preliminary planning only. An indicative margin of ±15% or more can be expected.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
