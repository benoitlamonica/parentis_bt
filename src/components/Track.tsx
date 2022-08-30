import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'

export default function Track({url}: {url: string}) {
  const [track, setTrack] = React.useState('')

  useEffect(() => {
    axios.get('https://open.spotify.com/oembed?' + new URLSearchParams({
      url
    })).then(({data}) => setTrack(data.html))
  })
  return (
    <div dangerouslySetInnerHTML={{__html: track}} />
  )
}