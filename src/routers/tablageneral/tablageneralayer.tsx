import useLigaInfo from "../../Use/useLigaInfo";
import useTodayDate from "../../Use/useTodayDay";
import BottomImg from "../../components/bottomimg";
import TopImg from "../../components/topimg";
import { apiruta } from "../../config/apiruta";
import './tablageneral.css';



const TablaGeneralLayer = ()=>{
    let liga = "PRO"
    const { claseCSS, logoLiga } = useLigaInfo(liga);
    const { date } = useTodayDate();
 let tipoTorneo  = "clausura 2024"
 let torneo = "general"
    return(
       
                   <div className={`content_resul_roll ${claseCSS}`} >
                        <TopImg date={date} liga={liga} />
                        <p className='dayOfWeek'>{tipoTorneo}</p>
                        <p>{torneo}</p>
<p className="position">#1</p>
<div className="conten-cards-team">
<div className="content-card-team">
        <div className="card-team-left">
            <p>id.- 123</p>
            <img className="team-left-img" src={`${apiruta}/public/teams/leon.png`} alt="relenar" />
            <p>leipzing</p>
        </div>
        <div className="card-team-center">
            <div className="team-center_matches"> 
                <p className="puntos">23<span className="small">pts</span></p>
            <div className="team-center-pj">    
                       

                <div>
                    <p>PJ</p>
                    <p>21</p>
                    
                </div>
                <div className="promedio">   
                             <p >Promedio</p>

                    <p>2.38</p>
                </div>
                
            </div>

            </div>
            <div className="team-center_goles">
                <div className="team-center_match">
                        <p>GF</p>  <p>23</p>
                      
                    </div>
                    <div className="team-center_match">
                       <p>GC</p> 
                       <p>29</p>
                        
                    </div>
                    <div className="team-center_match">
                        <p>DFG</p> <p>51</p>
                       



                    </div>

                    <div className="team-center_match">
                    <p>PG</p><p>13</p>
                    
                </div>
                <div className="team-center_match">
                    <p>PP</p> <p>38</p>
                   
                </div>
                <div className="team-center_match">
                    <p>PGD</p><p>32</p>
                    
                </div>
                <div className="team-center_match">
                   <p>PPD</p> <p>16</p>
                    
                </div>
            </div>

        </div>
        <div className="card-team-rigth">
        <div className="team-rigth-puntos">
    </div>
   
        </div>
</div>
</div>


                        <BottomImg logoLiga={logoLiga} />

                    </div>

       
    )
}

export default TablaGeneralLayer