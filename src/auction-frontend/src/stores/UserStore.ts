import { action, observable } from 'mobx'
import { User } from '../entitites/User';
import { message } from "antd";

export default class UserStore {

    @observable
    loggedIn = false;

    @observable
    user: User = {id: 0, username: ""};

    @action
    async login(username: string, password: string): Promise<void> {
        try {
            const res = await fetch('http://localhost:8080/api/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: username,
                    password
                })
            });
            this.user = await res.json();
            this.loggedIn = true;
        } catch (error) {
            this.loggedIn = false;
            message.error(error.message)
        }
    }
}
