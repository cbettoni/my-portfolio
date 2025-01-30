import React, { useState, useEffect, useRef } from 'react';
import Dialog from './Dialog';

const SnakeGameModal = ({ isOpen, onClose }) => {
    const [gameRunning, setGameRunning] = useState(false);
    const [score, setScore] = useState(0);
    const [speed, setSpeed] = useState(200);
    const canvasRef = useRef(null);
    const gameLoopRef = useRef(null);

    const gridSize = 20;
    const canvasSize = 300;

    let snake = [{ x: 5, y: 5 }];
    let direction = { x: 1, y: 0 };
    let food = getRandomFoodPosition();

    useEffect(() => {
        if (gameRunning) {
            document.addEventListener('keydown', changeDirection);
            document.addEventListener('keydown', preventScroll);
            startGameLoop();
        } else {
            document.removeEventListener('keydown', changeDirection);
            document.removeEventListener('keydown', preventScroll);
            clearInterval(gameLoopRef.current);
        }

        return () => {
            document.removeEventListener('keydown', changeDirection);
            document.removeEventListener('keydown', preventScroll);
            clearInterval(gameLoopRef.current);
        };
    }, [gameRunning, speed]);

    const preventScroll = (e) => {
        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
            e.preventDefault();
        }
    };

    const startGameLoop = () => {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = setInterval(updateGame, speed);
    };

    function getRandomFoodPosition() {
        return {
            x: Math.floor(Math.random() * (canvasSize / gridSize)),
            y: Math.floor(Math.random() * (canvasSize / gridSize))
        };
    }

    const changeDirection = (e) => {
        if (e.key === 'ArrowUp' && direction.y === 0) direction = { x: 0, y: -1 };
        if (e.key === 'ArrowDown' && direction.y === 0) direction = { x: 0, y: 1 };
        if (e.key === 'ArrowLeft' && direction.x === 0) direction = { x: -1, y: 0 };
        if (e.key === 'ArrowRight' && direction.x === 0) direction = { x: 1, y: 0 };
    };

    const updateGame = () => {
        let newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

        // 🟢 Traversée des murs: réapparaît de l'autre côté
        if (newHead.x < 0) newHead.x = (canvasSize / gridSize) - 1;
        if (newHead.y < 0) newHead.y = (canvasSize / gridSize) - 1;
        if (newHead.x >= canvasSize / gridSize) newHead.x = 0;
        if (newHead.y >= canvasSize / gridSize) newHead.y = 0;

        // Vérifier collision avec le corps
        if (snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
            resetGame();
            return;
        }

        snake.unshift(newHead);

        if (newHead.x === food.x && newHead.y === food.y) {
            // 🍏 Mange la pomme, grandit et accélère
            setScore((prevScore) => prevScore + 1);
            setSpeed((prevSpeed) => Math.max(50, prevSpeed - 5));
            startGameLoop();
            food = getRandomFoodPosition();
        } else {
            snake.pop();
        }

        drawGame();
    };

    const resetGame = () => {
        setGameRunning(false);
        setScore(0);
        setSpeed(200);
        snake = [{ x: 5, y: 5 }];
        direction = { x: 1, y: 0 };
    };

    const drawGame = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvasSize, canvasSize);

        // 🟢 Dessiner le serpent
        ctx.fillStyle = 'lime';
        snake.forEach(segment => {
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
        });

        // 🔴 Dessiner la nourriture
        ctx.fillStyle = 'red';
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
    };

    return (
        <Dialog isOpen={isOpen} onClose={onClose} title="Snake Game" className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg relative w-[75vw] h-[75vh] flex flex-col items-center">
                <h2 className="text-xl font-bold">Score: {score}</h2>
                <canvas ref={canvasRef} width={canvasSize} height={canvasSize} className="border border-black mt-4" />
                <div className="mt-4 space-x-4">
                    <button onClick={() => setGameRunning(true)} className="px-4 py-2 bg-green-500 text-white rounded">Start</button>
                    <button onClick={() => setGameRunning(false)} className="px-4 py-2 bg-gray-500 text-white rounded">Stop</button>
                </div>
            </div>
        </Dialog>
    );
};

export default SnakeGameModal;
