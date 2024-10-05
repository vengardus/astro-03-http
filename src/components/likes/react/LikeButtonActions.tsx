import type { ResponseAction } from '@/interfaces/app/response.interface'
import { actions } from 'astro:actions'
import React, { useEffect } from 'react'

interface Props {
  postId: string
}

export const LikeButtonActions = ({ postId }: Props) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [counterLike, setCounterLike] = React.useState<number>(0)
  const [counterClicks, setCounterClicks] = React.useState<number>(0)

  useEffect(() => {
    const getPost = async () => {
      // const res = await fetch(`/api/posts/likes/${postId}`)
      // const data: ResponseAction = await res.json()
      const res = await actions.getPost(postId)
      const data: ResponseAction = res.data!
      console.log(data)
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
    console.log(res, likes)

    setCounterClicks(0)
  }

  return (
    isLoading
      ? <button className='btn-like'>Loading...</button>
      : counterLike == -1
        ? <div>Error al buscar Post</div>
        :
        <button
          className='btn-like'
          onClick={addLike}
        >
          {!counterLike ? 'Deja tu like' : `Likes ${counterLike}`}
        </button>

  )
}
