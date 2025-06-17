
import { BuildingType, HVACType, ITEquipmentLevel, BuildingSpecificFactors } from './types';

export const BUILDING_TYPE_OPTIONS = Object.values(BuildingType);
export const HVAC_TYPE_OPTIONS = Object.values(HVACType);
export const IT_EQUIPMENT_LEVEL_OPTIONS = Object.values(ITEquipmentLevel);

export const DEFAULT_OCCUPANCY_DENSITY = 10; // Default for slider

export const FACTOR_DEFINITIONS: Record<BuildingType, BuildingSpecificFactors> = {
  [BuildingType.House]: {
    baseElectricityKwPerSqm: 0.03,
    gasKwhPerSqmPerYear: 120,
    waterLitersPerSqmPerDay: 3.75,
    occupancyFactorBase: 1.0,
    occupancyDensityMultiplier: 0.005,
    hvacFactors: {
      [HVACType.None]: 1.0,
      [HVACType.Basic]: 1.33,
      [HVACType.Central]: 1.66,
      [HVACType.Industrial]: 2.0,
    },
    itFactors: { // IT Level doesn't affect house
      [ITEquipmentLevel.Low]: 1.0,
      [ITEquipmentLevel.Medium]: 1.0,
      [ITEquipmentLevel.High]: 1.0,
    },
  },
  [BuildingType.Office]: {
    baseElectricityKwPerSqm: 0.06,
    gasKwhPerSqmPerYear: 90,
    waterLitersPerSqmPerDay: 1.67,
    occupancyFactorBase: 1.0,
    occupancyDensityMultiplier: 0.01,
    hvacFactors: { // Using sample implied values
      [HVACType.None]: 1.1, 
      [HVACType.Basic]: 1.3, 
      [HVACType.Central]: 1.5, 
      [HVACType.Industrial]: 1.8,
    },
    itFactors: { // Using sample implied values
      [ITEquipmentLevel.Low]: 1.2, 
      [ITEquipmentLevel.Medium]: 1.5, 
      [ITEquipmentLevel.High]: 1.8,
    },
  },
  [BuildingType.Retail]: {
    baseElectricityKwPerSqm: 0.08,
    gasKwhPerSqmPerYear: 100,
    waterLitersPerSqmPerDay: 0.50,
    occupancyFactorBase: 1.0,
    occupancyDensityMultiplier: 0.02,
    hvacFactors: {
      [HVACType.None]: 1.0,
      [HVACType.Basic]: 1.16,
      [HVACType.Central]: 1.33,
      [HVACType.Industrial]: 1.5,
    },
    itFactors: {
      [ITEquipmentLevel.Low]: 1.1,
      [ITEquipmentLevel.Medium]: 1.25,
      [ITEquipmentLevel.High]: 1.4,
    },
  },
  [BuildingType.Factory]: {
    baseElectricityKwPerSqm: 0.12,
    gasKwhPerSqmPerYear: 150,
    waterLitersPerSqmPerDay: 1.00,
    occupancyFactorBase: 1.0,
    occupancyDensityMultiplier: 0.005,
    hvacFactors: {
      [HVACType.None]: 1.3,
      [HVACType.Basic]: 1.7,
      [HVACType.Central]: 2.1,
      [HVACType.Industrial]: 2.5,
    },
    itFactors: {
      [ITEquipmentLevel.Low]: 1.1,
      [ITEquipmentLevel.Medium]: 1.3,
      [ITEquipmentLevel.High]: 1.5,
    },
  },
  [BuildingType.Hospital]: { // Assumptions based on high demand, similar to Office for advanced
    baseElectricityKwPerSqm: 0.10,
    gasKwhPerSqmPerYear: 130,
    waterLitersPerSqmPerDay: 2.50,
    occupancyFactorBase: 1.0,
    occupancyDensityMultiplier: 0.015, // Higher than office
    hvacFactors: { // Similar to Office
      [HVACType.None]: 1.2, // Slightly higher base HVAC
      [HVACType.Basic]: 1.4,
      [HVACType.Central]: 1.6,
      [HVACType.Industrial]: 2.0,
    },
    itFactors: { // Similar to Office, potentially higher end
      [ITEquipmentLevel.Low]: 1.3,
      [ITEquipmentLevel.Medium]: 1.6,
      [ITEquipmentLevel.High]: 2.0,
    },
  },
  [BuildingType.School]: { // Assumptions, similar to Office for advanced
    baseElectricityKwPerSqm: 0.05,
    gasKwhPerSqmPerYear: 80,
    waterLitersPerSqmPerDay: 1.50,
    occupancyFactorBase: 1.0,
    occupancyDensityMultiplier: 0.01, // Same as office
    hvacFactors: { // Same as Office
      [HVACType.None]: 1.1,
      [HVACType.Basic]: 1.3,
      [HVACType.Central]: 1.5,
      [HVACType.Industrial]: 1.8,
    },
    itFactors: { // Same as Office
      [ITEquipmentLevel.Low]: 1.2,
      [ITEquipmentLevel.Medium]: 1.5,
      [ITEquipmentLevel.High]: 1.8,
    },
  },
  [BuildingType.Other]: { // Generic, defaults to Office factors
    baseElectricityKwPerSqm: 0.06,
    gasKwhPerSqmPerYear: 90,
    waterLitersPerSqmPerDay: 1.67,
    occupancyFactorBase: 1.0,
    occupancyDensityMultiplier: 0.01,
    hvacFactors: { // Same as Office
      [HVACType.None]: 1.1,
      [HVACType.Basic]: 1.3,
      [HVACType.Central]: 1.5,
      [HVACType.Industrial]: 1.8,
    },
    itFactors: { // Same as Office
      [ITEquipmentLevel.Low]: 1.2,
      [ITEquipmentLevel.Medium]: 1.5,
      [ITEquipmentLevel.High]: 1.8,
    },
  },
};

export const INITIAL_FORM_DATA: import('./types').FormData = {
  buildingType: BuildingType.Office,
  floorArea: '',
  includeAdvanced: false,
  occupancyDensity: DEFAULT_OCCUPANCY_DENSITY,
  hvacType: HVACType.None,
  itEquipmentLevel: ITEquipmentLevel.Low,
};
