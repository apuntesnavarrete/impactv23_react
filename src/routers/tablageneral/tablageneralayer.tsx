import useLigaInfo from "../../Use/useLigaInfo";
import useTodayDate from "../../Use/useTodayDay";
import BottomImg from "../../components/bottomimg";
import TopImg from "../../components/topimg";
import { apiruta } from "../../config/apiruta";
import { TablageneralType } from "../../types/tablageneral";
import './tablageneral.css';

interface TablaGeneralLayerProps {
  clasificacion: TablageneralType[];  // Cambiar a un array de equipos
}

const TablaGeneralLayer: React.FC<TablaGeneralLayerProps> = ({ clasificacion }) => {
  console.log(clasificacion)

  let liga = "PRO";
  const { claseCSS, logoLiga } = useLigaInfo(liga);
  const { date } = useTodayDate();
  let tipoTorneo = "clausura 2024";
  let torneo = "general";

  return (
    <div className={`content_resul_roll ${claseCSS}`}>
      <TopImg date={date} liga={liga} />
      <p className='dayOfWeek'>{tipoTorneo}</p>
      <p>{torneo}</p>

      <div className="conten-cards-team">
        {/* Iterar sobre los equipos de la clasificación */}
        {clasificacion.map((equipo, index) => (
          <div key={equipo.equipoId} className="content-card-team">
            <p className="position">#{index + 1}</p>

            <div className="card-team-left">
              <p>id.- {equipo.equipoId}</p>
              <img
                className="team-left-img"
                src={`${apiruta}/public/teams/${equipo.logo}`}  // Usar el nombre del equipo para la imagen
                alt={equipo.equipo}
              />
              <p>{equipo.equipo}</p>
            </div>

            <div className="card-team-center">
              <div className="team-center_matches">
                <p className="puntos">{equipo.puntos}<span className="small">pts</span></p>
                <div className="team-center-pj">
                  <div>
                    <p>PJ</p>
                    <p>{equipo.partidosJugados}</p>
                  </div>
                  <div className="promedio">
                    <p>Promedio</p>
                    <p>{(equipo.puntos / equipo.partidosJugados).toFixed(2)}</p> {/* Calcular promedio */}
                  </div>
                </div>
              </div>

              <div className="team-center_goles">
                <div className="team-center_match">
                  <p>GF</p>  <p>{equipo.goles}</p>
                </div>
                <div className="team-center_match">
                  <p>GC</p>  <p>{equipo.golesRecibidos}</p>
                </div>
                <div className="team-center_match">
                  <p>DFG</p> <p>{equipo.goles - equipo.golesRecibidos}</p> {/* Diferencia de goles */}
                </div>
                <div className="team-center_match">
                  <p>PG</p><p>{equipo.partidosGanados}</p>
                </div>
                <div className="team-center_match">
                  <p>PP</p> <p>{equipo.partidosPerdidos}</p>
                </div>
                <div className="team-center_match">
                  <p>PGD</p><p>{equipo.partidosGanadosDesempate}</p>
                </div>
                <div className="team-center_match">
                  <p>PPD</p> <p>{equipo.partidosPerdidosDesempate}</p>
                </div>
              </div>
            </div>

            <div className="card-team-rigth">
              <div className="team-rigth-puntos"></div>
            </div>
          </div>
        ))}
      </div>

      <BottomImg logoLiga={logoLiga} />
    </div>
  );
}

export default TablaGeneralLayer;
