import React from 'react'
import logo from '../assets/Logomark.png'

function Navbar() {
  return (
    <div className='h-[10vh]'>
        <div className="flex gap-x-2 ml-6 mt-2">
          <img src={logo} />
          <div className="text-2xl font-bold text-[#004838]">
            <a href="#">Lagoon</a>
          </div>
        </div>
      
    </div>
  )
}

export default Navbar
