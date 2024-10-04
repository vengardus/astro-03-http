import type { ResponseAction } from '@/interfaces/app/response.interface'
import React, { useEffect } from 'react'

interface Props {
  postId: string
}

export const LikeButton = ({ postId }: Props) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [counterLike, setCounterLike] = React.useState<number>(0)
  const [counterClicks, setCounterClicks] = React.useState<number>(0)

  useEffect(() => {
    const getPost = async () => {
      const res = await fetch(`/api/posts/likes/${postId}`)
      const data: ResponseAction = await res.json()
      setCounterLike(data.success ? data.data.likes : -1)
      setCounterClicks(0)
      setIsLoading(false)
    }

    getPost()
  }, [])

  const addLike = () => {
    setCounterLike(current => current + 1)
    setCounterClicks(current => {
      const newCounter = current + 1
      saveLike(newCounter)
      return newCounter
    })
  }

  const saveLike = async (likes: number) => {
    const res = await fetch(`/api/posts/likes/${postId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ likes: likes })
    })
    const data: ResponseAction = await res.json()
    console.log(data, likes)

    setCounterClicks(data.success ? 0 : -1)
  }

  return (
    isLoading
      ? <button className='btn-like'>Loading...</button>
      : counterLike == -1
        ? <div>Error al buscar Post</div>
        : <button
          className='btn-like'
          onClick={addLike}
        >Likes {counterLike}</button>
  )
}
