import React from 'react';
import 'antd/dist/antd.css';
import "./styles.css";
import { Login } from "./components/Login";
import { useStores } from "./hooks/use-stores";
import { observer } from "mobx-react-lite";
import { Main } from "./components/Main";

export const App = observer(() => {
    const {userStore} = useStores();
    return (
        <div className="App" >
            {/*{userStore.loggedIn ? <Main/> : <Login/>}*/}
            <Main/>
        </div>
    );
})

export default App;
