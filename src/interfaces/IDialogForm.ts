import {ITodo} from "./ITodo";

export interface IDialogForm {
    open: boolean;
    formData?: ITodo;
    submitEvent: (data: ITodo) => void;
    closeEvent: () => void;
    deleteEvent: (data: ITodo) => void;
}
