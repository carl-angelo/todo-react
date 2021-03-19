import React, {useEffect, useState} from 'react';
import '../App.css';
import firebase from "../config/firebase";
import {refs} from "../constants/refs";
import {ITodo} from "../interfaces/ITodo";
import {Card, CardContent, Container, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {Status} from "../enums/status";
import {IHome} from "../interfaces/IHome";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        margin: '0 0 10px'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    parentCont: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    },
    childrenCont: {
        display: 'flex',
        flexDirection: 'column',
        width: '33.3333%',
        padding: '10px'
    }
});

function Home(props: IHome) {

    const classes = useStyles();
    const [data, setData] = useState<ITodo[]>([]);

    const fetchData = (search?: string): void => {
        const dbRef = firebase.firestore().collection(refs);
        let cont: ITodo[] = [];
        dbRef.get().then(snapshot => {
            snapshot.forEach(doc => {
                const value = doc.data() as ITodo;
                cont.push({
                    id: doc.id,
                    subject: value.subject,
                    details: value.details,
                    status: value.status
                });
            });
            if (!!search) {
                cont = cont.filter(f => f.subject && f.subject.includes(search));
            }
            setData(cont);
        });
    };

    const saveData = (data: ITodo): void => {
        const dbRef = firebase.firestore().collection(refs);
        if (data.id) {
            dbRef.doc(data?.id).update({
                subject: data.subject,
                details: data.details,
                status: data.status
            }).then(() => fetchData());
        } else {
            dbRef.add(data).then(() => fetchData());
        }
    }

    const deleteData = (data: ITodo): void => {
        const dbRef = firebase.firestore().collection(refs);
        if (data.id) {
            dbRef.doc(data.id).delete()
                .then(() => fetchData());
        }
    };

    const onDragEnd = (result): void => {
        if (result) {
            const value = [...data]?.find(f => f.id === result.draggableId);
            if (value && value.status) {
                value.status = result.destination.droppableId;
                saveData(value);
            }
        }
    };

    const cardDoubleClick = (data: ITodo) => {
        props.openCard(data);
    }

    const renderData = (status: Status) => {
        return (
            data && data.map((d, index) => {
                return (
                    d.status === status &&
                    <Draggable key={d.id} draggableId={d.id} index={index}>
                        {(provided) => {
                                return (
                                    <Card ref={provided.innerRef}
                                          {...provided?.draggableProps}
                                          {...provided?.dragHandleProps}
                                          className={classes.root}
                                          onDoubleClick={() => cardDoubleClick(d)}
                                    >
                                        <CardContent>
                                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                {d.subject}
                                            </Typography>
                                            <Typography variant="h5" component="h2">
                                                {d.details}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                );
                            }
                        }
                    </Draggable>
                );
            })
        );
    };

    useEffect(() => {
        if (props && props.deleteData) {
            deleteData(props.deleteData);
        }
    } ,[props.deleteData])

    useEffect(() => {
        if (props && props.newData) {
            saveData(props.newData);
        }
    } ,[props.newData])

    useEffect(() => {
        if (props && !!props.search) {
            fetchData(props.search);
        } else {
            fetchData();
        }
    }, [props.search])

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <Container style={{'marginTop': '70px'}} maxWidth="xl">
            <div className={classes.parentCont}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId={Status.UNSTARTED}>
                        {(provided) => {
                                return (
                                    <div ref={provided.innerRef} className={classes.childrenCont}>
                                        <h4> Unstarted </h4>
                                        {renderData(Status.UNSTARTED)}
                                    </div>
                                );
                            }
                        }
                    </Droppable>
                    <Droppable droppableId={Status.IN_PROGRESS}>
                        {(provided) => {
                            return (
                                <div ref={provided.innerRef} className={classes.childrenCont}>
                                    <h4> In Progress </h4>
                                    {renderData(Status.IN_PROGRESS)}
                                </div>
                            );
                        }
                        }
                    </Droppable>
                    <Droppable droppableId={Status.COMPLETED}>
                        {(provided) => {
                            return (
                                <div ref={provided.innerRef} className={classes.childrenCont}>
                                    <h4> Completed </h4>
                                    {renderData(Status.COMPLETED)}
                                </div>
                            );
                        }
                        }
                    </Droppable>
                </DragDropContext>
            </div>
        </Container>
    );
}

export default Home;
