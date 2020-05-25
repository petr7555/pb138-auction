export default interface AuctionItem {
    id: number;
    name: string;
    description: string;
    user: string;
    // ISO string
    until: string;
    actualPrice: number;
    winningUser: string;
    loosing?: boolean;
}
