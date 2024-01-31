export const SuccessMessage: React.FC<{ message: string }> = ({ message }) => (
    <div style={{ color: 'green', border: '1px solid green', padding: '10px', margin: '10px 0' }}>
      {message}
    </div>
  );