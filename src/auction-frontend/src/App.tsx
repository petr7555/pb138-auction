import React, { useState } from 'react';
import { Login } from "./components/Login";
import { observer } from "mobx-react-lite";
import { Main } from "./components/Main";
import axios from 'axios';
import "./styles.less";
import { UserState, UserContext } from './types';

axios.defaults.withCredentials = true;
export const userContextMain = React.createContext<UserContext>(null);

export const App = observer(() => {
    const [userState, setUserState] = useState<UserState>(JSON.parse(sessionStorage.getItem("userState")) || {loggedIn: false});

    return (
        <userContextMain.Provider value={{userState, setUserState}}>
            <div className="App">
                {userState.loggedIn ? <Main/> : <Login/>}
            </div>
        </userContextMain.Provider>
    );
})

export default App;
