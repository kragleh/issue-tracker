"use client"
import React from 'react'

const TextInput = ({ id, placeholder, onChange }: { id: string, placeholder: string, onChange: (content: string) => void }) => {
  return (
    <input type='text' id={ id } placeholder={ placeholder } onChange={ e => onChange(e.target.value) } 
      className='bg-neutral-200 dark:bg-neutral-800 rounded px-2 py-1 w-full'
    />
  )
}

export default TextInput