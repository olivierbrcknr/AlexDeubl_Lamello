import React, {useState, useEffect} from 'react'
import NextHead from 'next/head'
import { string } from 'prop-types'

const Head = props => {

  return (
    <NextHead>
      <meta charSet="UTF-8" />
      <title>Lamello</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />


      <meta name="robots" content="noindex" />

      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600&family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500;1,600&display=swap" rel="stylesheet"></link>

      {/*
        <link rel="icon" sizes="192x192" href="/touch-icon.png" />
        <link rel="apple-touch-icon" href="/touch-icon.png" />
        <link rel="mask-icon" href={favIcon} color="#000000" />
        <link rel="icon" href={favIcon} />
      */}

    </NextHead>
  )
}

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string
}

export default Head
