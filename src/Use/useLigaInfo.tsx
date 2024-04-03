import { useState, useEffect } from 'react';

const useLigaInfo = (liga?: string) => {
    const [claseCSS, setClaseCSS] = useState('');
    const [logoLiga, setLogoLiga] = useState('');

    useEffect(() => {
        if (liga) {
            switch (liga) {
                case 'AGUIGOL':
                    setClaseCSS('ligaFondoAguigol');
                    setLogoLiga("aguigol.png");
                    break;
                case 'PRO':
                    setClaseCSS('ligaFondoProchampions');
                    setLogoLiga("ProLogo.png");
                    break;
                case 'ED':
                    setClaseCSS('ligaFondoED');
                    setLogoLiga("ligaed.png");
                    break;
                default:
                    break;
            }
        }
    }, [liga]);

    return { claseCSS, logoLiga };
};

export default useLigaInfo;

