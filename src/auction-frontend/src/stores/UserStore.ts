import { action, observable } from 'mobx'
import { User } from '../entitites/User';

export default class UserStore {

    @observable
    loggedIn = false;

    @observable
    user: User = {id: 0, username: ""};

    @action
    async login(username: string, password: string): Promise<void> {
        try {
            // const res = await fetch(`http://localhost:8080/api/login/`);
            // const result = await res.json();
            const result = {
                id: 1,
                username: "Bob"
            }
            this.user = result;
            this.loggedIn = true;
        } catch (error) {
            this.loggedIn = false;
        }
    }
}
