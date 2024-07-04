// RollInput.tsx
import { useRef } from "react";
import { cleanInputRoll } from "../../functions/cleanInputRoll";
import { parseGamesRoll } from "../../functions/parseGamesRoll";
import { convertTeams } from "../../functions/convertTeams";
import { Game } from "../../types/game";
import { EquiposType } from "../../types/equipostype";

interface RollInputProps {
  onRollConvert: (games: Game[]) => void;
  teamsTournament: Partial<EquiposType>[];
}

export const RollInput = ({ onRollConvert, teamsTournament }: RollInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleConvertRoll = () => {
    if (textareaRef.current) {
      const inputValue = textareaRef.current.value;
      const rollclean = cleanInputRoll(inputValue);
      const parsedGames = parseGamesRoll(rollclean);
      const gameConvert = convertTeams(teamsTournament, parsedGames);
      onRollConvert(gameConvert);
    }
  };

  return (
    <div>
      <p>Ingresa tu roll -Hora-Equipo1-Equipo2-categoria</p>
      <textarea ref={textareaRef} rows={10} cols={50} />
      <button onClick={handleConvertRoll}>Convertir</button>
    </div>
  );
};