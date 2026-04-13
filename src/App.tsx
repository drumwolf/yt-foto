import './App.css'

import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

function App() {
  /*** LOCAL STATE ***/
  const [videoUrl, setVideoUrl] = useState<string>('')
  const [videoId, setVideoId] = useState<string>('')
  const [videoData, setVideoData] = useState<any | null>(null)

  // local data derived from state
  const { channelTitle, localized, publishedAt } = videoData || {}
  const fullTitle = `${channelTitle} (${publishedAt?.slice(0,10)}) - ${localized?.title} [${videoId}]`

  /*** CALLBACKS ***/

  const changeVideoUrl = (e: any) => {
    setVideoUrl(e.target.value)
    setVideoData(null)
  }

  const parseVideoId = (url: string) => {
    const parts = url?.split('?')[1]?.split('&') || []
    const videoId = parts.find((part: string) => part?.slice(0,2) === 'v=').slice(2)
    return videoId
  }

  const fetchVideoData = async () => {
    const videoId = parseVideoId(videoUrl)
    setVideoId(videoId)
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${apiKey}`
    )
    const data = await res.json()
    const item = data.items?.[0]
    if (item) {
      setVideoData(item.snippet)
    }
  }

  const clearVideoData = () => {
    setVideoUrl('')
    setVideoData(null)
  }

  /*** FINAL COMPONENT ***/
  return (
    <section className="p-4 text-center">
      <h1 className="mb-2">yt-foto</h1>
      <div className="mb-5">
        <Input
          className="w-[300px] mr-1"
          value={videoUrl}
          onChange={changeVideoUrl}
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
          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        />
      )}
      </div>
      {videoData && (
        <>
          <p><strong>Filename:</strong>{}</p>
          <div>
            <code className="bg-gray-200 py-1 px-2 rounded-sm text-[13px]">
              {fullTitle}
            </code>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigator.clipboard.writeText(fullTitle)}
            >
              <Copy />
            </Button>
          </div>
        </>
      )}
    </section>
  )
}

export default App
