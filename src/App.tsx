import React, {useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Topbar from "./components/Topbar";
import DialogForm from "./components/DialogForm";
import {ITodo} from "./interfaces/ITodo";

function App() {
  const [dialogState, setDialogState] = useState<boolean>(false);
  const [newData, setNewData] = useState<ITodo|undefined>();
  const [editData, setEditData] = useState<ITodo>();
  const [deleteData, setDeleteData] = useState<ITodo>();

  const handleMenuEvent = () => {
      setEditData(undefined);
      setDialogState(true);
  }

  const handleSubmitForm = (param: ITodo) => {
      setNewData(param);
      setDialogState(false);
  }

  const handleOpenCard = (data: ITodo) => {
      console.log('handleOPenCard', data);
      setEditData(data);
      setDialogState(true);
  }

  const handleDelete = (data: ITodo) => {
      setDeleteData(data);
      setDialogState(false);
  }

  return (
      <>
        <DialogForm
            formData={editData}
            open={dialogState}
            submitEvent={handleSubmitForm}
            deleteEvent={handleDelete}
            closeEvent={ () => setDialogState(false)}/>
        <Topbar menuEvent={handleMenuEvent}/>
        <Router>
          <Switch>
            <Route path="/"> <Home newData={newData} deleteData={deleteData} openCard={handleOpenCard}/> </Route>
          </Switch>
        </Router>
      </>
  );
}

export default App;
