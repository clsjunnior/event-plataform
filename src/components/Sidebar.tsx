import { gql, useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Lesson from './Lesson'

const GET_LESSONS_QUERY = gql`
  query {
    lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
      id
      lessonType
      slug
      availableAt
      title
    }
  }
`

interface GetLessonsQueryResponse {
  lessons: {
    id: string
    lessonType: `live` | `class`
    slug: string
    availableAt: string
    title: string
  }[]
}

const Sidebar: React.FC = () => {
  const slug = useParams<{ slug: string }>()
  const navigate = useNavigate()

  const { data, loading } = useQuery<GetLessonsQueryResponse>(GET_LESSONS_QUERY)

  useEffect(() => {
    if (!loading) {
      if (!Object.values(slug).length) navigate(`/event/lesson/${data?.lessons[0].slug}`)
    }
  }, [loading])

  return (
    <aside className="w-[348px] bg-gray-700 p-6 border-l border-gray-600">
      <span className="font-bold text-2xl pb-6 mb-6 border-b block border-gray-500">
        Cronograma de Aulas
      </span>

      <div className="flex flex-col gap-8">
        {data?.lessons.map((lesson) => (
          <Lesson
            key={lesson.id}
            title={lesson.title}
            slug={lesson.slug}
            availableAt={new Date(lesson.availableAt)}
            type={lesson.lessonType}
          />
        ))}
      </div>
    </aside>
  )
}

export default Sidebar
