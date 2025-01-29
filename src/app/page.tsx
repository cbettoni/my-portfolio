'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from '../components/projectCard';
import Header from '../components/header';
import Footer from '../components/footer';
import AsciiModal from '../components/AsciiModal';
import React, { useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    useEffect(() => {
        // Animation pour la section hero
        gsap.from('.hero-title', {
            opacity: 0,
            y: -50,
            duration: 1.5,
            ease: 'power3.out',
        });

        gsap.from('.hero-subtitle', {
            opacity: 0,
            y: 50,
            duration: 1.5,
            ease: 'power3.out',
            delay: 0.5,
        });

        // Animation des projets en scroll horizontal
        gsap.to('.projects-scroll', {
            x: '-100%',
            scrollTrigger: {
                trigger: '.projects-section',
                start: 'top top',
                end: '+=1500',
                scrub: true,
            },
        });
    }, []);

    const [isAsciiModalOpen, setIsAsciiModalOpen] = useState(false); // Définir l'état pour la modale

    const projects = [
        {
            title: "Projet 1",
            description: "Description du premier projet.",
            link: "#",
            imageUrl: "/geometric-shape.jpg",
            onClick: () => setIsAsciiModalOpen(true), // Ouvre la modale
        },
        {
            title: "Projet 2",
            description: "Description du deuxième projet.",
            link: "https://lien-du-projet-2.com",
            imageUrl: "/geometric-shape.jpg",
        },
        {
            title: "Projet 3",
            description: "Description du troisième projet.",
            link: "https://lien-du-projet-3.com",
            imageUrl: "/geometric-shape.jpg",
        },
    ];

    return (
        <>
            <Header/>

                {/* Section Hero */}
                <section className="hero bg-gradient-to-r from-green-cb to-dark-green-cb h-screen flex flex-col flex-wrap justify-center items-center text-center px-6 sm:px-16 relative">
                    <h1 className="hero-title text-4xl sm:text-6xl font-extrabold text-white">Bonjour, je suis Christelle Bettoni</h1>
                    <p className="hero-subtitle text-xl sm:text-2xl text-white mt-6">Développeuse Frontend | Passionnée par l'UX/UI</p>
                    <button className="cta-button mt-8 px-6 py-3 bg-white text-dark-green-cb font-bold rounded-full">Voir mes projets</button>
                </section>

                {/* À propos */}
                <section className="about-section py-32 bg-light-gray-cb">
                    <div id="about" className="max-w-3xl mx-auto text-center px-4 sm:px-0">
                        <h2 className="text-3xl sm:text-4xl font-bold text-dark-gray-cb">À propos de moi</h2>
                        <p className="mt-6 text-lg sm:text-xl text-dark-gray-cb">
                            Après plusieurs années d’expérience dans les domaines de la communication et du marketing, j'ai entrepris une reconversion professionnelle en développement web afin de maîtriser les mécanismes des applications web et relever les défis techniques qui y sont liés. Mes expériences en tant qu'Intégratrice Web et Développeuse Front-End ont confirmé ma passion pour ce métier et mon désir constant d'apprendre et de me perfectionner.
                            <br /><br />
                            Créative, autonome et orientée résultats, je suis animée par le goût du challenge et l'acquisition continue de nouvelles compétences. Aujourd'hui, je souhaite mettre à profit mon expertise technique et mon expérience en communication pour contribuer efficacement au succès d'une équipe dynamique.
                        </p>
                    </div>
                </section>

                {/* Expériences */}
                <section className="experiences-section py-32 bg-dark-gray-cb">
                    <h2 id="experiences" className="text-3xl sm:text-4xl font-bold text-white text-center">Mes Expériences</h2>
                    <div className="experience-card mt-8 max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
                        <h3 className="text-2xl font-bold text-dark-gray-cb">Développeuse Frontend | Gosselink digital</h3>
                        <p className="text-xl mt-4 text-dark-gray-cb">
                            Depuis mars 2023, j'ai contribué à la création d'interfaces utilisateurs modernes et performantes en utilisant des technologies telles que React.js, Next.js, HTML, SCSS, Twig, VueJS, PHP, et Tailwind. Ma mission consistait à optimiser les performances des sites web tout en respectant les meilleures pratiques d'accessibilité et de responsive design. J'ai également travaillé sur l'intégration de solutions d'animations dynamiques avec GSAP, offrant une meilleure interaction avec les utilisateurs et une expérience fluide lors du défilement des pages.

                        </p>
                        <p className="text-xl mt-4 text-dark-gray-cb">
                            En parallèle, j'ai conçu, réalisé et mis en production des interfaces web à partir de maquettes Figma, et j'ai assuré le theming WordPress sur mesure, en utilisant des outils comme Bedrock, Gutenberg, ACF, PHP, Timber, SCSS et HTML5. J'ai également créé des documents de formation utilisateurs et assuré la maintenance de sites web, garantissant leur performance et leur mise à jour continue.
                        </p>
                    </div>

                    <div className="experience-card mt-8 max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
                        <h3 className="text-2xl font-bold text-dark-gray-cb">Intégratrice Web | ITFacto</h3>
                        <p className="text-xl mt-4 text-dark-gray-cb">
                            De janvier à mars 2023 - J'ai conçu, réalisé et mis en production des landing pages dynamiques en utilisant HTML5, CSS, Bootstrap, JS, ainsi que la gestion de version avec Git et Gitlab.
                        </p>
                        <p className="text-xl mt-4 text-dark-gray-cb">
                            J'ai également créé et conçu des newsletters attrayantes avec HTML5 et CSS. En parallèle, j'ai élaboré des maquettes de webdesign raffinées et modernes à l'aide de Figma, Illustrator et Photoshop.
                        </p>
                    </div>
                </section>

                {/* Projets */}
            <section className="projects-section py-32 bg-light-gray-cb">
                <h2 id="projects" className="text-3xl sm:text-4xl font-bold text-dark-gray-cb text-center mb-10">Mes Projets</h2>
                <div className="projects-scroll flex gap-8 overflow-x-auto px-6 sm:px-16">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="project-card bg-light-gray-cb rounded-radius p-5 shadow-lg hover:scale-105 transition-transform duration-300 relative group max-w-md"
                        >
                            <div className="project-content flex flex-row items-center">
                                {/* Image */}
                                <img
                                    src={project.imageUrl}
                                    alt={project.title}
                                    className="w-full h-48 object-cover rounded-radius"
                                />
                                <div className="flex-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 rounded-radius p-4 group-hover:visible">
                                    <h3 className="text-white text-2xl font-semibold">{project.title}</h3>
                                    <p className="text-white text-base mt-2">{project.description}</p>
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            project.onClick();
                                        }}
                                        className="text-green-cb underline font-bold mt-4 hover:text-dark-green-cb"
                                    >
                                        Voir le projet
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Modale ASCII */}
            <AsciiModal isOpen={isAsciiModalOpen} onClose={() => setIsAsciiModalOpen(false)} />

            {/* Contact */}
                <section id="contact" className="contact-section py-32 bg-light-gray-cb">
                    <h2 id="contact" className="text-3xl sm:text-4xl font-bold text-dark-gray-cb text-center">Contactez-moi</h2>
                    <form className="mt-8 max-w-2xl mx-auto px-4 sm:px-0">
                        <input
                            type="email"
                            placeholder="Votre email"
                            className="p-4 w-full border border-gray-300 rounded-lg mt-4"
                        />
                        <textarea
                            placeholder="Votre message"
                            className="p-4 w-full border border-gray-300 rounded-lg mt-4"
                        />
                        <button
                            type="submit"
                            className="mt-6 px-6 py-3 bg-green-cb text-white font-bold rounded-lg w-full"
                        >
                            Envoyer
                        </button>
                    </form>
                </section>

            <Footer/>
        </>
    );
};

export default Home;
