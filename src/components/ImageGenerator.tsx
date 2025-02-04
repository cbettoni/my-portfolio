'use client';

import { useState } from 'react';
import Dialog from './Dialog';
import Button from '@/components/button';

const ImageGenerator = ({ isOpen, onClose }) => {
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const generateImage = async () => {
        if (!prompt) return;
        setLoading(true);

        try {
            console.log(`📡 Requête envoyée à Lexica avec prompt : ${prompt}`);

            // Utilisation d'un proxy pour contourner CORS
            const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://lexica.art/?q=${prompt}`)}`);
            const data = await response.json();
            const html = data.contents; // Contenu HTML récupéré via le proxy

            // Parser le HTML et récupérer la première image
            const parser = new DOMParser();
            const doc = new DOMParser().parseFromString(html, "text/html");
            const imgElement = doc.querySelector("img[src*='https://image.lexica.art/full/']");

            if (imgElement) {
                setImageUrl(imgElement.src);
            } else {
                alert("Aucune image trouvée, essaie un autre prompt !");
            }
        } catch (error) {
            console.error("❌ Erreur lors de la récupération de l’image", error);
            alert("Erreur lors de la génération de l’image !");
        }

        setLoading(false);
    };


    return (
        <Dialog isOpen={isOpen} onClose={onClose} title="Générateur d'images IA">
            <div className="p-6 flex flex-col items-center">
                {/* Champ de saisie du prompt */}
                <input
                    type="text"
                    placeholder="Décris ton image..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="p-2 border border-gray-300 rounded w-full mb-4"
                />

                {/* Bouton de génération d’image */}
                <Button onClick={generateImage} disabled={loading} className="mb-4">
                    {loading ? 'Génération en cours...' : 'Générer l’image'}
                </Button>

                {/* Affichage de l’image générée */}
                {imageUrl && (
                    <div className="mt-6 flex flex-col items-center">
                        <img src={imageUrl} alt="Generated" className="rounded-lg shadow-lg max-w-full" />
                        <a href={imageUrl} download className="mt-4 text-blue-500 underline">
                            Télécharger
                        </a>
                    </div>
                )}
            </div>
        </Dialog>
    );
};

export default ImageGenerator;
