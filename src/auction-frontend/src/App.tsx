import React from 'react';
import { Login } from "./components/Login";
import { useStores } from "./stores/use-stores";
import { observer } from "mobx-react-lite";
import { Main } from "./components/Main";
import "./styles.less";

export const App = observer(() => {
    const {userStore} = useStores();
    return (
        <div className="App" >
            {userStore.loggedIn ? <Main/> : <Login/>}
        </div>
    );
})

export default App;
