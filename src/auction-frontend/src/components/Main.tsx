import React from "react";
import {Nav} from "./Nav";
import {Auctions} from "./Auctions";
import {MyAuctions} from "./MyAuctions";
import {BrowserRouter as Router, Route} from 'react-router-dom';

export const Main = () => {
    return (
        <Router>
            <div>
                <Nav/>
                <Route path={["/auctions", "/"]} exact component={Auctions}/>
                <Route path="/my_auctions" component={MyAuctions}/>
            </div>
        </Router>
    )
}
