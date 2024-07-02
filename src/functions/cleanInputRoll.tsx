export function cleanInputRoll (input: string): string {
    return input
      .replace(/\bvs\b/gi, '') // Elimina 'vs' solo si es una palabra separada
      .replace(/[^\w\s:_]/gi, '') // Elimina todos los caracteres que no sean letras, números, espacios, ':' o '_'
      .replace(/\s+/g, ' ') // Reemplaza múltiples espacios con uno solo
      .trim(); // Elimina espacios en blanco al inicio y al final
  };
  