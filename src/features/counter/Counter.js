import React, { useState } from "react";
import styles from "./Counter.module.css";

export function Counter() {
   const [count, setCount] = useState(0);
  
   const increment = () => {
     setCount(count+1);
   }

   const decrement = () => {
     setCount(count-1);
   }

  return (
    <div>
      <div className={styles.row}>
        <button className={styles.button} onClick={increment}>+</button>
        <span className={styles.value}>{count}</span>
        <button className={styles.button} onClick={decrement}>-</button>
      </div>
    </div>
  );
}