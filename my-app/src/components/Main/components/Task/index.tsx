import { Container, Paper, Typography, Box, Grid, IconButton, Tooltip, Switch, Stack }  from '@mui/material';
import DeleteOutlinedIcon  from '@mui/icons-material/DeleteOutlined';
import { FC } from 'react';

type Task = {
    id: number;
    taskName: string;
    taskDescription: string;
    taskStatus: boolean;
}; 

interface TaskProps {
    task: Task;
    deleteTask: (id: Task['id']) => void;
    changeTaskStatus: (id: Task['id']) => void;
}
     
  
const TaskItem: FC<TaskProps> = ({
    task,
    deleteTask,
    changeTaskStatus
  }) =>{
  return (
     <div>
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Grid container spacing={2}>                    
                <Grid item xs={12}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex'}}>
                        <Typography component="h1" variant="h6" align="left" sx={{ flex: 1 }}>
                           {task.taskName}
                        </Typography>
                        
                        <Stack direction="row" spacing={1} alignItems="center" auto-focus='none'>
                            <Typography auto-focus='none'>{task.taskStatus ? 'Выполнено' : 'Не выполнено'}</Typography>
                            <Switch checked={task.taskStatus} onChange={() => changeTaskStatus(task.id)}/>
                        </Stack>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle1" align="left">{task.taskDescription}</Typography>
                </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Tooltip title="Удалить" onClick={()=>deleteTask(task.id)}>
                <IconButton 
                    color="error"
                    type="button" sx={{ p: '10px' }} aria-label="delete"
                    >
                    <DeleteOutlinedIcon
                    onClick={()=>deleteTask(task.id)} />
                </IconButton>
            </Tooltip>
            </Box>
        </Paper>
        </Container>
    </div>
 )
}

export default TaskItem;