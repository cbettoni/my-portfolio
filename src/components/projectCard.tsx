import '@/styles/globals.scss';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRef } from 'react';

// Définir l'interface des props du composant
interface ProjectCardProps {
    title: string;
    description: string;
    link: string;
    imageUrl: string;
    onClick?: () => void;  // L'onClick est optionnel, car tous les projets n'ont pas nécessairement une fonction à appeler
}

export default function ProjectCard({
                                        title,
                                        description,
                                        link,
                                        imageUrl,
                                        onClick
                                    }: ProjectCardProps) {
    const projectRef = useRef(null);
    const handleProjectClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault(); // Empêche le comportement par défaut du lien (redirection)
        if (onClick) {
            onClick(); // Appelle la fonction onClick, si elle existe
        }
    };


    return (
        <motion.div
            className="project-card bg-light-gray-cb rounded-radius p-5 shadow-lg hover:scale-105 transition-transform duration-300 relative group w-full max-w-[400px] h-[300px] sm:w-[75vw] sm:h-[50vh]"
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
                    className="flex-none relative w-full h-full rounded-radius"
                >
                    <Image
                        src={imageUrl}
                        alt={title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-radius"
                    />
                </motion.div>

                {/* Conteneur pour le texte et le lien */}
                <div className="flex-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 rounded-radius p-4 group-hover:visible">
                    <h3 className="text-white text-2xl font-semibold">{title}</h3>
                    <p className="text-white text-base mt-2">{description}</p>
                    <a
                        href={link}
                        onClick={handleProjectClick}
                        className="text-green-cb underline font-bold mt-4 hover:text-dark-green-cb"
                    >
                        Voir le projet
                    </a>
                </div>
            </div>
        </motion.div>
    );
}
