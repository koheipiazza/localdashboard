from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import feedparser
from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel
import asyncio

app = FastAPI()

# CORS設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class FeedItem(BaseModel):
    title: str
    link: str
    description: Optional[str]
    published_date: Optional[str]
    source: str

# サンプルのRSSフィード（後で設定ファイルに移動することをお勧めします）
RSS_FEEDS = [
    {
        "name": "広島県",
        "url": "https://www.pref.hiroshima.lg.jp/feed/index.xml"
    },
    # 他のRSSフィードをここに追加できます
]

@app.get("/api/feeds", response_model=List[FeedItem])
async def get_feeds():
    all_items = []
    
    for feed_source in RSS_FEEDS:
        try:
            feed = feedparser.parse(feed_source["url"])
            
            for entry in feed.entries:
                item = FeedItem(
                    title=entry.title,
                    link=entry.link,
                    description=entry.get("description", ""),
                    published_date=entry.get("published", ""),
                    source=feed_source["name"]
                )
                all_items.append(item)
        except Exception as e:
            print(f"Error fetching feed {feed_source['name']}: {str(e)}")
    
    # 日付でソート（新しい順）
    all_items.sort(key=lambda x: x.published_date or "", reverse=True)
    
    return all_items

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 