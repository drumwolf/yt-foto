import './App.css'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

function App() {
  const [videoID, setVideoID] = useState('')
  const [videoData, setVideoData] = useState<any | null>(null)

  async function fetchVideoData() {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoID}&part=snippet&key=${apiKey}`
    )
    const data = await res.json()
    const item = data.items?.[0]
    if (item) {
      setVideoData(item.snippet)
    }
  }

  return (
    <section className="p-4 text-center">
      <h1 className="mb-2">yt-foto</h1>
      <div className="mb-5">
        <Input
          className="w-[300px]"
          onChange={(e: any) => setVideoID(e.target.value)}
        />
        <Button
          className="my-3 px-4 ml-2"
          onClick={fetchVideoData}
        >
          Fetch video data
        </Button>
      </div>
      {videoID && (
        <div>
          <img
            className="mx-auto w-[600px] my-3"
            src={`https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`}
          />
          <p><strong>Filename:</strong>{}</p>
          <p>{`(${videoData?.publishedAt.slice(0,10)}) ${videoID}`}</p>
        </div>
      )}
    </section>
  )
}

export default App
