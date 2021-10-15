import { buildQueries } from "@testing-library/react";
import React, { useState } from "react";

const Counter = () => {
    const [number, setNumber] = useState(0);
    const decrease = () => {
        setNumber(number - 1);
    }

     
    return (
        <div>
            <p>{ number }</p>
            <button onClick={() => setNumber(number + 1)}> Increase button </button>
            <button onClick={decrease}> Decrease button </button>

        </div>
    );
}

export default Counter;