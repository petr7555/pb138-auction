import {useStores} from "../hooks/use-stores";
import {observer} from "mobx-react-lite";
import React from "react";

export const Main = observer(() => {
    const {userStore} = useStores()

    return (
        <>
            <div>{userStore.count}</div>
            <button onClick={() => userStore.increment()}>++</button>
            <button onClick={() => userStore.decrement()}>--</button>
        </>
    )
})
