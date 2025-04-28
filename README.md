# 地域情報ダッシュボード

地域の最新情報を集約して表示するダッシュボードアプリケーションです。RSSフィードから情報を取得し、見やすい形式で表示します。

## 機能

- 複数のRSSフィードからの情報取得
- リアルタイムな情報更新（5分ごと）
- モダンでレスポンシブなUI
- 情報のソース別表示

## セットアップ方法

### バックエンド（Python/FastAPI）

1. Pythonの依存関係をインストール：
```bash
pip install -r requirements.txt
```

2. バックエンドサーバーを起動：
```bash
python main.py
```
サーバーは http://localhost:8000 で起動します。

### フロントエンド（React）

1. フロントエンドディレクトリに移動：
```bash
cd frontend
```

2. 依存関係をインストール：
```bash
npm install
```

3. 開発サーバーを起動：
```bash
npm start
```
フロントエンドは http://localhost:3000 で起動します。

## RSSフィードの追加方法

`main.py`の`RSS_FEEDS`リストに新しいフィードを追加できます：

```python
RSS_FEEDS = [
    {
        "name": "フィード名",
        "url": "フィードのURL"
    }
]
```

## 技術スタック

- バックエンド：Python/FastAPI
- フロントエンド：React/Chakra UI
- その他：feedparser（RSSパーサー）

## 注意事項

- RSSフィードのURLが有効であることを確認してください
- 大量のRSSフィードを追加する場合は、更新間隔を調整することをお勧めします 