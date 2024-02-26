import Header from "./components/Header";
import Main from "./components/Main/index";
import { Container, Card, CardHeader } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { updateAmount } from "./store/tasksSlice";
import './App.css';


type Task = {
  id: number;
  taskName: string;
  taskDescription: string;
  taskStatus: boolean;
  order: number;
};

const App = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: any) => state.tasks.tasks);
  const addMode = useSelector((state: any) => state.tasks.addingMode);


  useEffect(() => {
    dispatch(updateAmount());
  }, [tasks]);

  return (
    <div className="App">
      <Container maxWidth="sm">
          <CardHeader/>
          <Card sx={{bgcolor: "#B0C4DE"}}>
              <CardHeader/>
              <Header/>
              {!addMode && <Main/>}
          </Card>
      </Container>
    </div>
  );
}

export default App;
