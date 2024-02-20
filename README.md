# JSONの使い方

クライアント(端末)とウェブサーバの間にいかにJSON形式を用いて情報交換をするか紹介します。

## 使い方

1. [Nodejsをインストール](https://nodejs.org/en/download)
2. ターミナル(cmd, powershell等)でこのフォルダに移動する
3. `npm install`のコマンドをターミナル実行して、必要のライブラリをインストールする
4. `node index.js`のコマンドをターミナルに実行して、ウェブサーバを起動する
5. ブラウザー (Edge, Google Chrome等)を開いて、`localhost:5000`のURLに移動

**或いは**

1. [https://replit.com/](https://replit.com/)でメンバー登録する
2. ログインしたら、"+ Create Repl"のメニューオプションをクリック
3. TemplateはNode.jsを選択する。タイトルは適当でいい
4. "+ Create Repl"ボタンをクリックする
5. 左側にある縦の...のボタンを押して、"Upload File"を選択して、`index.html`, `index.js`, `ishikawa.json`の３つのファイルを選択してアップロードする
6. "Overwrite file?"のポップアップが現れたら、"Yes"を選択
7. 一番上の緑ボタン"Run"を押して、しばらくしたらウェブサーバが起動する

## 概要

`index.html`はウェブページのデザインや機能が入っているファイル。

`index.js`はJavascriptのファイルで、Nodejsというソフトウェアでこのファイルのコマンドを実行して、ウェブサーバを起動する。

`ishikawa.json`は疑似気象データが入っており、情報源として使われる。

上記のファイルのコードとコメントを参考しながら、勉強しよう！