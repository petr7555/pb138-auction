import React, { useContext } from "react";
import { Button, Menu } from "antd";
import { HourglassOutlined, IdcardOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, withRouter } from 'react-router-dom';
import { UserContext } from "../App";
import axios from 'axios';
import { showError } from "../api/apiCalls";

export const Nav = withRouter((props) => {
    const {location} = props;

    const userContext = useContext(UserContext);

    const logout = async (): Promise<void> => {
        try {
            await axios.get('http://localhost:8080/api/logout');
            userContext.setUserState({
                ...userContext.userState,
                loggedIn: false
            })
        } catch (error) {
            showError(error);
        }
    };

    return (
        <div>
            {/* eslint-disable-next-line no-restricted-globals */} {/*WIP*/}
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
                <Button icon={<LogoutOutlined/>} onClick={logout} style={{marginLeft: "20px"}}>Log out</Button>
            </Menu>
        </div>
    )
})
