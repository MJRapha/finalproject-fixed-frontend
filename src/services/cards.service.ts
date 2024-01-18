import axios from "axios";
import { ICard } from "../@types/@types";

const baseUrl = "http://localhost:3001/api/cardMoji";

const getCards = () => {
    return axios.get(baseUrl).then((res) => {
        return res.data
    });
};

const addCard = (card: ICard) => {
    return axios.post(baseUrl + "/add", card).then((res) => {
        return res.data as ICard & { _id: string };
    });
};

const deleteCard = (id: string) => {
    return axios.delete(baseUrl + `/delete/${id}`).then((res) => {
        return res.data
    });
};

export {
    getCards,
    addCard,
    deleteCard
};