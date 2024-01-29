// src/components/PartidoForm.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface JugadorData {
  jugador: string;
  goles: number;
  asistencias: boolean;
}

const initialJugadores = [
  { id: 13, nombre: 'carlos' },
  { id: 24, nombre: 'pedro' },
  { id: 31, nombre: 'roberto' },
  // Asegúrate de añadir más jugadores según sea necesario
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const jugadoresjson = initialJugadores.map((jugador) => ({
  jugador: '',
  goles: 0,
  asistencias: false,
  Equipo: 51,
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica para enviar los datos a la API
    console.log('Datos enviados:', jugadores);
    // Puedes realizar la llamada a la API aquí
    // Ejemplo: fetch('url_de_tu_api', { method: 'POST', body: JSON.stringify(jugadores), headers: { 'Content-Type': 'application/json' } });
  };

  return (
    <form onSubmit={handleSubmit}>
      {jugadores.map((jugador, index) => (
        <div key={index}>
          <label>
            Jugador: {initialJugadores[index].nombre}
            <input
              type="text"
              name="jugador"
              value={initialJugadores[index].id}
              onChange={(e) => handleInputChange(e, index)}
            disabled  // Deshabilita el campo de entrada
          />
            
          </label>
          <label>
            Goles:
            <input
              type="number"
              name="goles"
              value={jugador.goles}
              onChange={(e) => handleInputChange(e, index)}
            />
          </label>
          <label>
  Asistencias:
  <input
    type="checkbox"
    name="asistencias"
    checked={jugador.asistencias}
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