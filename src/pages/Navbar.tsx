import React from 'react'

const Navbar = () => {
  return (
    <div>
      <header className="header">
        <a href="/" className="logo">Logo</a>
        <nav className="navbar">
            <a href="">Home</a>
            <a href="">Projects</a>
            <a href="">Data</a>
            <a href="">Records</a>
            <a href="">Contacts</a>
        </nav>
      </header>
    </div>
  )
}

export default Navbar
