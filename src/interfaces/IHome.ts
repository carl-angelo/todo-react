import {ITodo} from "./ITodo";

export interface IHome {
    newData?: ITodo;
    deleteData?: ITodo;
    openCard: (data: ITodo) => void;
}
