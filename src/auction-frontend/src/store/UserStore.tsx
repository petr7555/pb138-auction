import { action, observable } from 'mobx'

export default class UserStore {

    @observable
    loggedIn = false;

    id = 0;

    @action
    async login(username: string): Promise<void> {
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
