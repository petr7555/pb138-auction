import React from 'react'
import UserStore from '../store/UserStore'

export const storesContext = React.createContext({
    userStore: new UserStore(),
})
