import {storesContext} from "../context";
import {useContext} from "react";
import UserStore from "../store/UserStore";

interface ContextValue{
    userStore: UserStore;
}

export const useStores = (): ContextValue => useContext(storesContext)
