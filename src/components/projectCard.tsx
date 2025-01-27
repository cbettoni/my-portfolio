import '@/styles/globals.scss';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { horizontalScroll } from '@/js/horizontalScroll';

export default function ProjectCard({ title, description, link, imageUrl }) {
    const projectRef = useRef(null);

    useEffect(() => {
        horizontalScroll(projectRef); // Applique l'animation du scroll horizontal
    }, []);

    return (
        <motion.div
            className="project-card bg-light-gray-cb rounded-radius p-5 shadow-lg hover:scale-105 transition-transform duration-300 relative group"
            ref={projectRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="project-content flex flex-row items-center">
                {/* Image */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="flex-none mr-5 rounded-radius"
                >
                    <Image
                        src={imageUrl}
                        alt={title}
                        width={500}
                        height={300}
                        layout="intrinsic"
                        className="rounded-radius" // Garde l'image avec des bords arrondis
                    />
                </motion.div>

                {/* Conteneur pour le texte et le lien */}
                <div className="flex-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 rounded-radius p-4 group-hover:visible">
                    <h3 className="text-white text-2xl font-semibold">{title}</h3>
                    <p className="text-white text-base mt-2">{description}</p>
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-cb underline font-bold mt-4 hover:text-dark-green-cb"
                    >
                        Voir le projet
                    </a>
                </div>
            </div>
        </motion.div>
    );
}
