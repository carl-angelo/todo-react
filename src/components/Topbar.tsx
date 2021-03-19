import React, {ReactElement} from "react";
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, InputBase, Button} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import {ITopbar} from "../interfaces/ITopbar";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
        rightSide: {
            marginLeft: 'auto'
        }
    }),
);

function Topbar(props: ITopbar): ReactElement {
    const classes = useStyles();

    const handleSearch = (evt) => {
        props.searchKey(evt.target.value);
    }

    return (
        <AppBar>
            <Toolbar>
                <Typography className={classes.title} variant="h6" noWrap>
                    Todo App
                </Typography>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        onKeyUp={handleSearch}
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
                <div className={classes.rightSide}>
                    <Button variant="contained" onClick={ () => { props.menuEvent() } }>Create new</Button>
                </div>
            </Toolbar>
        </AppBar>
    );
}
export default Topbar;
