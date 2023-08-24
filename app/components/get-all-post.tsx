'use client'

import { FC, useCallback, useEffect, useState } from 'react'

import Link from 'next/link'
import { MqttClient, connect } from 'mqtt'

import { PostType } from '../types/post'
// import { useCallback, useState, useEffect } from 'react'
// import { getAllPost } from '../services/Post/PostService'

interface Props {
  data: PostType[]
}

const Posts: FC<Props> = ({ data }) => {
  const [client, setClient] = useState<MqttClient | null>(null)

  const connectMqtt = useCallback(() => {
    setClient(
      connect('wss://mqtt-dashboard.com/mqtt', { protocolVersion: 4, protocolId: 'MQTT', clientId: 'text-post', port: 8884, host: '/mqtt' })
    )
  }, [])

  useEffect(() => {
    connectMqtt()
  // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (client !== null) {
      client.on('connect', () => {
        client.subscribe('post/update-create', (err) => {
          if (err == null) {
            client.publish('post/test', 'Hello mqtt')
          }
        })
      })

      client.on('message', (topic, message) => {
        console.log(topic)
        console.log(message.toString())
      })
    }
    return () => {
      if (client !== null) {
        client.end()
      }
    }
  }, [client])

  return (
    <>
      {data.length === 0 && (
        <div className='flex w-full h-52 justify-center items-center'>
          <span className='text-2xl text-white/90'>No post found</span>
        </div>
      )}
      <article className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-5'>
        {data.map(({ id, title, article, user }) => (
          <Link
            href={`/post/${id}`}
            key={id}
            className='border-2 flex flex-col border-white/20 bg-[#393E46] w-full h-[300px] rounded-lg p-4 hover:scale-95 transition-all duration-300'
          >
            <div className='w-full h-1/4'>
              <span className='text-2xl text-center text-[#00ADB5]'>{title}</span>
            </div>
            <div className='w-full h-2/4'>
              <span className='text-md text-[#EEEEEE]'>{article}</span>
            </div>
            <div className='w-full h-1/4 flex justify-end items-end'>
              <span className='text-sm font-sans font-semibold text-[#EEEEEE] tracking-wider'>{user?.surname ?? 'anómico'}</span>
            </div>
          </Link>
        ))}
      </article>
    </>
  )
}

export default Posts
