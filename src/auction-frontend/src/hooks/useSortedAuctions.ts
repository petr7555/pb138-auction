import AuctionItem from "../entitites/AuctionItem";
import { useDataApi } from "../api/useDataApi";
import { useContext } from "react";
import { userContextMain } from "../App";
import { DataState, UserContext } from "../types/types";
import { host, port } from "../constants";

export const useSortedAuctions = (url: string, initialData: AuctionItem[]): [DataState, () => Promise<void>] => {
    const [{data, isLoading, isError}, doFetch] = useDataApi(
        url,
        initialData,
    );

    data.sort((a: AuctionItem, b: AuctionItem) =>
        (a.until < b.until) ? 1 : -1
    )

    // Adds to each AuctionItem loosing flag
    const userContext = useContext<UserContext>(userContextMain);

    const [{data: participatingAuctions}] = useDataApi(
        `http://${host}:${port}/api/auctions-taken-part/user/${userContext.userState.user.id}`,
        [],
    );

    data.forEach((auction: AuctionItem) => auction.loosing = participatingAuctions.some((a: AuctionItem) => a.id === auction.id) && auction.winningUser !== userContext.userState.user.name);

    return [{data, isLoading, isError}, doFetch];
}
