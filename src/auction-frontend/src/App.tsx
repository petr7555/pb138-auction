import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {Login} from "./components/Login";
import {useStores} from "./hooks/use-stores";
import {observer} from "mobx-react-lite";
import {Main} from "./components/Main";

export const App = observer(() => {
    const {userStore} = useStores();
    return (
        <div className="App">
            {userStore.loggedIn ? <Main/> : <Login/>}
        </div>
    );
})

export default App;
