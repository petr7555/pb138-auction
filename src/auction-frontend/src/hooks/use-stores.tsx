import {storesContext} from "../context";
import {useContext} from "react";
import UserStore from "../store/UserStore";
import AuctionsStore from "../store/AuctionsStore";

interface ContextValue{
    userStore: UserStore;
    auctionsStore: AuctionsStore;
}

export const useStores = (): ContextValue => useContext(storesContext)
