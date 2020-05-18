import React from 'react'
import UserStore from './UserStore'

export const storesContext = React.createContext({
    userStore: new UserStore(),
})
