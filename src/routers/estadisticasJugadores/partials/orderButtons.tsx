import React from 'react';

interface OrderButtonsProps {
  handleOrderChange: (tipoOrden: 'goles' | 'promedio' | 'partidos') => void;
}

const OrderButtons: React.FC<OrderButtonsProps> = ({ handleOrderChange }) => {
  return (
    <div>
      <button onClick={() => handleOrderChange('goles')}>Ordenar por Goles</button>
      <button onClick={() => handleOrderChange('promedio')}>Ordenar por Promedio</button>
      <button onClick={() => handleOrderChange('partidos')}>Ordenar por Partidos Jugados</button>
    </div>
  );
};

export default OrderButtons;