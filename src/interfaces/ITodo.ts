import {Status} from "../enums/status";

export interface ITodo {
    id?: string;
    subject: string;
    details: string;
    status: Status;
}
