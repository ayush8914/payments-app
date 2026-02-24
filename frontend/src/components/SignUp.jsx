import React from 'react'
import HeadingComponent from './Heading'
import SubHeadingComponent from './SubHeading'
import InputBox from './InputBox'
import { Button } from './Button'
import BottomWarning from './BottomWarning'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setuserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  return (
    <div className='bg-slate-300 flex justify-center h-screen'>
        <div className='flex flex-col justify-center w-2/3 sm:w-1/5'>
            <div className="bg-white rounded-lg p-2  text-center h-max px-4">
                <HeadingComponent label="Sign Up" />
                <SubHeadingComponent label="Enter your infromation to create an account" />
                <InputBox label="First Name" placeholder="Enter your first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <InputBox label="Last Name" placeholder="Enter your last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <InputBox placeholder="100xdev@gmail.com" label={"Email"} value={userName} onChange={(e) => setuserName(e.target.value)} />
                <InputBox placeholder="123456" label={"Password"} value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button label="Sign Up" onClick={async() => {
                    const response = await fetch('http://localhost:3000/api/v1/user/signup',{
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        first_name: firstName,
                        last_name: lastName,
                        userName: userName,
                        password: password
                      })
                    })

                    const data = await response.json();
                    if(response.status !== 200) {
                        console.log(data.message);
                        return;
                    }
                    localStorage.setItem("token", data.token);   
                    navigate("/dashboard");                 
                }} />
                <BottomWarning label="Already have an account?" buttonText="Sign In" to="/signin" />
            </div>
        </div>
    </div>
  )
}

export default SignUp