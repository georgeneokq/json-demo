/**
 * ------------------- JSONの使用に直接関連がある単語 -----------------------
 * Curly braces {} 波括弧
 * Quotation mark ' クォーテーションマーク
 * Double quotation mark " ダブルクォーテーションマーク
 * Request リクエスト 閲覧者 (クライアント) がウェブサーバに情報を求めること。
 * Response レスポンス ウェブサーバがリクエストに応答。普段は情報が含まれる
 * ------------------------------------------------------------------------
 * 
 * ------------------ プログラミングに関連がある単語 ------------------------
 * Library ライブラリ よく利用される機能を切り出して、再利用し安いようまとめたもの。ある時はPackage(パッケージ)か、module(モジュール)ともいう
 * Variable 変数 扱うデータを読み書きする記憶域のこと。いわばデータを保存する箱。値の再利用が必要な時に便利。
 * -----------------------------------------------------------------------
 * 
 * ------------------ ウェブサーバに関連がある単語 --------------------------
 * IP Address IPアドレス 機械のアドレス(住所)。基本的に知らないと機械(他人のパソコン、会社のウェブサーバ等)とのやりとりはできない。例: 192.168.0.1
 * Port ポート IPアドレスの上に更にポートっていう番号を入れて、「住所」として機能する。最大数値は65535。IPアドレス+ポートの例: 192.168.0.1:22
 * Domain ドメイン IPアドレスに似たような機能でアドレスのことだけど、番号だけで構成されることではなく、ちゃんと読める名前をつけれる。例: google.com
 *                基本的にリクエストを指定したIPアドレスへ転送することに用いる。例: google.com -> 172.253.122.100
 * Path パス ファイルやフォルダがおいてある場所。
 * Relative path 相対パス 今いる階層を基準としたときのファイルの場所。例: Web-Server\index.html
 * Absolute path 絶対パス ファイルを最初のフォルダから最後のフォルダまで完全に記述する形式。例: C:\Users\Computer\Web-Server\index.html
 */

// express(ウェブサーバ)ライブラリをインポート
const express = require('express')
const { readFile, writeFile } = require('fs/promises')

// pathライブラリのjoin関数のみインポート
const { join } = require('path')


// 現フォルダを基準にした相対パスを絶対パスに変える
function absolutePath(relativePath) {
  return join(__dirname, relativePath)
}


// expressのウェブサーバ
const app = express()


// ウェブサーバのポート
const port = 5000


// 受けるデータはすべてJSONとして扱う
app.use(express.json())


// Webルート。ウェブページのリクエストへのレスポンス
app.get('/', (req, res) => {
  // このフォルダにあるindex.htmlのファイルを転送
  res.sendFile(absolutePath('index.html'))
})


// APIルート。情報のリクエストへのレスポンス
const api = express.Router()
app.use('/api', api)

// GETリクエスト: クライアントが /api/weather/ishikawa のURLからデータ取得のリクエストを送る時
api.get('/weather/ishikawa', async (req, res) => {
  // データを読み込む。データの主の取得方法:
  // 1. 自分のデータベースから
  // 2. 別のサービスから。例えば気象情報を提供する会社のサービス
  // 3. ファイルから

  // ファイルからデータを読み込み、JSON.parseメソッド(関数)で文字列をJSONとして分析し、Javascriptのオブジェクトを構築する
  const jsonData = JSON.parse(await readFile('ishikawa.json', 'utf-8'))

  // 情報をクライアントに転送する
  res.json(jsonData)
})


// POSTリクエスト: クライアントが /api/weather/ishikawa のURLに情報を送る時
api.post('/weather/ishikawa', async(req, res) => {
  const dataFile = 'ishikawa.json'

  // クライアントが送信したデータを取得
  const data = req.body

  // 既存データを読み込んで
  const jsonData = JSON.parse(await readFile(dataFile))
  
  // クライアントからのデータを追加して
  jsonData.rainAreas.push(data)

  // ファイルに上書き保存する
  await writeFile(dataFile, JSON.stringify(jsonData, null, 2))
  
  // OKのレスポンスを送信する
  res.status(200).end()
})


// Listen とは聞くっていう意味だけど、この場合は外部からのアクセスに備えて待機することを指す
app.listen(port, () => {
  console.log(`ポート${port}でウェブサーバ待機中`)
})