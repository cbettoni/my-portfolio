'use client';

import React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import Dialog from './Dialog';
import Button from '@/components/button';

interface Position {
    x: number;
    y: number;
}

interface GameState {
    snake: Position[];
    food: Position;
    direction: Position;
    score: number;
    isRunning: boolean;
    speed: number;
}

interface SnakeGameModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SnakeGameModal: React.FC<SnakeGameModalProps> = ({ isOpen, onClose }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

    const GRID_SIZE = 20;
    const CANVAS_SIZE = 300;
    const CELL_SIZE = CANVAS_SIZE / GRID_SIZE;

    const [gameState, setGameState] = useState<GameState>({
        snake: [{ x: 5, y: 5 }],
        food: { x: 10, y: 10 },
        direction: { x: 1, y: 0 },
        score: 0,
        isRunning: false,
        speed: 200,
    });

    const getRandomPosition = useCallback((): Position => ({
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
    }), []);

    const resetGame = useCallback(() => {
        setGameState({
            snake: [{ x: 5, y: 5 }],
            food: getRandomPosition(),
            direction: { x: 1, y: 0 },
            score: 0,
            isRunning: false,
            speed: 200,
        });
    }, [getRandomPosition]);

    const handleKeyPress = useCallback((event: KeyboardEvent) => {
        event.preventDefault();
        setGameState((prev) => {
            const newDirection = { ...prev.direction };
            switch (event.key) {
                case 'ArrowUp':
                    if (prev.direction.y !== 1) {
                        newDirection.x = 0;
                        newDirection.y = -1;
                    }
                    break;
                case 'ArrowDown':
                    if (prev.direction.y !== -1) {
                        newDirection.x = 0;
                        newDirection.y = 1;
                    }
                    break;
                case 'ArrowLeft':
                    if (prev.direction.x !== 1) {
                        newDirection.x = -1;
                        newDirection.y = 0;
                    }
                    break;
                case 'ArrowRight':
                    if (prev.direction.x !== -1) {
                        newDirection.x = 1;
                        newDirection.y = 0;
                    }
                    break;
            }
            return { ...prev, direction: newDirection };
        });
    }, []);

    const updateGame = useCallback(() => {
        setGameState((prev) => {
            const newSnake = [...prev.snake];
            const newHead = {
                x: (newSnake[0].x + prev.direction.x + GRID_SIZE) % GRID_SIZE,
                y: (newSnake[0].y + prev.direction.y + GRID_SIZE) % GRID_SIZE,
            };

            if (newSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
                resetGame();
                return prev;
            }

            newSnake.unshift(newHead);
            let newFood = prev.food;
            let newScore = prev.score;
            let newSpeed = prev.speed;

            if (newHead.x === prev.food.x && newHead.y === prev.food.y) {
                newFood = getRandomPosition();
                newScore += 1;
                newSpeed = Math.max(50, prev.speed - 5);
            } else {
                newSnake.pop();
            }

            return { ...prev, snake: newSnake, food: newFood, score: newScore, speed: newSpeed };
        });
    }, [getRandomPosition, resetGame]);

    const drawGame = useCallback(() => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        ctx.fillStyle = '#4ade80';
        gameState.snake.forEach((segment, index) => {
            const x = segment.x * CELL_SIZE;
            const y = segment.y * CELL_SIZE;

            ctx.beginPath();
            if (index === 0) {
                ctx.arc(x + CELL_SIZE / 2, y + CELL_SIZE / 2, CELL_SIZE / 2, 0, Math.PI * 2);
            } else {
                ctx.fillRect(x, y, CELL_SIZE - 1, CELL_SIZE - 1);
            }
            ctx.fill();
        });

        ctx.fillStyle = '#ef4444';
        const foodX = gameState.food.x * CELL_SIZE;
        const foodY = gameState.food.y * CELL_SIZE;
        ctx.beginPath();
        ctx.arc(foodX + CELL_SIZE / 2, foodY + CELL_SIZE / 2, CELL_SIZE / 2 - 1, 0, Math.PI * 2);
        ctx.fill();
    }, [gameState.snake, gameState.food]);

    useEffect(() => {
        if (gameState.isRunning) {
            gameLoopRef.current = setInterval(updateGame, gameState.speed);
            window.addEventListener('keydown', handleKeyPress);
        } else {
            if (gameLoopRef.current) clearInterval(gameLoopRef.current);
            window.removeEventListener('keydown', handleKeyPress);
        }

        return () => {
            if (gameLoopRef.current) clearInterval(gameLoopRef.current);
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [gameState.isRunning, gameState.speed, updateGame, handleKeyPress]);

    useEffect(() => {
        if (canvasRef.current) {
            drawGame();
        }
    }, [drawGame]);

    const startGame = () => setGameState((prev) => ({ ...prev, isRunning: true }));
    const pauseGame = () => setGameState((prev) => ({ ...prev, isRunning: false }));

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
                        <Button onClick={startGame} className="bg-green-500 hover:bg-green-600">
                            Start
                        </Button>
                    ) : (
                        <Button onClick={pauseGame} className="bg-yellow-500 hover:bg-yellow-600">
                            Pause
                        </Button>
                    )}
                    <Button onClick={resetGame} className="bg-red-500 hover:bg-red-600">
                        Reset
                    </Button>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                    Utilisez les flèches directionnelles de votre clavier
                </p>
            </div>
        </Dialog>
    );
};

export default SnakeGameModal;