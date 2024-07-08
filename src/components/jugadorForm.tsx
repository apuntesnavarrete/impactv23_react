import React, { ChangeEvent } from 'react';

interface JugadorFormProps {
  jugador: {
    annotations: number;
    attendance: boolean;
    matches: number;
    participants: number;
    teams: number;
    name: string;
  };
  index: number;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
}

const JugadorForm: React.FC<JugadorFormProps> = ({ jugador, index, handleInputChange }) => {
  return (
    <div key={index}>
      <p>Jugador: {jugador.name} Id: {jugador.participants}</p>
      <label>
        Goles:
        <input
          type="number"
          name="annotations"
          value={jugador.annotations}
          onChange={(e) => handleInputChange(e, index)}
        />
      </label>
      <label>
        Asistencias:
        <input
          type="checkbox"
          name="attendance"
          checked={jugador.attendance}
          onChange={(e) => handleInputChange(e, index)}
        />
      </label>
    </div>
  );
};

export default JugadorForm;