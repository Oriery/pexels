import React, { useState } from "react";
import Select from "../Select";

const orientationOptions = ['Все варианты ориентации', 'Горизонтальная', 'Вертикальная', 'Квадратная'];
const orientationMap: { [key: string]: string } = {
  'Все варианты ориентации': 'all',
  'Горизонтальная': 'landscape',
  'Вертикальная': 'portrait',
  'Квадратная': 'square',
};

const sizeOptions = ['Все размеры', 'Большой', 'Средний', 'Маленький'];
const sizeMap: { [key: string]: string } = {
  'Все размеры': 'all',
  'Большой': 'large',
  'Средний': 'medium',
  'Маленький': 'small',
};

interface FiltersProps {
  onFiltersChanged: ((filters: string) => void) | undefined;
}

const Filters: React.FC<FiltersProps> = ({ onFiltersChanged }) => {
  const [orientation, setOrientation] = useState<string>(orientationMap[orientationOptions[0]]);
  const [size, setSize] = useState<string>(sizeMap[sizeOptions[0]]);

  function updateFilters({ orientationParam, sizeParam } : { orientationParam? : string, sizeParam? : string }) {
    if (orientationParam) {
      setOrientation(orientationParam);
    }
    if (sizeParam) {
      setSize(sizeParam);
    }
    let newFilters = `&orientation=${orientationParam || orientation}&size=${sizeParam || size}`;
    onFiltersChanged && onFiltersChanged(newFilters);
  }

  return (
    <div className="mt-4 flex flex-col lg:flex-row justify-stretch w-full space-y-4 lg:space-y-0 lg:space-x-8 items-center">
      <Select options={orientationOptions} startValue={orientationOptions[0]} onChange={val => updateFilters({orientationParam: orientationMap[val]})} />
      <Select options={sizeOptions} startValue={sizeOptions[0]} onChange={val => updateFilters({sizeParam: sizeMap[val]})} />
      <Select options={['Все цвета', 'цвет', 'цвет', 'цвет']} startValue="Все цвета" onChange={val => console.log(val)} />
    </div>
  );
};

export default Filters;
