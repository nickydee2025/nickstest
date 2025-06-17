
import React from 'react';
import { FormData, BuildingType, HVACType, ITEquipmentLevel } from '../types';
import { BUILDING_TYPE_OPTIONS, HVAC_TYPE_OPTIONS, IT_EQUIPMENT_LEVEL_OPTIONS, DEFAULT_OCCUPANCY_DENSITY } from '../constants';
import SelectInput from './SelectInput';
import NumberInput from './NumberInput';
import CheckboxInput from './CheckboxInput';
import SliderInput from './SliderInput';

interface InputSectionProps {
  formData: FormData;
  onFormChange: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
  floorAreaError: string | null;
}

const InputSection: React.FC<InputSectionProps> = ({ formData, onFormChange, floorAreaError }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Building Details</h2>
      
      <SelectInput<BuildingType>
        label="Building Type"
        id="buildingType"
        value={formData.buildingType}
        options={BUILDING_TYPE_OPTIONS}
        onChange={(value) => onFormChange('buildingType', value)}
      />

      <NumberInput
        label="Enter Floor Area (m²)"
        id="floorArea"
        value={formData.floorArea}
        placeholder="e.g., 200"
        onChange={(value) => onFormChange('floorArea', value)}
        error={floorAreaError}
        min={1}
      />

      <CheckboxInput
        label="Include advanced factors"
        id="includeAdvanced"
        checked={formData.includeAdvanced}
        onChange={(checked) => onFormChange('includeAdvanced', checked)}
      />

      {formData.includeAdvanced && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h3 className="text-md font-medium text-gray-700 mb-3">Advanced Factors</h3>
          <SliderInput
            label="Occupancy Density"
            id="occupancyDensity"
            value={formData.occupancyDensity}
            min={1}
            max={50}
            unit="people/100m²"
            onChange={(value) => onFormChange('occupancyDensity', value)}
          />
          <SelectInput<HVACType>
            label="HVAC Type"
            id="hvacType"
            value={formData.hvacType}
            options={HVAC_TYPE_OPTIONS}
            onChange={(value) => onFormChange('hvacType', value)}
          />
          <SelectInput<ITEquipmentLevel>
            label="IT Equipment Level"
            id="itEquipmentLevel"
            value={formData.itEquipmentLevel}
            options={IT_EQUIPMENT_LEVEL_OPTIONS}
            onChange={(value) => onFormChange('itEquipmentLevel', value)}
          />
        </div>
      )}
    </div>
  );
};

export default InputSection;
