import { useState } from "react";

interface SelectProps {
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  defaultValue?: string;
}

const Select: React.FC<SelectProps> = ({ options, onChange, defaultValue }) => {
  const [selected, setSelected] = useState<string>(
    defaultValue || options[0].value
  );

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelected(value);
    onChange(value);
  };

  return (
    <select value={selected} onChange={handleChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
