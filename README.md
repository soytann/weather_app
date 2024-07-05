# Weather Forecast Application

## 概要
初期起動時に、現在地の天気情報が表示され、検索または地域を選択すると、その地域の天気情報を表示します。天気情報はn8nを使用して天気情報の取得とデータベースへの保存を行っています。プリセット（Tokyo,New York,London,Paris）の地域は日付を超えると天気情報を自動でupdateし、その日の天気情報はデータベースから取得します。

## デプロイURL
(https://weather-app-zeta-roan.vercel.app/)

## 技術スタック
- フロントエンド: React, Material-UI
- バックエンド: Supabase
- データベース: Supabase (PostgreSQL)
- ワークフローオートメーション: n8n
（https://github.com/soytann/wheather_app/blob/main/My_workflow.json）

<img width="931" alt="SS 31" src="https://github.com/soytann/wheather_app/assets/148407454/c8cd04e6-d1ba-49de-8e71-238d58956881">


## 難しかったこと
- ワークフローの自動化ができるということでn8nを使用したが、最初は設定方法に戸惑った。
  慣れてくると、直感的に設定でき、様々なツールやノードがあるので、活用次第で可能性が広がると感じた。
- 初めてCORSエラーが出て、その理解と対処に時間がかかった。
- レンダリングのタイミングについて。

## 実現できなかったこと
- sunset,sunrise時間のタイムゾーン設定
- 検索した場所のお気に入り設定、より詳細な情報、アクティビティ指数などの旅行に行く人のための機能の実装
- n8n　DockerContainerの永続化
- OpenWeatherMapの日本語設定。日本語でも検索できるが、時々検索できない地名もあったため、英語仕様にした。

  

## データベース
![QuickDBD-export](https://github.com/soytann/wheather_app/assets/148407454/d30d43d7-9137-4b5c-a60d-a11097fb0476)
