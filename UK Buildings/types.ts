
export enum BuildingType {
  House = 'House',
  Office = 'Office',
  Retail = 'Retail',
  Factory = 'Factory',
  Hospital = 'Hospital',
  School = 'School',
  Other = 'Other',
}

export enum HVACType {
  None = 'None',
  Basic = 'Basic',
  Central = 'Central',
  Industrial = 'Industrial',
}

export enum ITEquipmentLevel {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export interface FormData {
  buildingType: BuildingType;
  floorArea: string; // Stored as string for input control, converted to number for calculation
  includeAdvanced: boolean;
  occupancyDensity: number; // people/100m²
  hvacType: HVACType;
  itEquipmentLevel: ITEquipmentLevel;
}

export interface UtilityDemands {
  electricityKVA: number | null;
  gasKWhYear: number | null;
  waterLitersDay: number | null;
}

export interface BuildingSpecificFactors {
  baseElectricityKwPerSqm: number;
  gasKwhPerSqmPerYear: number;
  waterLitersPerSqmPerDay: number;
  occupancyFactorBase: number;
  occupancyDensityMultiplier: number;
  hvacFactors: Record<HVACType, number>;
  itFactors: Record<ITEquipmentLevel, number>;
}
