import { useEffect, useReducer } from "react";
import axios from 'axios';

// @ts-ignore
const dataFetchReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
            };
        case 'FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        default:
            throw new Error();
    }
};

// @ts-ignore
export const useDataApi = (url: string, initialData) => {
    const [state, dispatch] = useReducer(dataFetchReducer, {
        isLoading: false,
        isError: false,
        data: initialData,
    });

    const fetchData = async () => {
        dispatch({type: 'FETCH_INIT'});
        try {
            const result = await axios(url);
            dispatch({type: 'FETCH_SUCCESS', payload: result.data});
        } catch (error) {
            dispatch({type: 'FETCH_FAILURE'});
        }
    };

    useEffect(() => {
        fetchData();
    });

    return [state, fetchData];
};
