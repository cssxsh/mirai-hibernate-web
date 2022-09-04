import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import DynamicFormIcon from '@mui/icons-material/DynamicForm';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import { useCallback, useState } from 'react';
import { Grid } from '@mui/material';
import { MessageRecord } from '../types';
import MessageEntry from './MessageEntry';
import FilterControl from './FilterControl';

const theme = createTheme();

export default function ChatRoom() {
    const [messages, setMessages] = useState<MessageRecord[]>([]);
    const setMessagesCallback = useCallback((xs: MessageRecord[]) => {
        setMessages(xs);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="fixed">
                <Toolbar>
                    <DynamicFormIcon sx={{mr: 2}} />
                    <Typography variant="h6" color="inherit" noWrap>
                        历史消息浏览
                    </Typography>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <Container sx={{py: 2}}>
                <Grid container direction={'column'}>
                    <Grid item sx={{py: 1}}>
                        <FilterControl setMessages={setMessagesCallback} />
                    </Grid>
                    {messages.map((message, index) => <MessageEntry {...message} key={index} />)}
                    <Grid item>
                        <Grid container direction={'row'} justifyContent={'center'}>
                            <Grid item>
                                <Typography>
                                    This is the end.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
}
