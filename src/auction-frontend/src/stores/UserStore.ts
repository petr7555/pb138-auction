import { action, observable } from 'mobx'
import { User } from '../entitites/User';
import axios from 'axios';
import { showError } from "../api/apiCalls";

export default class UserStore {

    @observable
    loggedIn = false;

    @observable
    user: User = {id: 0, username: ""};

    @action
    async login(username: string, password: string) {
        try {
            const res = await axios.post('http://localhost:8080/api/login', {
                name: username,
                password
            });
            this.user = res.data;
            this.loggedIn = true;
            return true;
        } catch (error) {
            if (error.respose) {
                if (error.respose.status === 401) {
                    return false;
                }
            }
            showError(error);
        }
    }
}
