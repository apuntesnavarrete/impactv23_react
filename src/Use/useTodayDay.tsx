// useTodayDate.ts
import { useState, useEffect } from 'react';

const useTodayDate = () => {
  const [date, setDate] = useState<string>('');
  const [dayOfWeek, setDayOfWeek] = useState<string>('');

  const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Formato yyyy-MM-dd
    const dayOfWeek = daysOfWeek[today.getDay()];

    setDate(formattedDate);
    setDayOfWeek(dayOfWeek);
  }, []);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(event.target.value);
    const day = daysOfWeek[selectedDate.getDay() + 1];


    setDate(event.target.value);
    setDayOfWeek(day);
  };

  return { date, dayOfWeek, handleDateChange };
};

export default useTodayDate;