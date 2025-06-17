
import { FormData, UtilityDemands, HVACType, ITEquipmentLevel } from '../types';
import { FACTOR_DEFINITIONS, DEFAULT_OCCUPANCY_DENSITY } from '../constants';

export const useUtilityCalculations = (formData: FormData): UtilityDemands => {
  const {
    buildingType,
    floorArea: floorAreaStr,
    includeAdvanced,
    occupancyDensity,
    hvacType,
    itEquipmentLevel,
  } = formData;

  const floorArea = parseFloat(floorAreaStr);

  if (isNaN(floorArea) || floorArea <= 0) {
    return { electricityKVA: null, gasKWhYear: null, waterLitersDay: null };
  }

  const factors = FACTOR_DEFINITIONS[buildingType];

  // Electricity Calculation
  let occupancyFactor = factors.occupancyFactorBase;
  let hvacFactorVal = factors.hvacFactors[HVACType.None]; // Default for non-advanced
  let itFactorVal = factors.itFactors[ITEquipmentLevel.Low]; // Default for non-advanced

  if (includeAdvanced) {
    occupancyFactor = factors.occupancyFactorBase + (factors.occupancyDensityMultiplier * occupancyDensity);
    hvacFactorVal = factors.hvacFactors[hvacType];
    itFactorVal = factors.itFactors[itEquipmentLevel];
  } else {
     // For non-advanced, ensure we use the base HVAC/IT factors explicitly if they differ from None/Low
     // For instance, if a building type inherently has some HVAC without "advanced" being selected
     // In current FACTOR_DEFINITIONS, HVACType.None and ITEquipmentLevel.Low are the base factors.
  }
  
  const baseLoadKw = floorArea * factors.baseElectricityKwPerSqm;
  const adjustedLoadKw = baseLoadKw * occupancyFactor * hvacFactorVal * itFactorVal;
  const electricityKVA = (adjustedLoadKw / 0.85) * 1.15;

  // Gas Calculation
  const gasKWhYear = floorArea * factors.gasKwhPerSqmPerYear;

  // Water Calculation
  // Water formula uses occupancy density regardless of "advanced" toggle in prompt, but let's tie it to advanced for consistency.
  // Original: Water Demand = Floor Area × [Daily Factor] × (1 + 0.01 × Occupancy Density)
  // Let's assume the (1 + 0.01 * OD) part is applied if advanced is ON or OD is non-default.
  // For simplicity and user expectation, if "advanced" is off, we might not apply the OD multiplier.
  // However, the prompt implies OD is part of the basic water calc.
  // Let's stick to prompt: use OD always for water.
  // If includeAdvanced is true, use the slider OD. If false, maybe a default OD?
  // Let's use the current OD state for water calc always as per formula in prompt.
  // Using DEFAULT_OCCUPANCY_DENSITY when advanced is not included was causing an error if not imported.
  // The logic implies that if advanced is not included, a default occupancy density might be used for water calculations,
  // or it might strictly use the current 'occupancyDensity' value from form data.
  // The original prompt's formula: "Water Demand = Floor Area × [Daily Factor] × (1 + 0.01 × Occupancy Density)"
  // This implies using the current Occupancy Density value always. The current code uses it.
  // The specific line that caused error: `(1 + 0.01 * (includeAdvanced ? occupancyDensity : DEFAULT_OCCUPANCY_DENSITY))`
  // This implies if advanced is OFF, use DEFAULT_OCCUPANCY_DENSITY. If advanced is ON, use slider's occupancyDensity.
  // The line below implements the original logic more closely by using 'occupancyDensity' directly for the factor,
  // which will be the slider value if 'advanced' is on, or the default from INITIAL_FORM_DATA if 'advanced' is toggled off.
  // However, to fix the specific error with DEFAULT_OCCUPANCY_DENSITY, we assume the original intent was to use it when includeAdvanced is false.
  const waterDensityForCalc = includeAdvanced ? occupancyDensity : DEFAULT_OCCUPANCY_DENSITY;
  const waterLitersDay = floorArea * factors.waterLitersPerSqmPerDay * (1 + 0.01 * waterDensityForCalc);


  return {
    electricityKVA,
    gasKWhYear,
    waterLitersDay,
  };
};
