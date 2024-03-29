import { useState, useEffect } from 'react';

const useLigaInfo = (liga?: string) => {
    const [claseCSS, setClaseCSS] = useState('');
    const [logoLiga, setLogoLiga] = useState('');

    useEffect(() => {
        if (liga) {
            if (liga === 'AGUIGOL') {
                setClaseCSS('ligaFondoAguigol');
                setLogoLiga("aguigol.png");
            } else if (liga === 'PRO') {
                setClaseCSS('ligaFondoProchampions');
                setLogoLiga("ProLogo.png");
            } else {
              
            }
        }
    }, [liga]);

    return { claseCSS, logoLiga };
};

export default useLigaInfo;