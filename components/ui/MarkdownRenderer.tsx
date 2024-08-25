"use client"
import MDEditor from '@uiw/react-md-editor'
import React from 'react'
import Card from './Card'

const MarkdownRenderer = ({ content }: { content: string }) => {
  return (
    <Card className='p-4'>
      <MDEditor.Markdown source={ content } />
    </Card>
  )
}

export default MarkdownRenderer