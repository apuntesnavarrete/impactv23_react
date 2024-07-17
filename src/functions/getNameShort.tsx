export const obtenerPrimerYtercerNombre = (nombreCompleto: string): string => {
    const palabras = nombreCompleto.split(' ');
    if (palabras.length >= 3) {
        return `${palabras[0]} ${palabras[2]}`;
    } else if (palabras.length === 2) {
        return `${palabras[0]} ${palabras[1]}`;
    } else {
        return palabras[0];
    }
};