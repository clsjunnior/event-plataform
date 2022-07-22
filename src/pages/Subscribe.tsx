import { Logo } from '../components/Logo'
import { useInput } from 'react-hanger'
import { gql, useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

const CREATE_SUBSCRIBER_MUTATION = gql`
  mutation CreateSubscriber($name: String!, $email: String!) {
    createSubscriber(data: { name: $name, email: $email }) {
      id
    }
  }
`

export function Subscribe() {
  const name = useInput('')
  const email = useInput('')
  const navigate = useNavigate()

  const [createSubscriber, { loading }] = useMutation(CREATE_SUBSCRIBER_MUTATION)

  async function handleSubiscribe(event: React.FormEvent) {
    event.preventDefault()
    await createSubscriber({ variables: { name: name.value, email: email.value } })

    navigate('/event')
  }

  return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
      <div className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto">
        <div className="max-w-[640px]">
          <Logo />
          <h1 className="mt-8 text-[2.5rem] leading-tight">
            Construa uma <strong className="text-blue-500">aplicação completa</strong>, do zero, com{' '}
            <strong className="text-blue-500">React</strong>
          </h1>
          <p className="mt-4 text-gray-200 leading-relaxed">
            Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e
            com alta demanda para acessar as melhores oportunidades do mercado.
          </p>
        </div>
        <div className="p-8 bg-gray-700 rounded border border-gray-500">
          <strong className="text-2xl mb-6 block">Inscreva-se gratuitamente</strong>
          <form onSubmit={handleSubiscribe} className="flex flex-col gap-2 w-full">
            <input
              type="text"
              className="bg-gray-900 rounded px-5 h-14 outline-none focus:bg-gray-800 transition-colors"
              placeholder="Seu nome completo"
              value={name.value}
              onChange={name.onChange}
              required
            />
            <input
              type="text"
              className="bg-gray-900 rounded px-5 h-14 outline-none focus:bg-gray-800 transition-colors"
              placeholder="Seu melhor e-mail"
              value={email.value}
              onChange={email.onChange}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              Garantir minha vaga
            </button>
          </form>
        </div>
      </div>
      <img src="/src/assets/mockup.png" className="mt-10" alt="" />
    </div>
  )
}
