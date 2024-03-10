import {SignInButton, SignedOut, UserButton} from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../public/box.svg'
import { ThemeToggler } from './ui/ThemeToggler'

const Header = () => {
  return (
    <header className='flex items-center justify-between sm:mb-[2rem] mb-4'>
        <Link href={'/'} className='flex items-center space-x-1'>
            <div className='scale-90 w-fit'>
                {/* Icon image */}
                <Image src={logo} alt='logo' height={50} width={50} className='dark:invert' />
            </div>
            <h1 className='font-mono font-bold text-2xl'>Dropbox</h1>
        </Link>

        <div className='px-5 flex space-x-2 items-center'>
          {/* Theme & sign-in */}
          <ThemeToggler />
          <UserButton afterSignOutUrl='/' />
          <SignedOut>
            <SignInButton afterSignInUrl='/dashboard' mode='modal' />
          </SignedOut>
        </div>
    </header>
  )
}

export default Header
