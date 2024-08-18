"use client"
import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { FaMoon, FaSun } from 'react-icons/fa'

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className='p-4'>
      {
        mounted &&
          theme === 'dark'
            ? 
            <button onClick={() => { setTheme('light') }} className='
              w-full flex items-center gap-2 
              text-neutral-700 dark:text-neutral-300 
              duration-200
            '>
              <FaSun size={ 24 } />
            </button>
            : 
            <button onClick={() => { setTheme('dark') }} className='
              w-full flex items-center gap-2 
              text-neutral-700 dark:text-neutral-300 
              duration-200
            '>
              <FaMoon size={ 24 } />
            </button>
      }
    </section>
  )

  return (
    <section className='p-4'>
      {
        mounted &&
          theme === 'dark'
            ? 
            <button onClick={() => { setTheme('light') }} className='
              w-full flex items-center gap-2 
              text-neutral-700 dark:text-neutral-300 
              bg-neutral-200 hover:bg-neutral-300 
              dark:bg-neutral-800 dark:hover:bg-neutral-700 
              duration-200 px-4 py-2 rounded-xl
            '>
              <FaSun size={ 24 } /> Light Mode
            </button>
            : 
            <button onClick={() => { setTheme('dark') }} className='
              w-full flex items-center gap-2 
              text-neutral-700 dark:text-neutral-300 
              bg-neutral-200 hover:bg-neutral-300 
              dark:bg-neutral-800 dark:hover:bg-neutral-700 
              duration-200 px-4 py-2 rounded-xl
            '>
              <FaMoon size={ 24 } /> Dark Mode
            </button>
      }
    </section>
  )
}

export default ThemeSwitch