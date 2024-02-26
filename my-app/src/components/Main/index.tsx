import { FC, DragEvent, useState } from 'react';
import TaskItem from "./components/Task";
import Typography from '@mui/material/Typography';
import { Box, Container} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { updateTasksOrder } from '../../store/tasksSlice';

type Task = {
    id: number;
    taskName: string;
    taskDescription: string;
    taskStatus: boolean;
    order: number;
};


const Main: FC = () => {
    const defaultTask = useSelector((state: any) => state.tasks.default_task);
    const tasks = useSelector((state: any) => state.tasks.tasks);
    const dispatch = useDispatch();
    const setTasksOrder = (currentTask: Task, dropTask: Task) => dispatch(updateTasksOrder({currentTask, dropTask}))
    const [currentTask, setCurrentTask] = useState(defaultTask);


    const dragStartHandler = (e: DragEvent<HTMLDivElement>, task: Task) => {
        setCurrentTask(task);
    };

    const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {
        e.currentTarget.style.background ='white';
    };

    const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.currentTarget.style.background = '#ede5dd';
    };

    const dropHandler = (e: DragEvent<HTMLDivElement>, dropTask: Task) => {
        e.preventDefault();
        setTasksOrder(currentTask, dropTask);  
        e.currentTarget.style.background ='white';
    };


 return (
    <div className="header">
        <Box>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                { tasks.length ? 
                    tasks.map((task: Task) => 
                            <TaskItem
                                key={task.id}
                                task={task}
                                dragStartHandler={dragStartHandler}
                                dragEndHandler={dragEndHandler}
                                dragOverHandler={dragOverHandler}
                                dropHandler={dropHandler}
                            />
                    ) :                    
                    <Typography component="h1" variant="subtitle1">
                        Задач нет...
                    </Typography>                     
                }
            </Container>
        </Box> 
    </div>
 )
}

export default Main;