import { FC, MouseEvent, useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AddOutlined from '@mui/icons-material/AddOutlined';
import AddingTaskForm from '../AddingTaskForm';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { Typography, Container } from '@mui/material';

import { useSelector, useDispatch } from "react-redux";
import {filterTasks, searchTask, setAddingMode} from '../../../../store/tasksSlice';

type Task = {
    id: number;
    taskName: string;
    taskDescription: string;
    taskStatus: boolean;
    order: number;
};



const SearchEngine: FC = () => {
  const amountCompletedTasks = useSelector((state: any) => state.tasks.amountCompletedTasks);
  const amountUncompletedTasks = useSelector((state: any) => state.tasks.amountUncompletedTasks);
  const addMode = useSelector((state: any) => state.tasks.addingMode);
  const dispatch = useDispatch();

  // const [filterType, setFilterType] = useState<string>('All');
  const [searchText, setSearchText] = useState<string>('');

  const onChange = (text: string) => {
    dispatch(searchTask({searchText: text}));
    setSearchText(text);
  };

  const onClick = () => {
    dispatch(searchTask({searchText: searchText}));
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  const handleClose = (type: string) => {
    dispatch(filterTasks({filterType: type}));
    // setFilterType(type);
    setAnchorEl(null);
  };
  
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
    <Box>
       <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
        >
        <IconButton sx={{ p: '10px' }} aria-label="menu"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
        >
            <MenuIcon />
        </IconButton>
        <Menu
            anchorEl={anchorEl}
            open={open}
        >                
                <MenuItem onClick={() => handleClose('Add')} value="Add">Все</MenuItem>
                <MenuItem onClick={() => handleClose('Done')} value="Done">Выполненные</MenuItem>
                <MenuItem onClick={() => handleClose('Undone')} value="Undone">Невыполненные</MenuItem>
         </Menu>


        <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Поиск"
            inputProps={{ 'aria-label': 'search engine' }}
            onChange={(event) => onChange(event.target.value)}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon onClick={onClick}/>
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: '10px' }} aria-label="add" disabled={addMode}>
            <AddOutlined  onClick={()=>dispatch(setAddingMode(true))} />
        </IconButton>
        </Paper>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex'}}>
            <Typography component="h1" variant="subtitle1" align="left" sx={{ flex: 1 }}>
               Выполнено: {amountCompletedTasks}
            </Typography>
            <Typography component="h1" variant="subtitle1" align="right" sx={{ flex: -1 }}>
              Не выполнено: {amountUncompletedTasks}
            </Typography>
        </Box>

        <Box>        
            {addMode && <AddingTaskForm/>}
        </Box>
      </Container>
      </Box>
    </div>
  );
}

export default SearchEngine;