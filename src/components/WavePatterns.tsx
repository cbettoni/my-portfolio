'use client';

import { useEffect, useRef } from 'react';

const WavePatterns = () => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0, moved: false });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let time = 0;

        // Configuration optimisée des vagues
        const waveCount = 24;
        const amplitude = 20;
        const frequency = 0.008;
        const speed = 0.015;
        const mouseInfluence = 200;
        const mouseForce = 120;
        const waveSpacing = 25;

        // Fonction de redimensionnement du canvas
        const resizeCanvas = () => {
            const dpr = window.devicePixelRatio || 1;
            const width = window.innerWidth;
            const height = window.innerHeight;

            // Ajuster la taille réelle du canvas pour haute résolution
            canvas.width = width * dpr;
            canvas.height = height * dpr;

            // Garder les styles CSS pour que le canvas prenne toute la place du conteneur
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            // Appliquer un facteur de mise à l'échelle pour la résolution (important pour les écrans Retina)
            ctx.scale(dpr, dpr);
        };

        // Fonction pour dessiner les vagues
        const drawWave = (yOffset, opacity) => {
            ctx.beginPath();
            ctx.moveTo(0, canvas.height / 2);

            // Dessin des vagues
            for (let x = 0; x <= canvas.width; x += 1) {
                let y = canvas.height / 2;

                // Ondulation avec effet complexe
                y += Math.sin(x * frequency + time) * amplitude;
                y += Math.cos(x * frequency * 0.6 + time * 1.5) * amplitude * 0.5;

                // Influence de la souris sur les vagues
                if (mouseRef.current.moved) {
                    const dx = x - mouseRef.current.x;
                    const dy = (canvas.height / 2 + yOffset) - mouseRef.current.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < mouseInfluence) {
                        const force = (1 - distance / mouseInfluence) * mouseForce;
                        const angle = Math.atan2(dy, dx);
                        y += Math.sin(distance * 0.05 - time * 2) * force;
                        y += Math.cos(angle) * force * 0.2;
                    }
                }

                y += yOffset;
                ctx.lineTo(x, y);
            }

            // Dégradé de couleur pour les vagues
            const gradient = ctx.createLinearGradient(0, canvas.height / 2 + yOffset - amplitude, 0, canvas.height / 2 + yOffset + amplitude);
            gradient.addColorStop(0, `rgba(50, 50, 50, ${opacity * 0.8})`);
            gradient.addColorStop(0.5, `rgba(255, 255, 255, ${opacity * 0.9})`);
            gradient.addColorStop(1, `rgba(50, 50, 50, ${opacity * 0.8})`);

            ctx.strokeStyle = gradient;
            ctx.stroke();
        };

        // Animation des vagues
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.lineWidth = 1;
            ctx.lineCap = 'round';

            for (let i = 0; i < waveCount; i++) {
                const yOffset = (i - waveCount / 2) * waveSpacing;
                const distanceFromCenter = Math.abs(i - waveCount / 2) / (waveCount / 2);
                const opacity = 0.15 + (0.25 * (1 - distanceFromCenter));
                drawWave(yOffset, opacity);
            }

            time += speed;
            animationFrameId = requestAnimationFrame(animate);
        };

        // Gestion des mouvements de souris
        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
                moved: true
            };
        };

        // Arrêter l'effet quand la souris quitte le canvas
        const handleMouseLeave = () => {
            mouseRef.current.moved = false;
        };

        // Initialisation
        resizeCanvas();  // Premier redimensionnement
        window.addEventListener('resize', resizeCanvas); // Réagir au redimensionnement de la fenêtre
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 opacity-70 m-auto"
        />
    );
};

export default WavePatterns;
