import React, { useEffect, useState } from 'react'
import { Button } from './Button';

function Users() {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/v1/user/bulk');
            if(response.status !== 200) {
                throw new Error('Failed to fetch users');
            }

            const data = await response.json();
            setUsers(data.users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
      fetchUsers();
    }, [])

return (
    <div>
        <div className='font-bold text-lg mt-6 mb-2'>
            {"Users"}
        </div>
        <div className='mr-3 ml-3 flex flex-row justify-between'>
            <input type="text" placeholder='Search users...' className='border rounded border-slate-300 px-3 py-2 mb-2 w-full' />
        </div>
        <div>
             {users.map(user => <User user={user} key={user._id} />)}
        </div>
    </div>
  )
}

export default Users

function User(props) {
    return(
        <div className='flex flex-row justify-between px-4'>
            <div className='flex flex-row gap-4 items-center'>
                <div className='bg-slate-950 text-white rounded-full h-12 w-12 flex justify-center items-center mt-1 mr-2'>
                    <div>
                        {props.user.first_name[0]}
                    </div>
                </div>
                <div className='flex flex-col justify-center h-full'>
                    {props.user.first_name + " " + props.user.last_name}
                </div>
            </div>
            <div className='flex flex-col justify-center h-full'>
                <Button label="Send Money" onClick={() => {}} />
            </div>
        </div >
    );
}