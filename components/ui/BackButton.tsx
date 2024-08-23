"use client"
import React from 'react'
import { IoClose } from 'react-icons/io5'

const BackButton = () => {
  return (
    <button onClick={ () => window.history.back() }>
      <IoClose size={ 24 } />
    </button>
  )
}

export default BackButton