import React from 'react'
import UserStore from '../store/UserStore'
import AuctionsStore from "../store/AuctionsStore";

export const storesContext = React.createContext({
    userStore: new UserStore(),
    auctionsStore: new AuctionsStore(),
})
