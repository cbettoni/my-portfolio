"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, Mail, ChevronLeft, ChevronRight } from 'lucide-react';

const Portfolio = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState('portfolio');
    const [selectedProject, setSelectedProject] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen]);

    // Données de démonstration enrichies
    const portfolioItems = [
        {
            id: 1,
            title: 'Collection Printemps',
            category: 'Editorial',
            description: 'Une série éditoriale captivante',
            images: [
                '/berenice/placeholder.jpg',
                '/berenice/placeholder-2.jpg',
                '/berenice/placeholder-3.jpg'
            ]
        },
        {
            id: 2,
            title: 'Haute Couture',
            category: 'Fashion Week',
            description: 'Backstage et défilé pendant la Fashion Week de Paris, mettant en lumière les créations les plus audacieuses.',
            images: [
                '/berenice/placeholder.jpg',
                '/berenice/placeholder-2.jpg',
                '/berenice/placeholder-3.jpg'
            ]
        },
        {
            id: 3,
            title: 'Portrait Studio',
            category: 'Portrait',
            description: 'Une série de portraits intimes en studio',
            images: [
                '/berenice/placeholder.jpg',
                '/berenice/placeholder-2.jpg',
                '/berenice/placeholder-3.jpg'
            ]
        },
        {
            id: 4,
            title: 'Campagne Luxe',
            category: 'Commercial',
            description: 'Campagne publicitaire pour une maison de luxe prestigieuse, alliant sophistication et modernité.',
            images: [
                '/berenice/placeholder.jpg',
                '/berenice/placeholder-2.jpg',
                '/berenice/placeholder-3.jpg'
            ]
        }
    ];

    const Navigation = () => (
        <nav className={`fixed top-0 left-0 h-full bg-white w-64 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
      transition-transform duration-300 ease-in-out md:translate-x-0 border-r border-gray-100 z-50`}>
            <div className="px-8 py-12 h-full flex flex-col">
                <button onClick={() => setIsMenuOpen(false)} className="md:hidden absolute top-4 right-4">
                    <X size={24} className="text-gray-400" />
                </button>

                <div className="mb-12">
                    <h1 className="font-light text-2xl tracking-wider mb-2">Jane Doe</h1>
                    <p className="text-gray-400 text-sm">Photographe Mode & Portrait</p>
                </div>

                <div className="space-y-6 font-light tracking-wide">
                    <button
                        onClick={() => setCurrentPage('portfolio')}
                        className={`block ${currentPage === 'portfolio' ? 'text-black' : 'text-gray-400'}`}
                    >
                        PORTFOLIO
                    </button>
                    <button
                        onClick={() => setCurrentPage('about')}
                        className={`block ${currentPage === 'about' ? 'text-black' : 'text-gray-400'}`}
                    >
                        À PROPOS
                    </button>
                    <button
                        onClick={() => setCurrentPage('contact')}
                        className={`block ${currentPage === 'contact' ? 'text-black' : 'text-gray-400'}`}
                    >
                        CONTACT
                    </button>
                </div>

                <div className="mt-auto space-x-4">
                    <Instagram size={20} className="inline text-gray-400 hover:text-black" />
                    <Mail size={20} className="inline text-gray-400 hover:text-black" />
                </div>
            </div>
        </nav>
    );

    const ProjectModal = ({ project, onClose }) => {
        if (!project) return null;

        const nextSlide = () => {
            setCurrentSlide((prev) =>
                prev === project.images.length - 1 ? 0 : prev + 1
            );
        };

        const prevSlide = () => {
            setCurrentSlide((prev) =>
                prev === 0 ? project.images.length - 1 : prev - 1
            );
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-75 z-[100] flex items-center justify-center">
                <div className="bg-white w-full max-w-5xl relative h-[85vh] flex flex-col">
                    {/* Bouton fermeture */}
                    <button
                        onClick={() => {
                            onClose();
                            setCurrentSlide(0);
                        }}
                        className="absolute right-4 top-4 text-white hover:text-gray-300 z-[102]"
                    >
                        <X size={24} />
                    </button>

                    {/* Carousel */}
                    <div className="relative flex-1 bg-black overflow-hidden">
                        <div
                            className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {project.images.map((image, index) => (
                                <div key={index} className="flex-shrink-0 w-full h-full">
                                    <img
                                        src={image}
                                        alt={`${project.title} - Image ${index + 1}`}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Navigation buttons */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white text-black p-3 rounded-full hover:bg-opacity-75 transition-opacity z-[101]"
                        >
                            <ChevronLeft size={24} />
                        </button>

                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white text-black p-3 rounded-full hover:bg-opacity-75 transition-opacity z-[101]"
                        >
                            <ChevronRight size={24} />
                        </button>


                        {/* Indicateurs de slides */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3 z-[101]">
                            {project.images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                                        currentSlide === index
                                            ? 'bg-white scale-100'
                                            : 'bg-white/50 scale-75 hover:scale-90'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Bandeau d'information */}
                    <div className="bg-white px-8 py-6 border-t border-gray-100">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-2xl font-light tracking-wider mb-2">{project.title}</h2>
                            <p className="text-sm text-gray-400 mb-3">{project.category}</p>
                            <p className="text-gray-600 leading-relaxed">{project.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const PortfolioGrid = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 py-12">
            {portfolioItems.map((item) => (
                <div
                    key={item.id}
                    onClick={() => {
                        setSelectedProject(item);
                        setIsModalOpen(true);
                    }}
                    className="relative group cursor-pointer rounded-xl overflow-hidden shadow-xl transition-all duration-500 transform hover:scale-105"
                >
                    <div className="w-full h-80 overflow-hidden rounded-xl">
                        <img
                            src={item.images[0]}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                    </div>

                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-6 rounded-b-xl transition-all duration-300 opacity-0 group-hover:opacity-100">
                        <h3 className="font-semibold text-2xl text-white mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-300">{item.category}</p>
                    </div>
                </div>
            ))}
        </div>
    );

    const About = () => (
        <div className="max-w-2xl mx-auto px-6 py-12">
            <h2 className="font-light text-2xl mb-6 tracking-wider">À PROPOS</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
                Photographe de mode basée à Paris, je collabore avec les plus grandes maisons de luxe
                et magazines de mode. Mon approche minimaliste et mon attention aux détails créent
                des images intemporelles qui capturent l'essence de chaque sujet.
            </p>
            <div className="aspect-w-16 aspect-h-9 mb-6">
                <img
                    src="/berenice/placeholder.jpg"
                    alt="Photographe en action"
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                />
            </div>
        </div>
    );

    const Contact = () => (
        <div className="max-w-2xl mx-auto px-6 py-12">
            <h2 className="font-light text-2xl mb-6 tracking-wider">CONTACT</h2>
            <div className="space-y-4">
                <p className="text-gray-600">Pour toute demande de collaboration ou information:</p>
                <p className="text-gray-800">contact@janedoe.com</p>
                <p className="text-gray-800">+33 6 12 34 56 78</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-white">
            <button
                onClick={() => setIsMenuOpen(true)}
                className="md:hidden fixed top-4 left-4 z-50"
            >
                <Menu size={24} className="text-gray-400" />
            </button>

            <Navigation />

            <main className="md:ml-64 min-h-screen">
                {currentPage === 'portfolio' && <PortfolioGrid />}
                {currentPage === 'about' && <About />}
                {currentPage === 'contact' && <Contact />}
            </main>

            {isModalOpen && (
                <ProjectModal
                    project={selectedProject}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedProject(null);
                    }}
                />
            )}
        </div>
    );
};

export default Portfolio;