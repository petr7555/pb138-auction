import React, { useState } from 'react';
import { Login } from "./components/Login";
import { observer } from "mobx-react-lite";
import { Main } from "./components/Main";
import axios from 'axios';
import "./styles.less";

axios.defaults.withCredentials = true;
export const UserContext = React.createContext(null);

export const App = observer(() => {
    const [userState, setUserState] = useState({loggedIn: false});

    return (
        <UserContext.Provider value={{userState, setUserState}}>
            <div className="App">
                {userState.loggedIn ? <Main/> : <Login/>}
            </div>
        </UserContext.Provider>
    );
})

export default App;
