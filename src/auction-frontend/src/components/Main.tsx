import React from "react";
import { Nav } from "./Nav";
import { Auctions } from "./Auctions";
import { MyAuctions } from "./MyAuctions";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AuctionDetail } from "./AuctionDetail";

export const Main = (): JSX.Element => {
    return (
        <Router>
            <div>
                <Nav/>
                <div className="main-content">
                    <Route path={["/auctions", "/"]} exact component={Auctions}/>
                    <Route path="/my_auctions" component={MyAuctions}/>
                    <Route path="/auctions/:id" component={AuctionDetail}/>
                </div>
            </div>
        </Router>
    )
}
