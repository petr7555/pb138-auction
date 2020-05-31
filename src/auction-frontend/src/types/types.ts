import { User } from "../entitites/User"
import { DataActionType } from "./enums"
import AuctionItem from "../entitites/AuctionItem"
import moment from "moment"
import { Rule } from "antd/lib/form"

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

export type DrawerFormParam = {
    refresh: () => Promise<void>;
}

export type DrawerFormDateValidator = {
    validator: (rule: Rule, value: moment.Moment) => Promise<void>;
}