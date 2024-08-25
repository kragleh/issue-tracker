import { auth } from '@/auth'
import ProfilePicture from '@/components/ui/ProfilePicture'
import BackButton from '@/components/ui/BackButton'
import Card from '@/components/ui/Card'
import SignOutButton from '@/components/ui/SignOutButton'
import { redirect } from 'next/navigation'
import React from 'react'

const ProfilePage = async () => {
  const session = await auth()
  const user = session?.user

  if (!user) redirect('/signin?r=/profile')

  return (
    <>
      <main className='h-screen w-full block md:flex items-center justify-center'>
        <Card className='max-w-md p-4 w-full flex flex-col gap-4'>
          <div className='flex justify-between items-center'>
            <h1 className='text-center text-2xl font-semibold'>Profile</h1>
            <BackButton />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <h1 className='font-semibold'>Username</h1>
              <p className='break-all'>{ user.name ? user.name : 'Unknown' }</p>
            </div>
            <div>
              <h1 className='font-semibold'>Email</h1>
              <p className='break-all'>{ user.email ? user.email : 'Unknown' }</p>
            </div>
            <div>
              <h1 className='font-semibold'>ID</h1>
              <p className='break-all'>{ user.id ? user.id : 'Unknown' }</p>
            </div>
            <div>
              <h1 className='font-semibold'>Picture</h1>
              <ProfilePicture user={ user } size={ 32 } />
            </div>
          </div>
          <SignOutButton />
        </Card>
      </main>
    </>
  )
}

export default ProfilePage