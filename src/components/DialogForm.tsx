import React, {ReactElement, useCallback, useEffect, useState} from "react";
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem} from '@material-ui/core';
import {IDialogForm} from "../interfaces/IDialogForm";
import {ITodo} from "../interfaces/ITodo";
import {initialFormData} from "../constants/initialFormData";
import {StatusUtil} from "../util/status-util";
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";
import {dataMuseAPI} from "../constants/refs";
import {IDataMuse} from '../interfaces/IDataMuse';

const useStyles = makeStyles({
    fieldInput: {
        display: 'flex',
        width: '300px',
        margin: '10px 0'
    },
    dialogAction: {
        padding: '40px'
    },
    textCont: {
        position: 'relative'
    },
    suggestions: {
        zIndex: 1,
        top: 48,
        left: 0,
        position: 'absolute',
        overflow: 'scroll',
        height: '50px',
        backgroundColor: 'white',
        width: '100%',
        border: '1px solid #949494',
        borderTop: 0
    },
    ul: {
        listStyleType: 'none',
        margin: 0,
        padding: '5px 10px'
    },
});

function DialogForm(props: IDialogForm): ReactElement {

    const classes = useStyles();
    const [data, setData] = useState<ITodo>(initialFormData);
    const [suggestions, setSuggestions] = useState<IDataMuse[]>([]);

    const submit = (): void => {
        props.submitEvent(data);
        setData(initialFormData);
    };

    const removeData = (): void => {
        props.deleteEvent(data);
    }

    const onValueChange = (key: string, value: string): void => {
        let newVal = {...data};
        newVal[key] = value;
        if (key === 'details') breakWords(value);
        setData(newVal);
    };

    const breakWords = (words: string): void => {
        const arr = [...words.split(' ')];
        if (arr && !!arr.length) {
            const lastWord = arr[arr.length - 1];
            if (!!lastWord) {
                axios.get<IDataMuse[]>(`${dataMuseAPI}${lastWord}`)
                    .then(res => {
                        setSuggestions(res.data);
                    });
            }
        }
    }

    const onStatusChange = (evt): void  => {
        onValueChange('status', evt.target.value);
    };

    const renderStatusList = () => {
        const statusList = StatusUtil.list();
        return (
            <Select
                labelId="status"
                id="status"
                value={data.status}
                onChange={onStatusChange}
                className={classes.fieldInput}
            >
                {statusList.map((stat, index) => {
                    return <MenuItem key={index} value={stat}>{StatusUtil.title(stat)}</MenuItem>;
                })}
            </Select>
        );
    };

    const handleWordSelected = (word: string): void => {
        const detail = data.details;
        const arr = detail.split(' ');
        arr[arr.length - 1] = word;
        const newWord = arr.join(' ');
        setData({
            ...data,
            details: newWord
        })
        setSuggestions([]);
    }

    const handleBlur = () => {
        setTimeout(() => {
            setSuggestions([]);
        }, 1000);
    }

    const renderSuggestions = useCallback(() => {
        return (
            suggestions && !!suggestions.length &&
            <div className={classes.suggestions}>
                <ul className={classes.ul}>
                    {suggestions.map((s, i) => {
                        return <li className='keys' onClick={ () => { handleWordSelected(s.word) }} key={i}> {s.word} </li>;
                    })}
                </ul>
            </div>
        );
    }, [suggestions]);


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
                <div className={classes.textCont}>
                    <TextField label='Details' value={data.details} className={classes.fieldInput} required={true}
                               onBlur={ () => { handleBlur() } }
                           onChange={ (evt) => { onValueChange('details', evt.target.value) } }/>
                    {renderSuggestions()}
                </div>
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
