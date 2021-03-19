import {ITodo} from "../interfaces/ITodo";
import {Status} from "../enums/status";

export const initialFormData: ITodo = {
    subject: '',
    details: '',
    status: Status.UNSTARTED
};
