import React, { RefObject } from 'react';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

interface CaptureButtonProps {
  captureRef: RefObject<HTMLDivElement>;
}

const ButtonCapture: React.FC<CaptureButtonProps> = ({ captureRef }) => {
  const handleCapture = () => {
    if (captureRef.current) {
      domtoimage.toBlob(captureRef.current)
        .then(blob => {
          if (blob) {
            saveAs(blob, 'cards-screenshot.png');
          }
        })
        .catch(error => {
          console.error('Error capturing the image', error);
        });
    }
  };

  return (
    <button onClick={handleCapture}>Descargar</button>
  );
};

export default ButtonCapture;