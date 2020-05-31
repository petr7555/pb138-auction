import React, { useState } from 'react';
import { Login } from "./components/Login";
import { Main } from "./components/Main";
import axios from 'axios';
import "./styles.less";
import { UserState, UserContext } from './types/types';

axios.defaults.withCredentials = true;
export const userContextMain = React.createContext<UserContext>(null);

export const App = (): JSX.Element => {
    const [userState, setUserState] = useState<UserState>(JSON.parse(sessionStorage.getItem("userState")) || {loggedIn: false});

    return (
        <userContextMain.Provider value={{userState, setUserState}}>
            <div className="App">
                {userState.loggedIn ? <Main/> : <Login/>}
            </div>
        </userContextMain.Provider>
    );
};

export default App;
