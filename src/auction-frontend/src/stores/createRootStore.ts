import UserStore from "./UserStore";

interface RootStore {
    userStore: UserStore;
}

export function createRootStore(): RootStore {
    const userStore: UserStore = new UserStore();
    return {
        userStore
    }
}