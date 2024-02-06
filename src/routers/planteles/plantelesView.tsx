import React, { useState, useEffect } from 'react';
import { Plantelestype } from '../../types/plantelestype';
import { apiruta } from '../../config/apiruta';

const PlantelesTabla: React.FC = () => {
    // Estado para almacenar los datos de la API
    const [data, setData] = useState<Plantelestype[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
      // Función para realizar la solicitud a la API
      const fetchData = async () => {
        try {
          // Cambia la URL con la dirección de tu API
          const response = await fetch('http://18.188.110.39:83/api/v1/rosters');
          const jsonData = await response.json();
          // Almacena los datos en el estado
          console.log(jsonData.typeParticipant)
          const sortedData = jsonData.sort((a: Plantelestype, b: Plantelestype) =>
          a.teams.name.localeCompare(b.teams.name)
        );
          setData(sortedData);
        } catch (error) {
          console.error('Error al obtener datos:', error);
        }
      };
  
      // Llama a la función para obtener los datos cuando el componente se monta
      fetchData();
    }, []); // El segundo argumento [] indica que este efecto solo se ejecuta al montar el componente
  
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    };

    const filteredData = data.filter((item: Plantelestype) =>
  item.teams.name.toLowerCase().includes(searchTerm.toLowerCase())
);

    return (
      <div>

<div>
  <h1>Tabla de Datos</h1>
  {/* Agrega un campo de entrada para el término de búsqueda */}
  <input
    type="text"
    placeholder="Buscar por equipo"
    value={searchTerm}
    onChange={handleSearch}
  />
  {/* Resto del código... */}
</div>

        <h1>Tabla de Datos</h1>
        <table>
          <thead>
            <tr>
              <th>ID_Registro</th>
              <th>Equipo</th>
              <th>Jugador</th>
              <th>Dorsal</th>
              <th>Tipo de Participante</th>
              <th>Foto</th>

              {/* Agrega más encabezados según la estructura de tus datos */}
            </tr>
          </thead>
          <tbody>
            {/* Mapea los datos para generar filas de la tabla */}
            {filteredData.map((item: Plantelestype) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.teams.name}</td>
                <td>{item.participants.name}</td>
                <td>{item.dorsal}</td>
                <td>{item.typeParticipant}</td>
                <td><img className="PhotoTablas" src={`${apiruta}/public/participants/${item.participants.Photo}`} alt="Foto del jugador" /></td>

                {/* Agrega más celdas según la estructura de tus datos */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

export default PlantelesTabla;