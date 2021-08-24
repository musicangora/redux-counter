import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Counter.module.css";

export function Counter() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count);
  const [incrementAmount, setIncrementAmount] = useState("2");

  const handleChange = (e) => {
    setIncrementAmount(e.target.value);
  }

  return (
    <div>
      <div className={styles.row}>
        <button className={styles.button} onClick={() => dispatch({type: "increment"})}>+</button>
        <span className={styles.value}>{count}</span>
        <button className={styles.button} onClick={() => dispatch({type: "decrement"})}>-</button>
      </div>

      <div className={styles.row}>
        <input className={styles.textbox} value={incrementAmount} onChange={handleChange} />
        <button className={styles.button} onClick={() => dispatch({type: "incrementByAmount", payload: (Number(incrementAmount) || 0)})}>
          Add Amount
        </button>
      </div>
    </div>
  );
}