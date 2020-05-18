import { action, observable } from 'mobx'
import { User } from '../entitites/User';

export default class UserStore {

    @observable
    loggedIn: boolean = false;

    @observable
    currentUser?: User;

    @action
    async login(username: string, password: string): Promise<void> {
        try {
            // const res = await fetch(`http://localhost:8080/login/`);
            // const result = await res.json();
            const result = {
                id: 1
            }
            this.id = result.id;
            this.loggedIn = true;
        } catch (error) {
            this.loggedIn = false;
        }
    }
}
