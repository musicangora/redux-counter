import React, { useState } from "react";
import styles from "./Counter.module.css";

export function Counter() {
   const [count, setCount] = useState(0);
   const [incrementAmount, setIncrementAmount] = useState("2");
  
   const increment = () => {
     setCount(count+1);
   }

   const decrement = () => {
     setCount(count-1);
   }

   const handleChange = (e) => {
     setIncrementAmount(e.target.value);
   }

   const incrementByAmount = () => {
     // Inputにはテキストが入るかもしれない
     // Numberでキャストして、0と和集合を取ってテキスト入力時は0になるようにする
     setCount(count+(Number(incrementAmount) || 0));
   }

  return (
    <div>
      <div className={styles.row}>
        <button className={styles.button} onClick={increment}>+</button>
        <span className={styles.value}>{count}</span>
        <button className={styles.button} onClick={decrement}>-</button>
      </div>

      <div className={styles.row}>
        <input className={styles.textbox} value={incrementAmount} onChange={handleChange} />
        <button className={styles.button} onClick={incrementByAmount}>
          Add Amount
        </button>
      </div>
    </div>
  );
}