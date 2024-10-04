import type { ResponseAction } from '@/interfaces/app/response.interface'
import React, { useEffect } from 'react'

interface Props {
  postId: string
}

export const LikeButton = ({ postId }: Props) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [data, setData] = React.useState<ResponseAction|null>(null)

  useEffect(() => {
    const getPost = async () => {
      const res = await fetch(`/api/posts/likes/${postId}`)
      const data = await res.json()
      setData(data)
      setIsLoading(false)
    }

    getPost()
  }, [])

  return (
    isLoading
      ? <button className='btn-like'>Loading...</button>
      : !data?.success
      ? <div>Error al buscar Post</div>
      : <button className='btn-like'>Likes {data?.data.likes}</button>
  )
}
