import React from 'react';

interface SliderProps {
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
}

const Slider: React.FC<SliderProps> = ({ onChange, min = 1, max = 100, step = 1 }) => {
    return (
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full cursor-pointer"
        />
    );
};

export default Slider;
