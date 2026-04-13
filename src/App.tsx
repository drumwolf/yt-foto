import './App.css'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

function App() {
  const [videoID, setVideoID] = useState('')
  const [videoData, setVideoData] = useState<any | null>(null)
  const { channelTitle, localized, publishedAt } = videoData || {}

  const changeVideoID = (e: any) => {
    setVideoID(e.target.value)
    setVideoData(null)
  }

  const fetchVideoData = async () => {
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

  const clearVideoData = () => {
    setVideoID('')
    setVideoData(null)
  }

  /*** FINAL COMPONENT ***/
  return (
    <section className="p-4 text-center">
      <h1 className="mb-2">yt-foto</h1>
      <div className="mb-5">
        <Input
          className="w-[300px] mr-1"
          value={videoID}
          onChange={changeVideoID}
        />
        <Button
          className="my-3 px-4 ml-1"
          onClick={fetchVideoData}
        >
          Fetch video data
        </Button>
        <Button
          className="my-3 px-4 ml-1"
          onClick={clearVideoData}
        >
          Clear video data
        </Button>
      </div>
      <div className="mx-auto w-[600px] h-[337px] bg-gray-200 border border-gray-400 my-2">
      {videoData && (
        <img
          className=" w-[600px] h=[337px]"
          src={`https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`}
        />
      )}
      </div>
      {videoData && (
        <>
          <p><strong>Filename:</strong>{}</p>
          <p>{`${channelTitle} (${publishedAt?.slice(0,10)}) - ${localized?.title} [${videoID}]`}</p>
        </>
      )}
    </section>
  )
}

export default App
