import React from 'react'

const Footer = () => {
  return (
    <div className='bg-gradient-to-r from-[#1b263b] to bg-[#0d1b2a] w-full text-white text-center p-2'>
        <p className='font-mono text-lg'>Made by Chethan.</p>
        <p className=''>&copy; {new Date().getFullYear()} All rights reserved.</p>
    </div>
  )
}

export default Footer