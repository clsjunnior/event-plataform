import React from 'react'
import { Link } from 'react-router-dom'
import { Logo } from './Logo'

const Header: React.FC = () => {
  return (
    <header className="w-full py-5 flex items-center justify-center bg-gray-700 border-b border-gray-600">
      <Link to={`/`}>
        <Logo />
      </Link>
    </header>
  )
}

export default Header
