import { useState, useEffect } from 'react';

const useLigaInfo = (liga?: string) => {
    const [claseCSS, setClaseCSS] = useState('');
    const [logoLiga, setLogoLiga] = useState('');

    useEffect(() => {
        if (liga) {
            if (liga === 'AGUIGOL') {
                setClaseCSS('ligaFondoAguigol');
                setLogoLiga("aguigol.png");
            } else if (liga === 'Pro') {
                setClaseCSS('ligaFondoProchampions');
                setLogoLiga("ProLogo.png");
            } else {
                setClaseCSS('ligaFondoED');
                setLogoLiga("ligaed.png");
            }
        }
    }, [liga]);

    return { claseCSS, logoLiga };
};

export default useLigaInfo;