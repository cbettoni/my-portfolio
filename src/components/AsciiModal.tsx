import React, { useState } from 'react';
import Dialog from './Dialog';
import Button from '@/components/button';

const AsciiModal = ({ isOpen, onClose }) => {
    const [image, setImage] = useState<File | null>(null);
    const [asciiArt, setAsciiArt] = useState<string | null>(null);
    const [zoom, setZoom] = useState(1); // Etat pour gérer le zoom

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setAsciiArt(null); // Reset ASCII art when a new image is uploaded
        }
    };

    const convertToAscii = (img: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const imgElement = new Image();
            imgElement.src = e.target?.result as string;

            imgElement.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                if (!ctx) return;

                // Calculer la taille de l'image en tenant compte du ratio des caractères ASCII
                const maxWidth = 150; // Largeur maximale de l'ASCII Art
                const maxHeight = 100; // Hauteur maximale pour limiter la taille
                const scaleX = maxWidth / imgElement.width;
                const scaleY = maxHeight / imgElement.height;

                // Calculer l'échelle la plus petite pour éviter que l'image dépasse les limites
                const scale = Math.min(scaleX, scaleY);
                const newWidth = imgElement.width * scale;
                const newHeight = imgElement.height * scale;

                canvas.width = newWidth;
                canvas.height = newHeight;

                ctx.drawImage(imgElement, 0, 0, newWidth, newHeight);

                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const pixels = imageData.data;

                // Palette de caractères ASCII plus détaillée
                const asciiChars = '@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,"^`\'. ';

                let asciiStr = '';
                for (let i = 0; i < pixels.length; i += 4) {
                    const r = pixels[i];
                    const g = pixels[i + 1];
                    const b = pixels[i + 2];
                    const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;

                    // Calculer l'index du caractère en fonction de la luminosité
                    const charIndex = Math.floor((brightness / 255) * (asciiChars.length - 1));
                    asciiStr += asciiChars[charIndex];

                    // Ajouter une nouvelle ligne pour chaque fin de ligne
                    if ((i / 4 + 1) % canvas.width === 0) {
                        asciiStr += '\n';
                    }
                }

                setAsciiArt(asciiStr); // Afficher l'ASCII Art généré
            };
        };
        reader.readAsDataURL(img);
    };

    const handleConvertClick = () => {
        if (image) {
            convertToAscii(image);
        }
    };

    const handleReupload = () => {
        setAsciiArt(null);
        setImage(null);
    };

    const handleCloseModal = () => {
        setAsciiArt(null);
        onClose();
    };

    // Fonction pour télécharger l'ASCII Art
    const handleDownload = () => {
        if (asciiArt) {
            const blob = new Blob([asciiArt], { type: 'text/plain' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'ascii_art.txt'; // Nom du fichier à télécharger
            link.click();
        }
    };

    // Fonction pour convertir l'ASCII Art en image
    const convertAsciiToImage = () => {
        if (asciiArt) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // Définir les paramètres de zoom
            const fontSize = 13 * zoom;
            const lineHeight = 8 * zoom;

            // Calculer le nombre de colonnes et de lignes dans l'ASCII Art
            const columns = 150; // Limiter la largeur à 150 caractères
            const rows = Math.ceil(asciiArt.split('\n').length); // Nombre de lignes

            // Définir la taille du canevas en fonction du texte
            canvas.width = fontSize * columns;
            canvas.height = lineHeight * rows;

            // Définir le style de la police
            ctx.font = `${fontSize}px monospace`;
            ctx.fillStyle = 'black'; // Couleur du texte

            // Dessiner l'ASCII Art sur le canevas
            const x = 0;
            let y = fontSize; // Position de départ pour le texte (en bas de l'image)

            const lines = asciiArt.split('\n');
            lines.forEach((line) => {
                // Dessiner chaque ligne de texte
                ctx.fillText(line, x, y);

                // Passer à la ligne suivante
                y += lineHeight;
            });

            // Convertir le canevas en image PNG
            const imageUrl = canvas.toDataURL('image/png');

            // Créer un lien pour télécharger l'image
            const link = document.createElement('a');
            link.href = imageUrl;
            link.download = 'ascii_art_image.png'; // Nom du fichier à télécharger
            link.click();
        }
    };

    // Fonction de zoom
    const handleZoomIn = () => {
        setZoom((prevZoom) => Math.min(prevZoom + 0.1, 2)); // Limite à un zoom maximum de 2x
    };

    const handleZoomOut = () => {
        setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.5)); // Limite à un zoom minimum de 0.5x
    };

    return (
        <Dialog
            isOpen={isOpen}
            onClose={handleCloseModal}
            title="Convert Image to ASCII"
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
            <div className="bg-light-gray-cb p-6 rounded-lg relative w-[75vw] h-[75vh] overflow-hidden flex flex-col">
                <div className="flex flex-col items-center justify-center h-full overflow-hidden">
                    {!asciiArt ? (
                        <>
                            {/* File input and convert button */}
                            <input
                                type="file"
                                onChange={handleImageUpload}
                                className="mb-4"
                            />
                            <Button onClick={handleConvertClick} variant="btn_primary">
                                Convertir en art ASCII
                            </Button>
                        </>
                    ) : (
                        <>
                            {/* Display ASCII art */}
                            <div className="overflow-auto bg-dark-gray-cb text-white flex justify-center">
                                <pre style={{
                                    whiteSpace: 'pre-wrap',
                                    wordWrap: 'break-word',
                                    fontFamily: 'monospace',
                                    fontSize: `${13 * zoom}px`,  // Zoom en fonction du facteur (largeur)
                                    lineHeight: `${8 * zoom}px`, // Zoom vertical (hauteur de ligne)
                                    overflowX: 'auto',  // Défilement horizontal si nécessaire
                                    margin: 0,
                                    padding: 0
                                }}>
                                    {asciiArt}
                                </pre>
                            </div>

                            {/* Zoom buttons */}
                            <div className="flex space-x-2 mt-4">
                                <Button onClick={handleZoomIn} variant="btn_primary">
                                    Zoom In
                                </Button>
                                <Button onClick={handleZoomOut} variant="btn_primary">
                                    Zoom Out
                                </Button>
                            </div>

                            {/* Convert to Image button */}
                            <Button onClick={convertAsciiToImage} variant="btn_secondary" className="mt-4">
                                Convert to Image
                            </Button>

                            {/* Re-upload button */}
                            <Button onClick={handleReupload} variant="btn_secondary" className="mt-4">
                                Convert Another Image
                            </Button>

                            {/* Download button */}
                            <Button onClick={handleDownload} variant="btn_secondary" className="mt-4">
                                Download ASCII Art
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </Dialog>
    );
};

export default AsciiModal;
