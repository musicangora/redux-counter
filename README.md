# Redux を使ったカウンターのチュートリアル

`$ npx create-react-app hoge --template redux`でプロジェクトを作成した際に出てくる Redux を使ったカウンターアプリを作成するチュートリアル。

まず、React の hook を使って実装し、それに Redux を導入する。さらに ReduxToolkit を導入したものと、useReducer を用いたものも比較として実装していく。

## 誰のためのチュートリアルか

- React と React 関数コンポーネントについて基本的な知識がある
- Flux や Redux の基本となる考え方がわかる
- Redux を実際に実装して試してみたい人

## お気持ち

React の勉強をしていて、Redux も勉強してみようと思ったものの、なかなか丁度いい感じの**触って試せるチュートリアル**が見つからなかった。公式にあるものは全部英語でちょっととっつきにくいし、ネット上にあるものは(公式チュートリアルも含めて)現在非推奨の書き方のままだったりする。

また、Redux が大規模なプロジェクトを想定しているためか、全部写経して流れを追うにはしんどい量のプロジェクトを題材にしたチュートリアルだったり、チュートリアルですべてのコードに触れていない(その記事だけ読んで同じものが作れるようになっていない)ものだったりが目立っていた。

自分の備忘録も兼ねて、ちょっとまとめてみることにした。

ちなみに、Redux のお話は、[Redux 入門【ダイジェスト版】10 分で理解する Redux の基礎](https://qiita.com/kitagawamac/items/49a1f03445b19cf407b7)と公式の[Redux Essentials, Part 1: Redux Overview and Concepts](https://redux.js.org/tutorials/essentials/part-1-overview-concepts)をあわせて見るとわかりやすい気がする。

あと、[Software Design(ソフトウェアデザイン)2021 年 8 月号](https://www.amazon.co.jp/dp/B098WVGCZR/)は表紙にもあるように、本当に React が怖くなくなったのでおすすめである。

## 完成図

### オリジナルの Redux カウンターアプリ

Codesandbox は[こちら](https://codesandbox.io/s/github/reduxjs/redux-essentials-counter-example/tree/master/)

<a href="https://gyazo.com/a173aeb511fbf0794c47bbf029b8f43c"><img src="https://i.gyazo.com/a173aeb511fbf0794c47bbf029b8f43c.png" alt="Image from Gyazo" width="640"/></a>

### React 版カウンターアプリ

<a href="https://gyazo.com/28b508c635970998d19dc73ff7f7b325"><img src="https://i.gyazo.com/28b508c635970998d19dc73ff7f7b325.gif" alt="Image from Gyazo" width="640"/></a>

### Redux 版カウンターアプリ

<a href="https://gyazo.com/44a5a8a84ef6c597c5ed1e97dd9a31c1"><img src="https://i.gyazo.com/44a5a8a84ef6c597c5ed1e97dd9a31c1.gif" alt="Image from Gyazo" width="640"/></a>

## ステップ 1: プロジェクトの作成

### ローカルにプロジェクトを作成する

とりあえず、`create-react-app`で React のプロジェクトを作成する。Redux の導入は後から行う。

```.zsh
$ create-react-app redux-counter(プロジェクト名)
```

プロジェクトが作られたら、以下のアプリケーションを構成する主要ファイルを確認しながら、\*の付いたものを新規に作成する。

- `/src`
  - `index.js`: アプリの出発点(変更なし)
  - `App.js`: トップレベルの React コンポーネント
  - `/features`\*
    - `/counter`\*
      - `Counter.js`\*: カウンター機能の UI を表示する React コンポーネント
      - `Counter.module.css`\*: カウンター用の CSS

## ステップ 2: Counter の作成

### Counter.js

`useState`を使って作成する。

```Counter.js
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
```

### App.js

新しく作成した Counter コンポーネントを追加する。

```diff Counter.js
import logo from './logo.svg';
import './App.css';
+ import { Counter } from './features/counter/Counter';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
+       <Counter />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```

### Counter.module.css

今回は、基となるオリジナルの Redux カウンターアプリの CSS を参考にして、CSS モジュールを使って実装している。変更箇所はカラーテーマくらいである。

```Counter.module.css
.row {
  display: flex;
  align-items: center;
  justify-content: center;
}

.row:not(:last-child) {
  margin-bottom: 16px;
}

.value {
  font-size: 78px;
  padding-left: 16px;
  padding-right: 16px;
  margin-top: 2px;
  font-family: 'Courier New', Courier, monospace;
}

.button {
  appearance: none;
  border: none;
  background: none;
  font-size: 32px;
  padding-left: 12px;
  padding-right: 12px;
  outline: none;
  border: 2px solid transparent;
  color: #61dafb;
  padding-bottom: 4px;
  cursor: pointer;
  background-color: rgba(151, 211, 228, 0.15);
  border-radius: 2px;
  transition: all 0.15s;
}

.button:hover, .button:focus {
  border: 2px solid rgba(151, 211, 228, 0.5);
}

.button:active {
  background-color: rgba(151, 211, 228, 0.3);
}

.textbox {
  font-size: 32px;
  padding: 2px;
  width: 64px;
  text-align: center;
  margin-right: 8px;
}

```

### 実行

ここまでできたら、ブラウザで確認する。上で表示した React 版カウンターアプリと同様の動きをしていれば正しく動いている。

<a href="https://gyazo.com/2683cd214fedc75b0dc1c1ed1d691c67"><img src="https://i.gyazo.com/2683cd214fedc75b0dc1c1ed1d691c67.png" alt="Image from Gyazo" width="640"/></a>

+を押すとカウンターが+1 され、-を押すとカウンターが-1 される。下のテキストボックスに数値を入れて、Add Amount を押すとその分だけカウンターが変化する。テキストボックスに文字列が入ると Add Amount を押しても値が変化しない。

## ステップ 3: Redux の導入

次に、ここまで作成したプロジェクトに Redux を導入する。オリジナル Redux カウンターアプリは、Redux を簡潔に記述できるようにした、Redux Toolkit を使用しているが、ここではそのままの Redux を使用する。

### Redux のインストール

`create-react-app`で作成したプロジェクトには Redux は含まれていないので、インストールする必要がある。redux はメインライブラリ、react-redux は React と Redux をつなぐライブラリである。

```.zsh
$ npm install redux react-redux
```

### プロジェクトの構成

以下のプロジェクト構成を参考に\*が付いているファイル/ディレクトリを新規に作成する。

- `/src`
  - `/app`
    - `reducer.js`\*: Reducer をまとめるコンポーネント
    - `store.js`\*: Store を作成する
  - `index.js`: アプリの出発点
  - `App.js`: トップレベルの React コンポーネント
  - `/features`
    - `/counter`
      - `Counter.js`: カウンター機能の UI を表示する React コンポーネント
      - `Counter.module.css`\*: カウンター用の CSS
      - `CounterSlice.js`\*: Counter の Reducer

### CounterSlice.js を追加

Counter コンポーネントの Reducer を定義する。

```CounterSlice.js
const initialState = {count: 0};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "increment":
      return {
        count: state.count + 1
      };
    case "decrement":
      return {
        count: state.count - 1
      };
    case "incrementByAmount":
      return {
        count: state.count += action.payload
      };
    default:
      return state;
  }
}

export default counterReducer;
```

### reducer.js

今回は Reducer は 1 つのため、ここに直接 CounterSlice.js の内容を書いてもいいが、後の拡張性を考えて分割しておく。

```reducer.js
import counterReducer from "../features/counter/CounterSlice";

const rootReducer = counterReducer;
export default rootReducer;
```

### store.js

`createStore()`を使って Store を作成する。

```store.js
import { createStore } from "redux";
import rootReducer from "./reducer";

const store = createStore(rootReducer);
export default store;
```

### index.js の書き換え

index.js に`Provider`を追加する。これによって Redux の Store を読み取ることができるようになる。

```diff index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
+import store from "./app/store"
+import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
+    <Provider store={store}>
      <App />
+    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

### Counter.js の書き換え

ここからが本番である。順番に書き換えていく。

#### useSelector()

まず、変更前の Counter.js の state の 1 つである`count`を`useSelector()`を使ったものに書き換える。`useSelector()`を使うことで、Redux の Store 内にある任意の state を選択して(Select して)持ってくる事ができる。これまで`useState()`を使って管理していた state を、Redux の Store 内で管理することにしている。

```diff Counter.js
import React, { useState } from "react";
+import { useDispatch, useSelector } from "react-redux";
import styles from "./Counter.module.css";

export function Counter() {
-   const [count, setCount] = useState(0);
+   const count = useSelector((state) => state.count);
   const [incrementAmount, setIncrementAmount] = useState("2");
...
```

#### useDispatch()

次に、`useDispatch()`を追加する。`useSelector()`のおかげで Redux の Store にアクセスすることはできたが、Store に Action を伝える手段がない。そこで、`useDispatch()`を用いて`dispatch`を追加する。

```diff Counter.js
...
export function Counter() {
  const count = useSelector((state) => state.count);
+  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState("2");
...
```

ここで、`<button>`の`onClick`処理を`dispatch`に変更する。`dispatch`は`dispatch(Action)`の形で Action を伝える。Action は`{type: "type", payload: data}`の形で構成されている。

```diff Counter.js
...
return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
-          onClick={increment}
+          onClick={() => dispatch({type: "increment"})}
        >+
        </button>

        <span className={styles.value}>{count}</span>

        <button
          className={styles.button}
-          onClick={decrement}
+          onClick={() => dispatch({type: "decrement"})}
        >-
        </button>
      </div>

      <div className={styles.row}>
        <input className={styles.textbox} value={incrementAmount} onChange={handleChange} />
        <button
          className={styles.button}
-          onClick={incrementByAmount}
+          onClick={() => dispatch({type: "incrementByAmount", payload: (Number(incrementAmount) || 0)})}
        >Add Amount
        </button>
      </div>
    </div>
  );
  ...
```

上で`type`で渡されている Action のタイプは、`CounterSlice.js`で定義されている。この内容はもともと、`Counter.js`で`useState()`の`setCount()`で定義されていたものである。

```CounterSlice.js
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "increment":
      return {
        count: state.count + 1
      };
    case "decrement":
      return {
        count: state.count - 1
      };
    case "incrementByAmount":
      return {
        count: state.count += action.payload
      };
    default:
      return state;
  }
}
```

```diff Counter.js
...
export function Counter() {
-   const [count, setCount] = useState(0);

-   const increment = () => {
-     setCount(count+1);
-   }

-   const decrement = () => {
-     setCount(count-1);
-   }

-   const incrementByAmount = () => {
-     setCount(count+(Number(incrementAmount) || 0));
-   }
...
```

上記の変更をすべて行った`Counter.js`を下に示す。

```Counter.js
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
```

### CSS の書き換え(任意)

React 版のままの UI でもいいが、せっかくなので見た目もオリジナルに近づける。

```diff Counter.module.css
...

.button {
  appearance: none;
  border: none;
  background: none;
  font-size: 32px;
  padding-left: 12px;
  padding-right: 12px;
  outline: none;
  border: 2px solid transparent;
+  color: rgb(112, 76, 182);
  padding-bottom: 4px;
  cursor: pointer;
+  background-color: rgba(112, 76, 182, 0.1);
  border-radius: 2px;
  transition: all 0.15s;
}

.button:hover, .button:focus {
+  border: 2px solid rgba(112, 76, 182, 0.4);
}

.button:active {
+  background-color: rgba(112, 76, 182, 0.2);
}

...
```

ロゴの SVG も変更する。

```logo.svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g fill="#764ABC"><path d="M65.6 65.4c2.9-.3 5.1-2.8 5-5.8-.1-3-2.6-5.4-5.6-5.4h-.2c-3.1.1-5.5 2.7-5.4 5.8.1 1.5.7 2.8 1.6 3.7-3.4 6.7-8.6 11.6-16.4 15.7-5.3 2.8-10.8 3.8-16.3 3.1-4.5-.6-8-2.6-10.2-5.9-3.2-4.9-3.5-10.2-.8-15.5 1.9-3.8 4.9-6.6 6.8-8-.4-1.3-1-3.5-1.3-5.1-14.5 10.5-13 24.7-8.6 31.4 3.3 5 10 8.1 17.4 8.1 2 0 4-.2 6-.7 12.8-2.5 22.5-10.1 28-21.4z"/><path d="M83.2 53c-7.6-8.9-18.8-13.8-31.6-13.8H50c-.9-1.8-2.8-3-4.9-3h-.2c-3.1.1-5.5 2.7-5.4 5.8.1 3 2.6 5.4 5.6 5.4h.2c2.2-.1 4.1-1.5 4.9-3.4H52c7.6 0 14.8 2.2 21.3 6.5 5 3.3 8.6 7.6 10.6 12.8 1.7 4.2 1.6 8.3-.2 11.8-2.8 5.3-7.5 8.2-13.7 8.2-4 0-7.8-1.2-9.8-2.1-1.1 1-3.1 2.6-4.5 3.6 4.3 2 8.7 3.1 12.9 3.1 9.6 0 16.7-5.3 19.4-10.6 2.9-5.8 2.7-15.8-4.8-24.3z"/><path d="M32.4 67.1c.1 3 2.6 5.4 5.6 5.4h.2c3.1-.1 5.5-2.7 5.4-5.8-.1-3-2.6-5.4-5.6-5.4h-.2c-.2 0-.5 0-.7.1-4.1-6.8-5.8-14.2-5.2-22.2.4-6 2.4-11.2 5.9-15.5 2.9-3.7 8.5-5.5 12.3-5.6 10.6-.2 15.1 13 15.4 18.3 1.3.3 3.5 1 5 1.5-1.2-16.2-11.2-24.6-20.8-24.6-9 0-17.3 6.5-20.6 16.1-4.6 12.8-1.6 25.1 4 34.8-.5.7-.8 1.8-.7 2.9z"/></g></svg>
```

背景色とリンクの色も変更する。

```diff App.css
...
.App-header {
- background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
- color: white;
}

.App-link {
+  color: rgb(112, 76, 182);
}
...
```

### 実行

ここまでの変更を行うと、React 版と同様の動きをする Redux 版のカウンターアプリが完成する。

## ステップ 4: ReduxToolkit

ここでは、Redux 版のカウンターアプリをベースにして ReduxToolkit を導入したものに書き換える。前述の通り、ReduxToolkit を導入することで簡潔に Redux を使うことができる。

### Redux Toolkit のインストール
まずは、Redux Toolkitを導入する。本来であれば一緒にreact-reduxもインストールするが、ステップ3でインストールしているため、Redux Toolkitのみインストールする。

```.zsh
$ npm install @reduxjs/toolkit
```

※react-reduxをインストールしていない場合
```.zsh
$ npm install @reduxjs/toolkit react-redux
```

### CounterSlice.js の書き換え
まず、`CounterSlice.js`を書き換える。SliceはReducer/Action/Stateをひとまとめにしたようなもので、`createAction`と`createReducer`をまとめて記述できるようになっている。このSliceを作るための`createSlice`を

``` CounterSlice.js
import { createSlice } from "@reduxjs/toolkit"
```

でインポートする。

ここで、変更前の`CounterSlice.js`を見てみると、

``` CounterSlice.js
const initialState = {count: 0};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "increment":
      return {
        count: state.count + 1
      };
    case "decrement":
      return {
        count: state.count - 1
      };
    case "incrementByAmount":
      return {
        count: state.count += action.payload
      };
    default:
      return state;
  }
}

export default counterReducer;
```

これを`createSlice`を使ったものに書き換えると、

``` CounterSlice.js
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

export default counterSlice.reducer;
```

このように`createSlice`を使うことで、Action/Reducer/Stateを簡潔にまとめて記述することができる。

### store.js の書き換え
次に、`store.js`を`configureStore`を使ったものに書き換える。これは`createStore`の代わりである。

`createStore`を使ったもともとの`store.js`は、

``` store.js
import { createStore } from "redux";
import rootReducer from "./reducer";

export default createStore(rootReducer);
```

これを、`configureStore`を使って以下のように書き換える。

``` store.js
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";

export default configureStore({
  reducer: {
    counter: rootReducer,
  },
});
```

### Counter.js の書き換え
最後に、`Counter.js`を`CounterSlice`で定義したActionを使ったものに書き換えていく。まず、`CounterSlice.js`からexportしたActionをimportする。

``` diff CounterSlice.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Counter.module.css";
+import { decrement, increment, incrementByAmount } from "./CounterSlice";
```

次に、`useSelector()`でStoreからstateを選択して読み込む。

``` diff CounterSlice.js
...
export function Counter() {
  const dispatch = useDispatch();
-  const count = useSelector((state) => state.count);
+  const count = useSelector((state) => state.counter.count);
  const [incrementAmount, setIncrementAmount] = useState("2");
...
```

ここの`state.counter.count`は、`store.js`でStoreを定義した際に、Reducerに`counter`という名前をつけているため必要になってくる。

``` store.js
export default configureStore({
  reducer: {
    counter: rootReducer,
  },
});
```

ちなみに、`counter`という名前を`CounterSlice.js`内のnameプロパティでも使用しているが、こちらはAction Typeのプレフィックスとして使われている。

``` diff CounterSlice.js
...
const counterSlice = createSlice({
-  name: "counter",
+  name: "action-type-prefix-counter",  // Sliceの名前、Action Typeのプレフィックス
  initialState: initialState,
  reducers: {  // Reducerの定義
    increment: (state) => {
      state.count += 1
    },
...
```

<a href="https://gyazo.com/50669a668d1fd87c939a16eb2d663759"><img src="https://i.gyazo.com/50669a668d1fd87c939a16eb2d663759.png" alt="Image from Gyazo" width="640"/></a>

最後に、`OnClick`の処理を`CounterSlice.js`でエクスポートしたActionに変更する。`incrementByAmount()`は、データを受け取るので引数として与えてあげる。

``` diff Counter.js
...
return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
-          onClick={() => dispatch({type: "increment"})}
+          onClick={() => dispatch(increment())}
        >+
        </button>

        <span className={styles.value}>{count}</span>

        <button
          className={styles.button}
-          onClick={() => dispatch({type: "decrement"})}
+          onClick={() => dispatch(decrement())}
        >-
        </button>
      </div>

      <div className={styles.row}>
        <input className={styles.textbox} value={incrementAmount} onChange={handleChange} />
        <button
          className={styles.button}
-          onClick={() => dispatch({type: "incrementByAmount", payload: (Number(incrementAmount) || 0)})}
+          onClick={() => dispatch(incrementByAmount((Number(incrementAmount) || 0)))}
        >Add Amount
        </button>
      </div>
    </div>
  );
  ...
```

ActionをSliceで定義してあるため、かなり簡潔に、そして直感的に記述できることが分かる。

最後に、ここまでのすべての変更を行った`Counter.js`を下に示す。

``` Counter.js
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
```

### まとめ
以上の変更を加えることで、Redux版と同様の動作をするはずである。Redux Toolkitを使った方が、確かに簡潔で直感的に記述できるように感じた。

### 参考

- [いま Redux を導入するなら Redux Toolkit を使うべき](https://qiita.com/NeGI1009/items/d553bdb361e755d5986c)
- [Redux Toolkit Quick Start](https://redux-toolkit.js.org/tutorials/quick-start)

## (おまけ)ステップ 5: useReducer との比較

ここでは、ステップ 2 の React 版のカウンターアプリをベースにして、useReducer を使ったものに書き換える。useReducer は React の hook の 1 つで、Redux を導入しなくても Reducer 関数を使うことができる。

Redux は状態をグローバルで管理するが、useReducer は状態の管理をコンポーネント単位のローカル内で完結させている。大規模なプロジェクトでは Redux を、小規模なプロジェクトでは useState や useReducer、(ここでは紹介しないが)Context API を使うことが多いという。

### store.js, reducer.js

### CounterSlice.js


### Counter.js


### Redux版との違い
useReducerでは、stateをコンポーネント単位のローカル内で完結させているため、Storeが存在しない。そのため、useStateとReduxを組み合わせたような感じで記述できると感じた。

## 参考

- [Redux Essentials, Part 2: Redux App Structure](https://redux.js.org/tutorials/essentials/part-2-app-structure)
- [Redux 公式チュートリアルの Codesandbox](https://codesandbox.io/s/github/reduxjs/redux-essentials-counter-example/tree/master/)
- [Redux Fundamentals, Part 5: UI and React](https://redux.js.org/tutorials/fundamentals/part-5-ui-react)
- [Software Design(ソフトウェアデザイン)2021 年 8 月号](https://www.amazon.co.jp/dp/B098WVGCZR/)
