import { notification } from "antd";
import NewAuction from "../entitites/NewAuction";
import axios from 'axios';

export const showError = (error: Error) => {
    notification.error({
        message: 'Error',
        description: error.message,
    });
}
export const showSuccess = (msg: string) => {
    notification.success({
        message: 'Success',
        description: msg,
    });
}

export const createAuction = async (auction: NewAuction) => {
    try {
        const response = await axios.post("http://localhost:8080/api/auctions", auction,{withCredentials: true});
        showSuccess('Auction has been created');
    } catch (error) {
        showError(error);
    }
}
