import { useRef } from 'react'
import { CaretRight, DiscordLogo, FileArrowDown, Image, Lightning } from 'phosphor-react'
import { Player as VimePlayer, Youtube, DefaultUi } from '@vime/react'
import { gql, useQuery } from '@apollo/client'
import Button from './Button'

import '@vime/core/themes/default.css'

interface PlayerProps {
  lessonSlug: string
}

const GET_LESSON_BY_SLUG_QUERY = gql`
  query GetLessonBySlug($slug: String) {
    lesson(where: { slug: $slug }) {
      slug
      title
      videoId
      description
      teacher {
        avatarURL
        bio
        name
      }
    }
  }
`

interface GetLessonBySlugQueryResponse {
  lesson: {
    slug: string
    title: string
    videoId: string
    description: string
    teacher: {
      avatarURL: string
      bio: string
      name: string
    }
  }
}

export function Player(props: PlayerProps) {
  const player = useRef<HTMLVmPlayerElement>(null)

  const { data } = useQuery<GetLessonBySlugQueryResponse>(GET_LESSON_BY_SLUG_QUERY, {
    variables: {
      slug: props.lessonSlug,
    },
  })

  if (!data) {
    return (
      <div className="flex-1">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="flex-1">
      <div className="bg-black flex justify-center">
        <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
          {/* @ts-ignore */}
          <VimePlayer ref={player} style={{ '--vm-player-theme': '#81D8F7' }}>
            <Youtube videoId={data.lesson.videoId} />
            <DefaultUi noClickToPlay />
          </VimePlayer>
        </div>
      </div>

      <div className="p-8 max-w-[1100px] mx-auto">
        <div className="flex items-start gap-16">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{data.lesson.title}</h1>
            <p className="mt-4 text-gray-200 leading-relaxed">{data.lesson.description}</p>
            <div className="flex items-center gap-4 mt-6">
              <img
                className="h-16 w-16 rounded-full border-2 border-blue-500"
                src={data.lesson.teacher.avatarURL}
                alt="github"
              />
              <div className="leading-relaxed">
                <strong className="font-bold text-2xl block">{data.lesson.teacher.name}</strong>
                <span className="text-gray-200 text-sm-block">{data.lesson.teacher.bio}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Button variant="green" href="#">
              <DiscordLogo />
              Comunidade do Discord
            </Button>
            <Button variant="blue" href="#">
              <Lightning />
              Acesse o desafio
            </Button>
          </div>
        </div>
        <div className="gap-8 mt-20 grid grid-cols-2">
          <a
            href="#"
            className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors"
          >
            <div className="bg-green-700 h-full p-6 flex items-center">
              <FileArrowDown size={40} />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Material Complementar</strong>
              <p className="text-sm text-gray-200 mt-2">
                Acesse o material complementar para acelar o seu desenvolvimento!
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <CaretRight size={24} />
            </div>
          </a>

          <a
            href="#"
            className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors"
          >
            <div className="bg-green-700 h-full p-6 flex items-center">
              <Image size={40} />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Wallpapers Exclusivos</strong>
              <p className="text-sm text-gray-200 mt-2">
                Baixe wallpapers exclusivos do Ignite Lab e personalize a sua máquina
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <CaretRight size={24} />
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
