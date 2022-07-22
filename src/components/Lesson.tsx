import { CheckCircle, Lock } from 'phosphor-react'
import { isPast, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Link, useParams } from 'react-router-dom'
import classNames from 'classnames'

interface LessonProps {
  title: string
  slug: string
  availableAt: Date
  type: `live` | `class`
}

const Lesson: React.FC<LessonProps> = (props) => {
  const slug = useParams<{ slug: string }>()

  const isLessonAvailable = isPast(props.availableAt)
  const availableDateFormated = format(props.availableAt, "EEEE' • 'd ' de 'MMMM' • 'k'h'mm", {
    locale: ptBR,
  })

  const isActive = slug.slug === props.slug

  return (
    <Link to={`/event/lesson/${props.slug}`} className="group">
      <span className="text-gray-300">{availableDateFormated}</span>
      <div
        className={classNames(
          `rounded border border-gray-500 p-4 mt-2 transition-colors group-hover:border-green-500`,
          {
            'bg-green-500': isActive,
          }
        )}
      >
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span className="flex items-center gap-2 text-sm text-blue-500 font-medium">
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span className="flex items-center gap-2 text-sm text-orange-500 font-medium">
              <Lock size={20} />
              Em breve
            </span>
          )}

          <span
            className={classNames(
              'text-xs rounded py-[2px] px-2  border border-green-300 font-bold',
              {
                'text-blue-500': isActive,
                'text-green-300': !isActive,
              }
            )}
          >
            {props.type === `live` ? `AO VIVO` : `AULA PRÁTICA`}
          </span>
        </header>
        <strong
          className={classNames('mt-5 block', {
            'text-gray-100': isActive,
            'text-gray-300': !isActive,
          })}
        >
          {props.title}
        </strong>
      </div>
    </Link>
  )
}

export default Lesson
