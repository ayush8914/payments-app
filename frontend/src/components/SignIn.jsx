import React from 'react'
import HeadingComponent from './Heading'
import SubHeadingComponent from './SubHeading'
import InputBox from './InputBox'
import { Button } from './Button'
import BottomWarning from './BottomWarning'
    
function SignIn() {
  return (
    <div className='bg-slate-300 h-screen flex justify-center'>
        <div className='flex flex-col justify-center w-1/5'>
            <div className='bg-white px-4 p-2 text-center h-max rounded-lg'>
            <HeadingComponent label="Sign In" />
            <SubHeadingComponent label="Enter your credentials to access your account" />
            <InputBox placeholder="100xdev@gmail.com" label={"Email"} />
            <InputBox placeholder="123456" label={"Password"} />
            <Button label="Sign In" onClick={() => {}} />
            <BottomWarning label="Don't have an account?" buttonText="Sign Up" to="/signup" />
            </div>
        </div>
    </div>
  )
}

export default SignIn