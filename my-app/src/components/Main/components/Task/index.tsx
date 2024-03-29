import { Container, Paper, Typography, Box, Grid, IconButton, Tooltip, Switch, Stack }  from '@mui/material';
import DeleteOutlinedIcon  from '@mui/icons-material/DeleteOutlined';
import { FC, DragEvent } from 'react';
import { useDispatch } from 'react-redux';
import {deleteTask, changeTaskStatus} from '../../../../store/tasksSlice'

type Task = {
    id: number;
    taskName: string;
    taskDescription: string;
    taskStatus: boolean;
    order: number;
}; 

interface TaskProps {
    task: Task;
    dragStartHandler: (e: DragEvent<HTMLDivElement>, task: Task) => void;
    dragEndHandler: (e: DragEvent<HTMLDivElement>) => void; 
    dragOverHandler: (e: DragEvent<HTMLDivElement>) => void;
    dropHandler: (e: DragEvent<HTMLDivElement>, task: Task) => void;
}
     
  
const TaskItem: FC<TaskProps> = ({
    task,
    dragStartHandler,
    dragEndHandler,
    dragOverHandler,
    dropHandler,
  }) =>{
    const dispatch = useDispatch();
    const remove = (id: number) => dispatch(deleteTask({id}));
    const changeStatus = (id: number) => dispatch(changeTaskStatus({id}));

  return (
     <div>
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper 
            variant="outlined" 
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}        
            onDragStart={(e) => dragStartHandler(e, task)}
            onDragLeave={(e) => dragEndHandler(e)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e, task)}
            draggable={true} 
            className="grab"
        >
            <Grid container spacing={2}>                   
                <Grid item xs={12}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex'}}>
                        <Typography component="h1" variant="h6" align="left" sx={{ flex: 1 }}>
                           {task.taskName}
                        </Typography>
                        
                        <Stack direction="row" spacing={1} alignItems="center" auto-focus='none'>
                            <Typography auto-focus='none'>{task.taskStatus ? 'Выполнено' : 'Не выполнено'}</Typography>
                            <Switch checked={task.taskStatus} onChange={() => changeStatus(task.id)}/>
                        </Stack>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle1" align="left">{task.taskDescription}</Typography>
                </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Tooltip title="Удалить"
                    onClick={()=>remove(task.id)}>
                <IconButton 
                    color="error"
                    type="button" sx={{ p: '10px' }} aria-label="delete"
                    >
                    <DeleteOutlinedIcon
                        onClick={()=>remove(task.id)} />
                </IconButton>
            </Tooltip>
            </Box>
        </Paper>
        </Container>
    </div>
 )
}

export default TaskItem;