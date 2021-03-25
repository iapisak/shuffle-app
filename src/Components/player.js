import React from 'react'
import SpotifyWebPlayer from 'react-spotify-web-playback'

export default function Player ({ accessToken }) {
    if (!accessToken) return null
    
    return <SpotifyWebPlayer 
        token={accessToken}
        uris={[]}

        styles={{
            activeColor: '#fff',
            bgColor: '#333',
            color: '#fff',
            loaderColor: '#fff',
            sliderColor: '#1cb954',
            trackArtistColor: '#ccc',
            trackNameColor: '#fff',
            }}
        />
}