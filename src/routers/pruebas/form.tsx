// src/components/PartidoForm.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface JugadorData {
  annotations: number;
  attendance: boolean;
  matches: number,
  participants: number,
  teams: number,
}

const initialJugadores = [
  { name: 'carlos', participants: 441,teams:98 },
  {  name: 'pedro', participants: 637,teams:98 },
  {  name: 'roberto', participants: 878,teams:98 },
  // Asegúrate de añadir más jugadores según sea necesario
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const jugadoresjson = initialJugadores.map((jugador,index) => ({
  annotations: 0,
  attendance: false,
  matches: 22,
  participants: initialJugadores[index].participants,
  teams: initialJugadores[index].teams, 
}));

const Pruebas: React.FC = () => {
  const [jugadores, setJugadores] = useState<JugadorData[]>(jugadoresjson);


  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value, type, checked } = e.target;
  
    setJugadores((prevJugadores) => {
      const newJugadores = [...prevJugadores];
  
      // Si el tipo es checkbox, utiliza el valor booleano checked
      const inputValue = type === 'checkbox' ? checked : value;
  
      newJugadores[index] = { ...newJugadores[index], [name]: inputValue };
      return newJugadores;
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('ver datos:', jugadores);

    try {
      const response = await fetch(`http://localhost:4000/api/v1/PlayerStatistics`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jugadores),
      });

      if (response.ok) {
        console.log(response);
      } else {
        // Manejar respuesta de error
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {jugadores.map((jugador, index) => (
        <div key={index}>
         
      <p>Jugador ; {initialJugadores[index].name} Id.- {initialJugadores[index].participants}  </p>
         
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
      ))}
      <button type="submit">Registrar Partido</button>
    </form>
  );
};

export default Pruebas;