import { useEffect, useReducer } from "react";
import axios from 'axios';
import { DataState, DataAction } from "../types/types";
import { DataActionType } from "../types/enums";
import AuctionItem from "../entitites/AuctionItem";

const dataFetchReducer = (state: DataState, action: DataAction): DataState => {
    switch (action.type) {
        case DataActionType.FETCH_INIT:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case DataActionType.FETCH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
            };
        case DataActionType.FETCH_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        default:
            throw new Error();
    }
};

export const useDataApi = (url: string, initialData: AuctionItem[]): [DataState, () => Promise<void>] => {
    const [state, dispatch] = useReducer<(state: DataState, action: DataAction) => DataState>(dataFetchReducer, {
        isLoading: false,
        isError: false,
        data: initialData,
    });

    const fetchData = async (): Promise<void> => {
        dispatch({type: DataActionType.FETCH_INIT});
        try {
            const result = await axios(url);
            dispatch({type: DataActionType.FETCH_SUCCESS, payload: result.data});
        } catch (error) {
            dispatch({type: DataActionType.FETCH_FAILURE});
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [state, fetchData];
};
