import {storesContext} from "../context";
import {useContext} from "react";

export const useStores = () => useContext(storesContext)
