import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Counter.module.css";
import { decrement, increment, incrementByAmount } from "./CounterSlice";

export function Counter() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.count);
  const [incrementAmount, setIncrementAmount] = useState("2");

  const handleChange = (e) => {
    setIncrementAmount(e.target.value);
  }

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          onClick={() => dispatch(increment())}
        >+
        </button>
        
        <span className={styles.value}>{count}</span>
        
        <button
          className={styles.button}
          onClick={() => dispatch(decrement())}
        >-
        </button>
      </div>

      <div className={styles.row}>
        <input
          className={styles.textbox}
          value={incrementAmount}
          onChange={handleChange} />
        <button
          className={styles.button}
          onClick={() => dispatch(incrementByAmount((Number(incrementAmount) || 0)))}
        >
          Add Amount
        </button>
      </div>
    </div>
  );
}