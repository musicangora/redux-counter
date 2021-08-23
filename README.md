# Redux を使ったカウンターのチュートリアル

`$ npx create-react-app hoge --template redux`でプロジェクトを作成した際に出てくる Redux を使ったカウンターアプリを作成するチュートリアル。

まず、React の hook を使って実装し、それに Redux を導入する。さらに useReducer を用いたものも比較として実装していく。

## 誰のためのチュートリアルか

- React と React 関数コンポーネントについて基本的な知識がある
- Flux や Redux の基本となる考え方がわかる
- Redux を実際に実装して試してみたい人

## お気持ち

React の勉強をしていて、Redux も勉強してみようと思ったものの、なかなか丁度いい感じの**触って試せる**チュートリアルが見つからなかった。公式にあるものは全部英語でちょっととっつきにくいし、ネット上にあるものは(公式チュートリアルも含めて)現在非推奨の書き方のままだったりする。

また、Redux が大規模なプロジェクトを想定しているためか、全部写経して流れを追うにはしんどい量のプロジェクトを題材にしたチュートリアルだったり、チュートリアルですべてのコードに触れていない(その記事だけ読んで同じものが作れるようになっていない)ものだったりが目立っていた。

自分の備忘録も兼ねて、ちょっとまとめてみることにした。

ちなみに、Redux のお話は、[Redux 入門【ダイジェスト版】10 分で理解する Redux の基礎](https://qiita.com/kitagawamac/items/49a1f03445b19cf407b7)と公式の[Redux Essentials, Part 1: Redux Overview and Concepts](https://redux.js.org/tutorials/essentials/part-1-overview-concepts)をあわせて見るとわかりやすい気がする。

あと、[Software Design(ソフトウェアデザイン)2021年8月号](https://www.amazon.co.jp/dp/B098WVGCZR/)は表紙にもあるように、本当にReactが怖くなくなったのでおすすめである。

## 完成図

### オリジナルの Redux カウンターアプリ

<a href="https://gyazo.com/a173aeb511fbf0794c47bbf029b8f43c"><img src="https://i.gyazo.com/a173aeb511fbf0794c47bbf029b8f43c.png" alt="Image from Gyazo" width="640"/></a>

### React 版カウンターアプリ

<a href="https://gyazo.com/28b508c635970998d19dc73ff7f7b325"><img src="https://i.gyazo.com/28b508c635970998d19dc73ff7f7b325.gif" alt="Image from Gyazo" width="640"/></a>

### Redux 版カウンターアプリ

作成中...

## ステップ 1: プロジェクトの作成

### CSS について

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

## ステップ 2: Counter の作成

## ステップ 3: Redux の導入

## ステップ 4: useReducer との比較

## 参考

- [Redux Essentials, Part 2: Redux App Structure](https://redux.js.org/tutorials/essentials/part-2-app-structure)
- [Redux 公式チュートリアルの Codesandbox](https://codesandbox.io/s/github/reduxjs/redux-essentials-counter-example/tree/master/)
