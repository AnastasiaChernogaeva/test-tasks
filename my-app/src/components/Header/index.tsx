import { FC } from 'react';
import SearchEngine from "./components/SearchEngine";
import Typography from '@mui/material/Typography';
import { Box, Container} from '@mui/material';

type Task = {
    id: number;
    taskName: string;
    taskDescription: string;
    taskStatus: boolean;
    order: number;
};

const Header: FC = () => { 
 return (
    <div className="header">
        <Box>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Задачи
                </Typography>
                <SearchEngine/>
            </Container>
        </Box> 
    </div>
 )
}

export default Header;