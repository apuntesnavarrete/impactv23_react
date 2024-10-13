import React from 'react';

interface MonthFilterProps {
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}

const MonthFilter: React.FC<MonthFilterProps> = ({ selectedMonth, onMonthChange }) => {
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    onMonthChange(e.target.value);
  };

  const months = [
    { value: "", label: "Seleccione un Mes" },
    { value: "1", label: "Enero" },
    { value: "2", label: "Febrero" },
    { value: "3", label: "Marzo" },
    { value: "4", label: "Abril" },
    { value: "5", label: "Mayo" },
    { value: "6", label: "Junio" },
    { value: "7", label: "Julio" },
    { value: "8", label: "Agosto" },
    { value: "9", label: "Septiembre" },
    { value: "10", label: "Octubre" },
    { value: "11", label: "Noviembre" },
    { value: "12", label: "Diciembre" },
  ];

  return (
    <div>
      <label htmlFor="month-select">Filtrar por Mes: </label>
      <select id="month-select" value={selectedMonth} onChange={handleChange}>
        {months.map((month) => (
          <option key={month.value} value={month.value}>
            {month.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MonthFilter;
