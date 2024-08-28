"use client"
import MDEditor from '@uiw/react-md-editor'
import React from 'react'

const MarkdownRenderer = ({ content }: { content: string }) => {
  return (
    <MDEditor.Markdown source={ content } />
  )
}

export default MarkdownRenderer