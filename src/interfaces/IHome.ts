import {ITodo} from "./ITodo";

export interface IHome {
    newData?: ITodo;
    search?: string;
    deleteData?: ITodo;
    openCard?: (data: ITodo) => void;
}
