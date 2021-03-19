import {ITodo} from "./ITodo";

export interface IDialogForm {
    open: boolean;
    formData?: ITodo;
    editable?: boolean;
    submitEvent: (data: ITodo) => void;
    closeEvent: () => void;
    deleteEvent: (data: ITodo) => void;
}
