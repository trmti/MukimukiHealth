# 使い方

## サーバー起動

```
$ firebase emulators:start --import=./data
$ yarn dev
```

# 使用技術

## フロントエンド

- Next.js
- typeScript

## バックエンド

- firebase(予定)

# Git の使い方

## 初期設定

コピペでおけ

```
$ git clone https://github.com/trmti/MukimukiHealth.git
$ yarn
```

## ブランチの作成

```
$ git branch ブランチ名
```

## ブランチの移動

```
$ git checkout ブランチ名
```

## プログラムを書き始める流れ

まずは github にあがっている変更を反映。

```
$ git pull
```

次に、コードを書いたら変更を github に反映。

```
$ git add -A
$ git commit -m "コメントを入力"
$ git push
```
