import React from 'react';

interface LoginParams {
    username: string
    password: string
    code: string
    uuid: string
    remember: boolean
}

interface AuthWrapperProps {
    children: React.ReactElement
    hasPermiss: string[]
}

export type {
    LoginParams,
    AuthWrapperProps
}
