import { notification } from "antd";
import NewAuction from "../entitites/NewAuction";
import axios from 'axios';

export const showError = (error: Error): void => {
    notification.error({
        message: 'Error',
        description: error.message,
    });
}
export const showSuccess = (msg: string): void => {
    notification.success({
        message: 'Success',
        description: msg,
    });
}

export const createAuction = async (auction: NewAuction): Promise<void> => {
    try {
        await axios.post(`${process.env.REACT_APP_HOST}/api/auctions`, auction);
        showSuccess('Auction has been created');
    } catch (error) {
        showError(error);
    }
}
