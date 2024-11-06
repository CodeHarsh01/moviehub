"use client"
import React from 'react'
import Trending from './components/Trending'
import Homesectionmovies from './components/Homesectionmovies'
import { useEffect, useState } from 'react'
import Loading from './components/Loading'

export default function page() {

  const [isLoad, setisLoad] = useState(true)

  useEffect(() => {
    setInterval(() => {
      setisLoad(false)
    }, 500)
  }, [])
  return (
    <>
      {isLoad ? <Loading /> : (<><Trending />
        <Homesectionmovies /></>)}
    </>
  )
}
