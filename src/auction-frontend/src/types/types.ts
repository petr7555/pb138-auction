import { User } from "../entitites/User"
import { DataActionType } from "./enums"
import AuctionItem from "../entitites/AuctionItem"

export type UserContext = {
    userState: UserState;
    setUserState: React.Dispatch<React.SetStateAction<UserState>>;
}

export type UserState = {
    loggedIn: boolean;
    user: User;
}

export type DataState = {
    isLoading: boolean;
    isError: boolean;
    data: AuctionItem[];
}

export type DataAction = {
    type: DataActionType;
    payload?: AuctionItem[];
}