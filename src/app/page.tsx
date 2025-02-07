'use client';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '../components/header';
import Footer from '../components/footer';
import AsciiModal from '../components/AsciiModal';
import WavePatterns from '../components/WavePatterns';
import SnakeGameModal from '../components/SnakeGameModal';
import Button from "@/components/button";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const [activeTab, setActiveTab] = useState('experiences'); // Onglet actif, par défaut 'experiences'

    const handleTabClick = (tab) => {
        setActiveTab(tab); // Changer l'onglet actif lorsque l'utilisateur clique sur un onglet
    };

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
            yPercent: 80,
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
            title: "Pixel to ASCII",
            description: "Convertissez vos images en oeuvres ASCII uniques en un clic ! Importez une image et téléchargez le résultat instantanément.",
            link: "#",
            imageUrl: "/geometric-shape.jpg",
            onClick: () => setIsAsciiModalOpen(true),
        },
        {
            title: "Snake Revival",
            description: "Revivez la magie du classique Snake, un jeu simple et addictif qui vous plonge dans l'ère des premiers écrans.",
            link: "#",
            imageUrl: "/geometric-shape.jpg",
            onClick: () => setIsSnakeGameOpen(true),
        },
        {
            title: "Minimalist Photographer Portfolio",
            description: "Un template React épuré, parfait pour mettre en valeur vos créations photographiques avec élégance et simplicité.",
            link: "/portfolio",
            imageUrl: "/geometric-shape.jpg",
            onClick: undefined,
        },
    ];

    return (
        <>
            <Header/>

                {/* Section Hero */}
            <section className="hero h-screen z-10 flex flex-col justify-center items-center text-center relative overflow-hidden">
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
            <section className="about-section py-20 bg-light-gray-cb relative w-full h-full">
                <WavePatterns />
                <div id="about" className="max-w-3xl mx-auto text-center px-4 sm:px-0 relative z-10">
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
                className="experiences-projects-section py-20 bg-dark-gray-cb relative"
                style={{
                    backgroundImage: "url('/geometric-shape.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                {/* Fond noir transparent */}
                <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

                {/* Contenu de la section */}
                <div className="tabs-container text-center relative z-20">
                    <Button
                        className={`tab-button ${activeTab === 'experiences' ? 'active' : ''}`}
                        onClick={() => handleTabClick('experiences')}
                        variant="btn_primary"
                    >
                        Expériences en développement
                    </Button>

                    <Button
                        className={`tab-button ${activeTab === 'projects' ? 'active' : ''}`}
                        onClick={() => handleTabClick('projects')}
                        variant="btn_primary"
                    >
                        Expériences en communication
                    </Button>
                </div>

                {/* Contenu en fonction de l'onglet sélectionné */}
                {activeTab === 'experiences' && (
                    <div className="experiences-content relative z-20">
                        <h2
                            id="experiences"
                            className="text-3xl sm:text-4xl font-bold text-light-gray-cb text-center"
                        >
                            Mes Expériences
                        </h2>

                        <div className="experience-card mx-4 mt-8 max-w-3xl sm:mx-auto bg-white/20 backdrop-blur-lg rounded-lg shadow-lg p-8">
                            <h3 className="text-2xl font-bold text-white">
                                Développeuse Frontend | Gosselink digital
                            </h3>
                            <h4 className="text-xl font-bold text-white mt-6">Rôles</h4>
                            <ul className="text-white">
                                <li>Conception, développement et mise en production d’interfaces Web et mobiles en respectant les maquettes Figma pour divers secteurs et clients.</li>
                                <li>Intégration et theming Wordpress sur mesure.</li>
                                <li>Maintenance et optimisation de sites web existants.</li>
                                <li>Réalisations de sites sur mesure.</li>
                                <li><span className="font-bold">Développement Front-End : </span>HTML, SCSS, Twig, VueJS, PHP, Tailwind, JavaScript, Next.js, TypeScript.</li>
                                <li><span className="font-bold">Collaboration & Gestion de projet : </span>Git, Bitbucket, Jira, Confluence.</li>
                            </ul>
                            <h4 className="text-xl font-bold text-white mt-6">Réalisations</h4>
                            <ul className="text-white">
                                <li>Carrousels interactifs avec Slick et JS : Développement de carrousels dynamiques et personnalisés.</li>
                                <li>Menus déroulants et navigation dynamique : Création de menus déroulants avec animations CSS et JavaScript, pour une navigation intuitive.</li>
                                <li>Projets WordPress 100% custom : Développement de sites WordPress personnalisés.</li>
                                <li>Création de blocs Gutenberg sur mesure : Développement de blocs variés pour la gestion de contenu par les utilisateurs finaux.</li>
                                <li>Animations interactives (JavaScript, GSAP, CSS, SVG) : Création d'animations visuelles engageantes avec GSAP, CSS et SVG.</li>
                                <li>Optimisation mobile et responsive : Design mobile-first pour garantir une expérience fluide sur tous les appareils.</li>
                                <li>Amélioration des performances et SEO : Optimisation des temps de chargement et des images. Mise en œuvre des meilleures pratiques SEO.</li>
                            </ul>
                        </div>

                        <div className="experience-card mx-4 mt-8 max-w-3xl sm:mx-auto bg-white/20 backdrop-blur-lg rounded-lg shadow-lg p-8">
                            <h3 className="text-2xl font-bold text-white">
                                Intégratrice Web | ITFacto
                            </h3>
                            <ul className="text-white">
                                <li>Conception, réalisation et mise en production de landing pages (HTML5, CSS, Bootstrap, JS, Git, Gitlab).</li>
                                <li>Conception et création de newsletters (HTML5, CSS).</li>
                                <li>Création de maquettes de webdesign (Figma, Illustrator, Photoshop).</li>
                            </ul>
                        </div>
                    </div>
                )}

                {activeTab === 'projects' && (
                    <div className="projects-content relative z-20">
                        <h2
                            id="projects"
                            className="text-3xl sm:text-4xl font-bold text-light-gray-cb text-center mb-10"
                        >
                            Mes Expériences en Communication et marketing
                        </h2>
                        <div className="experience-card mx-4 mt-8 max-w-3xl sm:mx-auto bg-white/20 backdrop-blur-lg rounded-lg shadow-lg p-8">
                            <h3 className="text-2xl font-bold text-white">
                                Développeuse Frontend | Gosselink digital
                            </h3>
                            <h4 className="text-xl font-bold text-white mt-6">Rôles</h4>
                            <ul className="text-white">
                                <li>Conception, développement et mise en production d’interfaces Web et mobiles en respectant les maquettes Figma pour divers secteurs et clients.</li>
                                <li>Intégration et theming Wordpress sur mesure.</li>
                                <li>Maintenance et optimisation de sites web existants.</li>
                                <li>Réalisations de sites sur mesure.</li>
                                <li><span className="font-bold">Développement Front-End : </span>HTML, SCSS, Twig, VueJS, PHP, Tailwind, JavaScript, Next.js, TypeScript.</li>
                                <li><span className="font-bold">Collaboration & Gestion de projet : </span>Git, Bitbucket, Jira, Confluence.</li>
                            </ul>
                            <h4 className="text-xl font-bold text-white mt-6">Réalisations</h4>
                            <ul className="text-white">
                                <li>Carrousels interactifs avec Slick et JS : Développement de carrousels dynamiques et personnalisés.</li>
                                <li>Menus déroulants et navigation dynamique : Création de menus déroulants avec animations CSS et JavaScript, pour une navigation intuitive.</li>
                                <li>Projets WordPress 100% custom : Développement de sites WordPress personnalisés.</li>
                                <li>Création de blocs Gutenberg sur mesure : Développement de blocs variés pour la gestion de contenu par les utilisateurs finaux.</li>
                                <li>Animations interactives (JavaScript, GSAP, CSS, SVG) : Création d'animations visuelles engageantes avec GSAP, CSS et SVG.</li>
                                <li>Optimisation mobile et responsive : Design mobile-first pour garantir une expérience fluide sur tous les appareils.</li>
                                <li>Amélioration des performances et SEO : Optimisation des temps de chargement et des images. Mise en œuvre des meilleures pratiques SEO.</li>
                            </ul>
                        </div>

                        <div className="experience-card mx-4 mt-8 max-w-3xl sm:mx-auto bg-white/20 backdrop-blur-lg rounded-lg shadow-lg p-8">
                            <h3 className="text-2xl font-bold text-white">
                                Intégratrice Web | ITFacto
                            </h3>
                            <ul className="text-white">
                                <li>Conception, réalisation et mise en production de landing pages (HTML5, CSS, Bootstrap, JS, Git, Gitlab).</li>
                                <li>Conception et création de newsletters (HTML5, CSS).</li>
                                <li>Création de maquettes de webdesign (Figma, Illustrator, Photoshop).</li>
                            </ul>
                        </div>
                    </div>
                )}
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
