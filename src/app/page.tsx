'use client';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '../components/header';
import Footer from '../components/footer';
import AsciiModal from '../components/AsciiModal';
import SnakeGameModal from '../components/SnakeGameModal';
import Button from "@/components/button";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    useEffect(() => {
        // Animation initiale du titre et sous-titre avec un effet de fondu et de montée
        const tl = gsap.timeline();

        tl.from('.hero-title', {
            opacity: 0,
            y: 100,
            duration: 1.2,
            ease: 'power4.out'
        })
            .from('.hero-subtitle', {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: 'power3.out'
            }, '-=0.8') // Commence légèrement avant la fin de l'animation du titre
            .from('.hero-button', {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: 'power2.out'
            }, '-=0.6');

        // Effet parallax sur l'arrière-plan
        gsap.to('.hero-background', {
            yPercent: 50,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });

        // Animation du gradient
        gsap.to('.hero-gradient', {
            opacity: 0.8,
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: '+=500',
                scrub: true
            }
        });

        // Effet de disparition progressive du contenu au scroll
        gsap.to('.hero-content', {
            opacity: 0,
            y: -50,
            scrollTrigger: {
                trigger: '.hero',
                start: 'center center',
                end: 'bottom center',
                scrub: true
            }
        });

        // Animation de la section "À propos de moi"
        gsap.from('.about-section', {
            opacity: 0,
            y: 100,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: ".hero",
                start: "bottom center",
                toggleActions: "play none none reverse",
            }
        });

    }, []);

    const smoothScroll = (e) => {
        e.preventDefault(); // Empêche le comportement par défaut de Next.js
        const targetId = e.currentTarget.getAttribute("href").replace("#", "");
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: "smooth",
            });
        }
    };

    const [isAsciiModalOpen, setIsAsciiModalOpen] = useState(false);
    const [isSnakeGameOpen, setIsSnakeGameOpen] = useState(false);

    const projects = [
        {
            title: "Projet 1",
            description: "Crucifix de cibole de ciboire de Jésus de plâtre de viande à chien de saint-ciboire de câline de bine de bout d'crisse de câlique de cibouleau.",
            link: "#",
            imageUrl: "/geometric-shape.jpg",
            onClick: () => setIsAsciiModalOpen(true),
        },
        {
            title: "Projet 2",
            description: "Viande à chien d'astie de bâtard de cossin de calvaire d'enfant d'chienne d'esprit de charrue de tabarnak d'ostifie.",
            link: "#",
            imageUrl: "/geometric-shape.jpg",
            onClick: () => setIsSnakeGameOpen(true),
        },
        {
            title: "Projet 3",
            description: "Saint-sacrament de colon de purée de patente à gosse de verrat de torrieux de crime de ciboire de câline de saintes fesses.",
            link: "/portfolio",
            imageUrl: "/geometric-shape.jpg",
            onClick: undefined,
        },
    ];

    return (
        <>
            <Header/>

                {/* Section Hero */}
            <section className="hero h-screen flex flex-col justify-center items-center text-center relative overflow-hidden">
                {/* Arrière-plan avec effet parallax */}
                <div
                    className="hero-background absolute inset-0 w-full h-[120%] -top-[10%]"
                    style={{
                        backgroundImage: "url('/portrait-christelle.jpg')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                ></div>

                {/* Gradient overlay amélioré */}
                <div className="hero-gradient absolute inset-0 bg-gradient-to-r from-yellow-300/60 to-blue-500/40 opacity-60 z-[1]"></div>

                {/* Contenu principal */}
                <div className="hero-content relative z-[2] px-6 sm:px-16">
                    <h1 className="hero-title text-4xl sm:text-6xl font-extrabold text-white mb-6">
                        Bonjour, je suis Christelle Bettoni
                    </h1>
                    <p className="hero-subtitle text-xl sm:text-2xl text-white mb-8">
                        Développeuse Frontend | Passionnée par l'UX/UI
                    </p>
                    <div className="hero-button">
                        <Link href="#projects" passHref legacyBehavior>
                            <a onClick={smoothScroll}>
                                <Button type="submit" variant="btn_secondary" as="span">
                                    Voir mes projets
                                </Button>
                            </a>
                        </Link>
                    </div>
                </div>
            </section>


            {/* À propos */}
                <section className="about-section py-20 bg-light-gray-cb">
                    <div id="about" className="max-w-3xl mx-auto text-center px-4 sm:px-0">
                        <h2 className="text-3xl sm:text-4xl font-bold text-dark-gray-cb">À propos de moi</h2>
                        <p className="mt-6 px-4 text-dark-gray-cb">
                            Après plusieurs années d’expérience dans les domaines de la communication et du marketing, j'ai entrepris une reconversion professionnelle en développement web afin de maîtriser les mécanismes des applications web et relever les défis techniques qui y sont liés. Mes expériences en tant qu'Intégratrice Web et Développeuse Front-End ont confirmé ma passion pour ce métier et mon désir constant d'apprendre et de me perfectionner.
                            <br /><br />
                            Créative, autonome et orientée résultats, je suis animée par le goût du challenge et l'acquisition continue de nouvelles compétences. Aujourd'hui, je souhaite mettre à profit mon expertise technique et mon expérience en communication pour contribuer efficacement au succès d'une équipe dynamique.
                        </p>
                    </div>
                </section>

                {/* Expériences */}
            <section
                className="experiences-section py-20 bg-dark-gray-cb relative bg-cover bg-center"
                style={{ backgroundImage: "url('/geometric-shape.jpg')" }}
            >
                <h2 id="experiences" className="text-3xl sm:text-4xl font-bold text-light-gray-cb text-center relative z-10">
                    Mes Expériences
                </h2>
                <div className="absolute inset-0 bg-black/70"></div>

                <div className="experience-card mx-4 mt-8 max-w-3xl lg:mx-auto bg-white/20 backdrop-blur-lg rounded-lg shadow-lg p-8">
                    <h3 className="text-2xl font-bold text-white">
                        Développeuse Frontend | Gosselink digital
                    </h3>
                    <p className="mt-4 text-white">
                        Depuis mars 2023, j'ai contribué à la création d'interfaces utilisateurs modernes et performantes en utilisant des technologies telles que React.js, Next.js, HTML, SCSS, Twig, VueJS, TypeScript, PHP, et Tailwind...
                    </p>
                </div>

                <div className="experience-card mx-4 mt-8 max-w-3xl lg:mx-auto bg-white/20 backdrop-blur-lg rounded-lg shadow-lg p-8">
                    <h3 className="text-2xl font-bold text-white">
                        Intégratrice Web | ITFacto
                    </h3>
                    <p className="mt-4 text-white">
                        De janvier à mars 2023 - J'ai conçu, réalisé et mis en production des landing pages dynamiques en utilisant HTML5, CSS, Bootstrap, JS...
                    </p>
                </div>
            </section>


            {/* Projets */}
            <section className="projects-section py-20 bg-light-gray-cb">
                <h2 id="projects" className="text-3xl sm:text-4xl font-bold text-dark-gray-cb text-center mb-10">
                    Mes Projets
                </h2>
                <div className="flex flex-wrap justify-center lg:justify-evenly gap-8 px-6 sm:px-16">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="project-card rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 relative group w-80 h-80 overflow-hidden"
                        >
                            {/* Image en background */}
                            <img
                                src={project.imageUrl}
                                alt={project.title}
                                className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                            />
                            {/* Overlay sombre au survol */}
                            <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-60 transition-opacity duration-300"></div>
                            {/* Contenu */}
                            <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
                                <h3 className="text-white text-2xl font-bold">{project.title}</h3>
                                <p className="text-white font-light text-base mt-2">{project.description}</p>

                                {index === 2 ? (
                                    // Pour le projet 3, on ouvre un lien dans un nouvel onglet
                                    <Button
                                        variant="btn_primary"
                                        onClick={() => window.open(project.link, "_blank")}
                                        className="mt-4"
                                    >
                                        Voir le projet
                                    </Button>
                                ) : (
                                    // Pour les autres projets, ouvrir la modale
                                    <Button
                                        variant="btn_primary"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            project.onClick();
                                        }}
                                        className="mt-4"
                                    >
                                        Voir le projet
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>



            {/* Modale ASCII */}
            <AsciiModal isOpen={isAsciiModalOpen} onClose={() => setIsAsciiModalOpen(false)} />
            <SnakeGameModal isOpen={isSnakeGameOpen} onClose={() => setIsSnakeGameOpen(false)} />

            {/* Contact */}
                <section id="contact" className="contact-section py-6 bg-light-gray-cb">
                    <h2 id="contact" className="text-3xl sm:text-4xl font-bold text-dark-gray-cb text-center">Me contacter</h2>
                        <div className="my-6 flex justify-center">
                            <Link href="mailto:christelle.bettoni@gmail.com" passHref>
                                <Button
                                    type="submit"
                                    variant="btn_secondary"
                                    as="a"
                                >
                                    Envoyer un mail
                                </Button>
                            </Link>
                        </div>

                        <div className="my-6 flex justify-center">
                            <Link href="/CV_CBettoni_FrontEnd.pdf" passHref>
                                <Button
                                    type="submit"
                                    variant="btn_secondary"
                                    as="a"
                                >
                                    Télécharger mon CV
                                </Button>
                            </Link>
                        </div>
                </section>
            <Footer/>
        </>
    );
};

export default Home;
