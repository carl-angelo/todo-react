import React, {ReactElement, useEffect, useState} from "react";
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem} from '@material-ui/core';
import {IDialogForm} from "../interfaces/IDialogForm";
import {ITodo} from "../interfaces/ITodo";
import {initialFormData} from "../constants/initialFormData";
import {StatusUtil} from "../util/status-util";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    fieldInput: {
        display: 'flex',
        width: '300px',
        margin: '10px 0'
    },
    dialogAction: {
        padding: '40px'
    }
});

function DialogForm(props: IDialogForm): ReactElement {

    const classes = useStyles();
    const [data, setData] = useState<ITodo>(initialFormData);

    const submit = (): void => {
      props.submitEvent(data);
      setData(initialFormData);
    };

    const removeData = (): void => {
        console.log(data);
        props.deleteEvent(data);
    }

    const onValueChange = (key: string, value: string): void => {
        let newVal = {...data};
        newVal[key] = value;
        setData(newVal);
    };

    const onStatusChange = (evt): void  => {
        onValueChange('status', evt.target.value);
    };

    const renderStatusList = () => {
        const statusList = StatusUtil.list();
        return (
            <Select
                labelId="status"
                id="statust"
                value={data.status}
                onChange={onStatusChange}
                className={classes.fieldInput}
            >
                {statusList.map(stat => {
                    return <MenuItem value={stat}>{StatusUtil.title(stat)}</MenuItem>;
                })}
            </Select>
        );
    };

    useEffect(() => {
        const d = props.formData ? props.formData : initialFormData;
        setData(d);
    }, [props.formData])


    return (
        <Dialog open={props?.open} onClose={props.closeEvent} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Todo</DialogTitle>
            <DialogContent>
                <TextField label='Subject' value={data.subject} className={classes.fieldInput} required={true}
                           onChange={ (evt) => { onValueChange('subject', evt.target.value) } }/>
                <TextField label='Details' value={data.details} className={classes.fieldInput} required={true}
                           onChange={ (evt) => { onValueChange('details', evt.target.value) } }/>
                {renderStatusList()}
            </DialogContent>
            <DialogActions className={classes.dialogAction}>
                <Button onClick={props.closeEvent} color="primary">
                    Cancel
                </Button>
                <Button onClick={removeData} style={{'display' : !!data.id ? 'initial' : 'none'}} variant="contained" color="secondary">
                    Delete
                </Button>
                <Button onClick={submit} disabled={!data.subject || !data.details} variant="contained" color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}
export default DialogForm;
