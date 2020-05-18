import {action, observable} from 'mobx'
import AuctionItem from "../entitites/AuctionItem";
import { getMockAuctions } from "../mocks/mocks";

export default class AuctionsStore {

    @observable
    auctions: AuctionItem[] = [];

    @action
    async fetchAuctions() {
        try {
            // const res = await fetch(`http://localhost:8080/auctions/`);
            // const result = await res.json();
            const result = getMockAuctions();
            this.auctions = result;
        } catch (error) {
            this.auctions = [];
        }
    }
}
