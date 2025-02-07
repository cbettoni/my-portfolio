'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '@/styles/header.scss';
import { initNavbar } from '@/js/navbar';
import Button from './button';

const Header = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    useEffect(() => {
        initNavbar();
    }, []);

    return (
        <header className="w-full m-auto">
            <div className="sticky-nav flex flex-col justify-between 2xl:flex-row transition-colors duration-300">
                <div className="container flex justify-between flex-col 2xl:flex-row">
                    <div className="flex justify-between items-center">
                        <Link href="/" className="logo w-[50px] h-auto object-contain">
                            <Image
                                src="/logo.svg"
                                alt="Logo"
                                width={182}
                                height={50}
                                className="w-full"
                            />
                        </Link>

                        <button
                            className={`block burger-menu ${isMenuOpen ? 'active' : ''}`}
                            id="toggleMenuButton"
                            onClick={toggleMenu}
                        >
                            <span className="mb-1"></span>
                            <span className="mb-1"></span>
                            <span></span>
                        </button>
                    </div>

                    <nav
                        id="navMenu"
                        className={`${
                            isMenuOpen ? 'flex' : 'hidden'
                        } transition delay-75 2xl:flex 2xl:flex-grow 2xl:justify-end pt-5 md:pt-0 items-center`}
                    >
                        <ul className="flex flex-col 2xl:flex-row lg:justify-end gap-x-6 md:items-center md:h-full text-center 2xl:text-left">
                            <li className="menu-item text-light-gray-cb whitespace-nowrap">
                                <Link href="#about" className="relative inline-block group">
                                    <span>
                                        Qui suis-je ?
                                    </span>
                                </Link>
                            </li>
                            <li className="menu-item text-light-gray-cb whitespace-nowrap">
                                <Link href="#experiences" className="relative inline-block group">
                                    <span>
                                        Mes expériences
                                    </span>
                                </Link>
                            </li>
                            <li className="menu-item text-light-gray-cb whitespace-nowrap">
                                <Link href="#projects" className="relative inline-block group">
                                    <span>
                                        Mes projets
                                    </span>
                                </Link>
                            </li>
                            <Link href="#contact" passHref>
                                <Button as="a">Me contacter</Button>
                            </Link>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
