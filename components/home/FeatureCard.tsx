import React from 'react'
import Card from '../ui/Card'
import LinkButton, { LinkButtonVariant } from '../ui/LinkButton'

const FeatureCard = ({ icon, title, description, link, action, actionVariant }: { icon: React.ReactNode, title: string, description: string, link: string, action: React.ReactNode, actionVariant?: LinkButtonVariant }) => {
  return (
    <Card className='flex flex-col lg:flex-row gap-4 p-4 lg:items-center'>
      <div className='flex items-center gap-4 lg:mr-auto'>
        { icon }
        <div>
          <h1 className='text-xl font-semibold'>{ title }</h1>
          <p>{ description }</p>
        </div>
      </div>
      <LinkButton href={ link } variant={ actionVariant }>{ action }</LinkButton>
    </Card>
  )
}

export default FeatureCard