import { ClerkProvider, SignIn } from '@clerk/clerk-react'
import React from 'react'
import { clerkPubKey } from './../../common/constants';

function Login() {
    return (
        <div className='mt-5 flex justify-center items-center'>
            <SignIn></SignIn>
        </div>
    )
}

export default Login