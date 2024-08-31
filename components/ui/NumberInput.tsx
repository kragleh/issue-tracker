"use client"
import React from 'react'

const NumberInput = ({ id, onChange }: { id: string, onChange: (content: number) => void }) => {
  return (
    <input type='number' id={ id } onChange={ e => onChange(e.target.valueAsNumber) } 
      className='bg-neutral-200 dark:bg-neutral-800 rounded px-2 py-1 w-full'
    />
  )
}

export default NumberInput