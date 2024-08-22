import React from 'react'

const ProjectHeader = ({ 
  leftSide, 
  rightSide,
}: { 
  leftSide?: React.ReactNode, 
  rightSide?: React.ReactNode,
}) => {
  return (
    <section className='border-b border-neutral-300 dark:border-neutral-700 p-2'>
      <div className='max-w-4xl w-full mx-auto flex justify-between items-center'>
        <div className='flex items-center gap-2 ml-2'>
          { leftSide }
        </div>
        
        <div className='flex items-center gap-2 mr-2'>
          { rightSide }
        </div>
      </div>
    </section>
  )
}

export default ProjectHeader