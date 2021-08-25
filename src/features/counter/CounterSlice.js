import { createSlice } from "@reduxjs/toolkit";

const initialState = {count: 0};

const counterSlice = createSlice({
  name: "counter",  // Sliceの名前、Action Typeのプレフィックス
  initialState: initialState,  // stateの初期値
  reducers: {  // Reducerの定義
    increment: (state) => {  // counter/incrementというAction Creatorが自動的に生成される
      state.count += 1
    },
    decrement: (state) => {
      state.count -= 1
    },
    incrementByAmount: (state, action) => {
      state.count += action.payload
    },
  },
});

export const {increment, decrement, incrementByAmount} = counterSlice.actions;

export default counterSlice;