import Logo from "@/assets/navigatu_logo.png"
import { Button } from './ui/button'

const Navbar = () => {
  return (
    <div className="fixed top-0 w-full">
        <div className='flex justify-between items-center px-5'>
            <div>
            <h1>
                <a href="/">
                <img src={Logo} alt='Navigatu' className='w-20 cursor-pointer' />
                </a>
            </h1>
            </div>
            <div>
                {/* Not Logged In */}
                <div className='flex justify-end space-x-4'>
                    <div className='w-1/3'>
                        <div className='flex justify-end space-x-4'>
                            {/* Button for navigation */}
                            <a href="/"><Button className='bg-blue-950 hover:bg-blue-900 rounded-lg'>Logout</Button></a>
                            
                        </div>
                    </div>
                </div>
                {/* Logged In */}
                
            </div>
        </div>
    </div>
  )
}

export default Navbar