import React from "react";

const Range = ({ min, max, step, value, onChange, children }) => {
    return (
        <div>
            <div className="flex justify-between">
                <div>{children}</div>
                <div>{value}</div>
            </div>
            <input
                type="range"
                className="w-full"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={onChange}
            />
            <div className="flex justify-between">
                <div>Min: {min}</div>
                <div>Max: {max}</div>
            </div>
        </div>
    );
};

export default Range;
