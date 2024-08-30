import { auth, providerMap, signIn } from '@/auth'
import CardLayout from '@/components/misc/CardLayout'
import { AuthError } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const LoginPage = async ({ searchParams }: { searchParams: any }) => {
  const session = await auth()
  const user = session?.user

  if (user) redirect('/')

  let redir = '/'

  if (searchParams) {
    const redirValue = searchParams.r

    if (redirValue !== null) {
      redir = redirValue
    }
  }

  return (
    <main className='h-screen w-full block md:flex items-center justify-center'>
      <CardLayout>
        <h1 className='text-center text-2xl font-semibold'>Sign In</h1>
        <section className='flex flex-col gap-2'>
          {
            Object.values(providerMap).map((provider) => (
              <form action={async () => {
                  "use server"
                  try {
                    await signIn(provider.id, { redirectTo: redir })
                  } catch (error) {
                    if (error instanceof AuthError) {
                      return redirect(`/signin?error=${error.type}`)
                    }
                    throw error
                  }
                }}
              >
                <button type="submit" className='text-neutral-700 dark:text-neutral-300 px-4 py-2 bg-neutral-500/20 hover:bg-neutral-500/30 duration-300 rounded-xl w-full'>
                  <span>{provider.name}</span>
                </button>
              </form>
            ))
          }
        </section>
        
        <Link href={'https://kragleh.com'} className='text-xs text-center opacity-50'>{ new Date().getFullYear() } © Issue Tracker</Link>
      </CardLayout>
    </main>
  )
}

export default LoginPage