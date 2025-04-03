import { useState } from "react";
import styled from "styled-components";

interface SelectProps {
  options: { value: string; label: string }[];
  onChange: (value: { value: string; label: string }) => void;
  defaultValue?: { value: string; label: string };
}

const Select: React.FC<SelectProps> = ({ options, onChange, defaultValue }) => {
  const [selected, setSelected] = useState<string>(
    defaultValue?.value || options[0].value
  );

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelected(value);
    const selectedOption = options.find((option) => option.value === value);
    if (selectedOption) {
      onChange(selectedOption);
    }
  };

  return (
    <Style>
      <select value={selected} onChange={handleChange}>
        {options.map((option) => (
          <option className="option" key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Style>
  );
};

export default Select;

const Style = styled.div`
select {
  padding: 6px 4px;
  border: none;
  border-bottom: 1px solid #D2D6DA;
  font-size: 14px;
  font-weight: 700;
  outline: none;
}
option{
  border: none;
  background:#fff;
  border-radius: none;
  outline: none;
  box-shadow: 0px 0px 4px 0px #00000040;
  font-size: 14px;
  font-weight: 500;
  color: #8D94A0;
}
`
