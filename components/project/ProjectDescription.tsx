"use client"
import { Project } from '@prisma/client'
import React from 'react'
import showdown from 'showdown'

// TODO: Better markdown support because mixing markdown and html is not working well

const ProjectDescription = ({ project }: { project: Project }) => {
  var converter = new showdown.Converter()
  return (
    <section className='prose prose-neutral dark:prose-invert border border-neutral-300 dark:border-neutral-700 rounded-xl p-4 mx-auto' 
      dangerouslySetInnerHTML={{ __html: converter.makeHtml(project.description) }}></section>
  )
}

export default ProjectDescription