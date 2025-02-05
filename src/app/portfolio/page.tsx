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
            <div className="p-8 h-full flex flex-col">
                <button onClick={() => setIsMenuOpen(false)} className="md:hidden absolute top-4 right-4">
                    <X size={24} className="text-gray-400" />
                </button>

                <div className="mb-12">
                    <h1 className="font-light text-2xl tracking-wider mb-2">BÉRÉNICE VERGÉ</h1>
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
            <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
                    <div className="relative">
                        <div className="relative aspect-w-16 aspect-h-9 overflow-hidden">
                            <div
                                className="flex transition-transform duration-500 ease-out"
                                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                            >
                                {project.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`${project.title} - Image ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                ))}
                            </div>

                            <button
                                onClick={prevSlide}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
                            >
                                <ChevronLeft size={24} />
                            </button>

                            <button
                                onClick={nextSlide}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                            {project.images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`w-2 h-2 rounded-full transition-all ${
                                        currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-2xl font-light tracking-wider mb-2">{project.title}</h2>
                                <p className="text-sm text-gray-400">{project.category}</p>
                            </div>
                            <button
                                onClick={() => {
                                    onClose();
                                    setCurrentSlide(0);
                                }}
                                className="text-gray-400 hover:text-black"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <p className="text-gray-600">{project.description}</p>
                    </div>
                </div>
            </div>
        );
    };

    const PortfolioGrid = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {portfolioItems.map((item) => (
                <div
                    key={item.id}
                    onClick={() => {
                        setSelectedProject(item);
                        setIsModalOpen(true);
                    }}
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                >
                    <div className="aspect-w-3 aspect-h-4">
                        <img
                            src={item.images[0]}
                            alt={item.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-4">
                        <h3 className="font-light tracking-wider text-lg mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-400 mb-2">{item.category}</p>
                        <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );

    const About = () => (
        <div className="max-w-2xl mx-auto p-8">
            <h2 className="font-light text-2xl mb-6 tracking-wider">À PROPOS</h2>
            <p className="text-gray-600 leading-relaxed">
                Photographe de mode basée à Paris, je collabore avec les plus grandes maisons de luxe
                et magazines de mode. Mon approche minimaliste et mon attention aux détails créent
                des images intemporelles qui capturent l'essence de chaque sujet.
            </p>
        </div>
    );

    const Contact = () => (
        <div className="max-w-2xl mx-auto p-8">
            <h2 className="font-light text-2xl mb-6 tracking-wider">CONTACT</h2>
            <div className="space-y-4">
                <p className="text-gray-600">Pour toute demande de collaboration ou information:</p>
                <p className="text-gray-800">contact@emmadubois.com</p>
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