import './App.css'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

function App() {
  const [videoID, setVideoID] = useState('')

  return (
    <section className="p-4 text-center">
      <h1 className="mb-2">yt-foto</h1>
      <div>
        <Input
          className="w-[300px]"
          onChange={(e: any) => setVideoID(e.target.value)}
        />
        <Button
          className="my-3 px-4 ml-2"
          onClick={() => console.log(videoID)}
        >
          Submit YouTube URL
        </Button>
      </div>
    </section>
  )
}

export default App
