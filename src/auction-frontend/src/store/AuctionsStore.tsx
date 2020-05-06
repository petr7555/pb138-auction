import {action, observable} from 'mobx'
import AuctionItemEntity from "../entitites/AuctionItemEntity";

export default class UserStore {

    @observable
    auctions: AuctionItemEntity[] = [];

    @action
    async fetchAuctions() {
        try {
            // const res = await fetch(`http://localhost:8080/auctions/`);
            // const result = await res.json();
            const result = [
                {
                    id: 1,
                    name: "Brand new fridge",
                    description: "Too big for my flat.",
                    user: "Anne",
                    until: "2020/05/05",
                    actual_price: 100,
                    winning_user: "John"
                }
            ]
            this.auctions = result;
        } catch (error) {
            this.auctions = [];
        }
    }
}
