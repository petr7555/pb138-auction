import {action, observable} from 'mobx'
import AuctionItem from "../entitites/AuctionItem";

export default class AuctionsStore {

    @observable
    auctions: AuctionItem[] = [];

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
