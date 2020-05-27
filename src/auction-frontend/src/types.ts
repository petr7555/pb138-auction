import { User } from "./entitites/User"

export type UserContext = {
    userState: UserState;
    setUserState: React.Dispatch<React.SetStateAction<UserState>>;
}

export type UserState = {
    loggedIn: boolean;
    user: User;
}

export type SiteState = {
    isLoading: boolean;
    isError: boolean;
    data: any;
}