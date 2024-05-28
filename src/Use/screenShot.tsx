import { useState } from 'react';

const useScreenshot = (): { takeScreenshot: (elementId: string) => void; error: string | null } => {
  const [error, setError] = useState<string | null>(null);

  const takeScreenshot = (elementId: string): void => {
    const element = document.getElementById(elementId);

    if (!element) {
      setError(`Element with id ${elementId} not found.`);
      return;
    }

    const width = element.offsetWidth;
    const height = element.offsetHeight;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');

    if (!context) {
      setError('Canvas context is not supported.');
      return;
    }

    const image = new Image();
    image.onload = () => {
      context.drawImage(image, 0, 0, width, height);
      const imageURL = canvas.toDataURL('image/jpeg');
      const link = document.createElement('a');
      link.href = imageURL;
      link.download = 'screenshot.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    image.src = 'data:image/svg+xml;base64,' + btoa(new XMLSerializer().serializeToString(element));
  };

  return { takeScreenshot, error };
};

export default useScreenshot;
