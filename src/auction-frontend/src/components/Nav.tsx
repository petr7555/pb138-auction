import React from "react";
import {Button, Menu} from "antd";
import {HourglassOutlined, IdcardOutlined, LogoutOutlined} from '@ant-design/icons';
import {Link, withRouter} from 'react-router-dom';
import {useStores} from "../store/use-stores";

export const Nav = withRouter((props) => {
    const {location} = props;
    const {userStore} = useStores();

    const logout = (): void => {
        userStore.loggedIn = false
    };

    return (
        <div>
            {/* eslint-disable-next-line no-restricted-globals */}
            <Menu selectedKeys={[location.pathname === "/" ? "/auctions" : location.pathname]} mode="horizontal" className="main-menu">
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
                <Button icon={<LogoutOutlined/>} onClick={logout}>Log out</Button>
            </Menu>
        </div>
    )
})
