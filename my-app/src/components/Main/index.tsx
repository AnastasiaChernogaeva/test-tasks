import { FC, DragEvent, useState } from 'react';
import TaskItem from "./components/Task";
import Typography from '@mui/material/Typography';
import { Box, Container} from '@mui/material';

type Task = {
    id: number;
    taskName: string;
    taskDescription: string;
    taskStatus: boolean;
    order: number;
};

const DEFAULT_TASK = { order: 0, id: 0 };

interface MainProps {    
    tasks: Array<Task>;
    deleteTask: (id:  Task['id']) => void;
    changeTaskStatus: (id:  Task['id']) => void;
    setTasksOrder: (currentTask: Omit<Task, 'taskName' | 'taskStatus' | 'taskDescription'>, dropTask: Task ) => void;
}

const Main: FC<MainProps> = ({ 
    tasks, 
    deleteTask, 
    changeTaskStatus,
    setTasksOrder
}) => {
    const [currentTask, setCurrentTask] = useState({id: 0, order: 0});


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

    const sortTasks = (a: Task, b: Task) => {
        if (a.order > b.order) {
            return 1;
        } else {
            return -1;
        }
    };

 return (
    <div className="header">
        <Box>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                { tasks.length ? 
                    tasks.sort(sortTasks).map((task) => 
                            <TaskItem
                                key={task.id}
                                task={task}
                                deleteTask={deleteTask}
                                changeTaskStatus={changeTaskStatus}
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