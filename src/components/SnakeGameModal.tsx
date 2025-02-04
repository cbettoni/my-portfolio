'use client';

import { useState, useEffect, useRef } from 'react';
import Dialog from './Dialog';
import Button from '@/components/button';

const SnakeGameModal = ({ isOpen, onClose }) => {
    const canvasRef = useRef(null);
    const [gameState, setGameState] = useState({
        snake: [{ x: 5, y: 5 }],
        food: { x: 10, y: 10 },
        direction: { x: 1, y: 0 },
        score: 0,
        isRunning: false,
        speed: 200
    });
    const gameLoopRef = useRef(null);

    const GRID_SIZE = 20;
    const CANVAS_SIZE = 300;
    const CELL_SIZE = CANVAS_SIZE / GRID_SIZE;

    useEffect(() => {
        if (canvasRef.current) {
            drawGame();
        }
    }, [gameState.snake, gameState.food]);

    useEffect(() => {
        if (gameState.isRunning) {
            gameLoopRef.current = setInterval(updateGame, gameState.speed);
            window.addEventListener('keydown', handleKeyPress);
        }

        return () => {
            clearInterval(gameLoopRef.current);
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [gameState.isRunning, gameState.direction, gameState.speed]);

    const getRandomPosition = () => ({
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
    });

    const handleKeyPress = (event) => {
        event.preventDefault();

        const newDirection = { ...gameState.direction };
        switch (event.key) {
            case 'ArrowUp':
                if (gameState.direction.y !== 1) newDirection.x = 0, newDirection.y = -1;
                break;
            case 'ArrowDown':
                if (gameState.direction.y !== -1) newDirection.x = 0, newDirection.y = 1;
                break;
            case 'ArrowLeft':
                if (gameState.direction.x !== 1) newDirection.x = -1, newDirection.y = 0;
                break;
            case 'ArrowRight':
                if (gameState.direction.x !== -1) newDirection.x = 1, newDirection.y = 0;
                break;
        }

        setGameState(prev => ({ ...prev, direction: newDirection }));
    };

    const updateGame = () => {
        setGameState(prev => {
            const newSnake = [...prev.snake];
            const newHead = {
                x: (newSnake[0].x + prev.direction.x + GRID_SIZE) % GRID_SIZE,
                y: (newSnake[0].y + prev.direction.y + GRID_SIZE) % GRID_SIZE
            };

            // Check collision with self
            if (newSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
                resetGame();
                return prev;
            }

            newSnake.unshift(newHead);

            let newFood = prev.food;
            let newScore = prev.score;
            let newSpeed = prev.speed;

            // Check if food is eaten
            if (newHead.x === prev.food.x && newHead.y === prev.food.y) {
                newFood = getRandomPosition();
                newScore += 1;
                newSpeed = Math.max(50, prev.speed - 5);
            } else {
                newSnake.pop();
            }

            return {
                ...prev,
                snake: newSnake,
                food: newFood,
                score: newScore,
                speed: newSpeed
            };
        });
    };

    const drawGame = () => {
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        // Draw background
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        // Draw snake
        ctx.fillStyle = '#4ade80';
        gameState.snake.forEach((segment, index) => {
            const x = segment.x * CELL_SIZE;
            const y = segment.y * CELL_SIZE;

            // Draw snake segment with rounded corners if it's the head
            if (index === 0) {
                ctx.beginPath();
                ctx.roundRect(x, y, CELL_SIZE - 1, CELL_SIZE - 1, 5);
                ctx.fill();
            } else {
                ctx.fillRect(x, y, CELL_SIZE - 1, CELL_SIZE - 1);
            }
        });

        // Draw food
        ctx.fillStyle = '#ef4444';
        const foodX = gameState.food.x * CELL_SIZE;
        const foodY = gameState.food.y * CELL_SIZE;
        ctx.beginPath();
        ctx.arc(
            foodX + CELL_SIZE/2,
            foodY + CELL_SIZE/2,
            CELL_SIZE/2 - 1,
            0,
            Math.PI * 2
        );
        ctx.fill();
    };

    const startGame = () => {
        setGameState(prev => ({ ...prev, isRunning: true }));
    };

    const pauseGame = () => {
        setGameState(prev => ({ ...prev, isRunning: false }));
    };

    const resetGame = () => {
        setGameState({
            snake: [{ x: 5, y: 5 }],
            food: getRandomPosition(),
            direction: { x: 1, y: 0 },
            score: 0,
            isRunning: false,
            speed: 200
        });
    };

    return (
        <Dialog isOpen={isOpen} onClose={onClose} title="Snake Game">
            <div className="flex flex-col items-center gap-4 p-6">
                <h2 className="text-2xl font-bold">Score: {gameState.score}</h2>
                <canvas
                    ref={canvasRef}
                    width={CANVAS_SIZE}
                    height={CANVAS_SIZE}
                    className="border border-gray-300 rounded"
                />
                <div className="flex gap-4">
                    {!gameState.isRunning ? (
                        <Button
                            onClick={startGame}
                            className="bg-green-500 hover:bg-green-600"
                        >
                            Start
                        </Button>
                    ) : (
                        <Button
                            onClick={pauseGame}
                            className="bg-yellow-500 hover:bg-yellow-600"
                        >
                            Pause
                        </Button>
                    )}
                    <Button
                        onClick={resetGame}
                        className="bg-red-500 hover:bg-red-600"
                    >
                        Reset
                    </Button>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                    Use arrow keys to control the snake
                </p>
            </div>
        </Dialog>
    );
};

export default SnakeGameModal;