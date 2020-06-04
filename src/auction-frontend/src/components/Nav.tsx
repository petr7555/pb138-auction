import React, { useContext } from "react";
import { Button, Menu } from "antd";
import { HourglassOutlined, IdcardOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, withRouter } from 'react-router-dom';
import { userContextMain } from "../App";
import axios from 'axios';
import { showError } from "../api/apiCalls";
import { UserContext } from "../types/types";

export const Nav = withRouter((props) => {
    const {location} = props;

    const userContext = useContext<UserContext>(userContextMain);

    const logout = async (): Promise<void> => {
        try {
            await axios.get(`${process.env.REACT_APP_HOST}/api/logout`);
            userContext.setUserState({
                ...userContext.userState,
                loggedIn: false
            })
            sessionStorage.removeItem("userState");
        } catch (error) {
            showError(error);
        }
    };

    return (
        <div>
            <Menu selectedKeys={[location.pathname === "/" ? "/auctions" : location.pathname]} mode="horizontal"
                  className="main-menu">
                <Menu.Item key="/auctions">
                    <Link to="/auctions">
                        <HourglassOutlined/>
                        <span>Auctions</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/my_auctions">
                    <Link to="/my_auctions">
                        <IdcardOutlined/>
                        <span>My Auctions</span>
                    </Link>
                </Menu.Item>
                <Button className="main-menu__logout" icon={<LogoutOutlined/>} onClick={logout}>Log out</Button>
            </Menu>
        </div>
    )
})
