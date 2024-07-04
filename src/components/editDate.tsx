// EditDate.tsx
interface EditDateProps {
    date: string;
    handleDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
 export const EditDate = ({ date, handleDateChange }: EditDateProps) => {
    return (
      <div>
        <label htmlFor="date">Date:</label>
        <input type="date" value={date} onChange={handleDateChange} />
      </div>
    );
  };