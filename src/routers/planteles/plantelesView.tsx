import React, { useState, useEffect } from 'react';
import { Plantelestype } from '../../types/plantelestype';

const PlantelesTabla: React.FC = () => {
    // Estado para almacenar los datos de la API
    const [data, setData] = useState<Plantelestype[]>([]);
  
    useEffect(() => {
      // Función para realizar la solicitud a la API
      const fetchData = async () => {
        try {
          // Cambia la URL con la dirección de tu API
          const response = await fetch('http://18.188.110.39:83/api/v1/rosters');
          const jsonData = await response.json();
          // Almacena los datos en el estado
          console.log(jsonData.typeParticipant)
          setData(jsonData);
        } catch (error) {
          console.error('Error al obtener datos:', error);
        }
      };
  
      // Llama a la función para obtener los datos cuando el componente se monta
      fetchData();
    }, []); // El segundo argumento [] indica que este efecto solo se ejecuta al montar el componente
  
    return (
      <div>
        <h1>Tabla de Datos</h1>
        <table>
          <thead>
            <tr>
              <th>ID_Registro</th>
              <th>Equipo</th>
              <th>Jugador</th>
              <th>Dorsal</th>
              <th>Tipo de Participante</th>

              {/* Agrega más encabezados según la estructura de tus datos */}
            </tr>
          </thead>
          <tbody>
            {/* Mapea los datos para generar filas de la tabla */}
            {data.map((item: Plantelestype) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.teams.name}</td>
                <td>{item.participants.name}</td>
                <td>{item.dorsal}</td>
                <td>{item.typeParticipant}</td>

                {/* Agrega más celdas según la estructura de tus datos */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

export default PlantelesTabla;