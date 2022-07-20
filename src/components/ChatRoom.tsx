import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import DynamicFormIcon from '@mui/icons-material/DynamicForm';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, Theme, ThemeProvider} from '@mui/material/styles';
import {useEffect, useState} from "react";
import {Autocomplete, Avatar, Box, Card, Grid, Link, Paper, Stack, TextField} from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

type MessageRecord = {
    id: number
    bot: number
    fromId: number
    targetId: number
    ids: string | null,
    internalIds: string | null
    time: number
    kind: string
    code: string
    recall: boolean
}

type PlainText = {
    type: string,
    content: string
}

type Image = {
    type: string,
    imageId: string
}

type At = {
    type: string,
    target: number
}

const theme = createTheme();

const Send = function (message: MessageRecord) {
    const chain = JSON.parse(message.code) as [PlainText | Image | At]
    return (
        <Grid container spacing={2}>
            <Grid item xs={1}>
                <Avatar sx={{width: "100%", height: "auto"}}
                        src={`https://q.qlogo.cn/g?b=qq&nk=${message.fromId}&s=640`} />
            </Grid>
            <Grid item xs={10}>
                <Stack>
                    <Box sx={{textAlign: "left"}}>{message.fromId}</Box>
                    <Paper>{chain.map((item, index) => {
                        switch (item.type) {
                            case "PlainText":
                                return (item as PlainText).content
                            case "Image":
                                const id = (item as Image).imageId
                                const match = id.substring(1, 37).replaceAll("-", "")
                                return <img key={index}
                                            src={`https://gchat.qpic.cn/gchatpic_new/${message.fromId}/${message.targetId}-0-${match}/0?term=3`}
                                            alt={id} />
                            case "At":
                                const target = (item as At).target
                                return <Link href="#" underline="always">{`@${target}`}</Link>
                            default:
                                return `[${item.type}]`
                        }
                    })}</Paper>
                </Stack>
            </Grid>
        </Grid>
    )
}

const bot = async function (bot: number, start: number, end: number) {
    const response = await fetch(`/message/bot?bot=${bot}&start=${start}&end=${end}`);
    const data = await response.json()

    return data as MessageRecord[]
}

const group = async function (bot: number, group: number, start: number, end: number) {
    const response = await fetch(`/message/group?bot=${bot}&group=${group}&start=${start}&end=${end}`);
    const data = await response.json()

    return data as MessageRecord[]
}

const friend = async function (bot: number, friend: number, start: number, end: number) {
    const response = await fetch(`/message/group?bot=${bot}&friend=${friend}&start=${start}&end=${end}`);
    const data = await response.json()

    return data as MessageRecord[]
}

const member = async function (bot: number, group: number, member: number, start: number, end: number) {
    const response = await fetch(`/message/member?bot=${bot}&group=${group}&member=${member}&start=${start}&end=${end}`);
    const data = await response.json()

    return data as MessageRecord[]
}

const kind = async function (kind: string, start: number, end: number) {
    const response = await fetch(`/message/kind?kind=${kind}&start=${start}&end=${end}`);
    const data = await response.json()

    return data as MessageRecord[]
}

type SearchOption = {
    label: string;
    load: Function;
}

const SearchOptions: SearchOption[] = [
    {label: "KIND", load: kind},
    {label: "BOT", load: bot},
    {label: "GROUP", load: group}
]

export default function ChatRoom() {
    const [messages, loadMessage] = useState<MessageRecord[]>([]);
    const [option, setOption] = useState<SearchOption>(SearchOptions[0]);
    const [botId, setBot] = useState<number>(123456);
    const [groupId, setGroup] = useState<number>(123456);
    const [source, setSource] = useState<string>("GROUP");

    const [start, setStart] = useState<Date>(new Date(Date.now() - 60 * 60 * 1000));
    const [end, setEnd] = useState<Date>(new Date());

    useEffect(() => {
        switch (option.label) {
            case "BOT":
                if (botId === 123456) return;
                bot(botId, Math.floor(start.getTime() / 1000), Math.floor(end.getTime() / 1000))
                    .then(record => loadMessage(record))
                return;
            case "GROUP":
                if (botId === 123456) return;
                if (groupId === 123456) return;
                group(botId, groupId, Math.floor(start.getTime() / 1000), Math.floor(end.getTime() / 1000))
                    .then(record => loadMessage(record))
                return;
            case "KIND":
                kind(source, Math.floor(start.getTime() / 1000), Math.floor(end.getTime() / 1000))
                    .then(record => loadMessage(record))
                return;
            default:
                return;
        }
    }, [botId, groupId, option]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <DynamicFormIcon sx={{mr: 2}} />
                    <Typography variant="h6" color="inherit" noWrap>
                        历史消息浏览
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                <Container sx={{py: 8}}>
                    <Paper>
                        <Stack spacing={2}>
                            <Toolbar>
                                <Autocomplete
                                    disablePortal
                                    id="search"
                                    options={SearchOptions}
                                    defaultValue={option}
                                    sx={{width: "15%"}}
                                    onChange={(event, option) => {
                                        if (option != null) setOption(option)
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Type" />}
                                />
                                <TextField
                                    id="bot-id"
                                    label="Bot"
                                    defaultValue={botId}
                                    onChange={(event) => {
                                        const id = Number.parseInt(event.target.value)
                                        if (!isNaN(id)) setBot(id)
                                    }}
                                    sx={{
                                        display: (option.label === "KIND") ? "none" : undefined
                                    }}
                                    disabled={option.label === "KIND"}
                                    inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                                />
                                <Autocomplete
                                    disablePortal
                                    id="kind"
                                    options={["GROUP", "FRIEND", "TEMP", "STRANGER"]}
                                    defaultValue={source}
                                    sx={{
                                        width: "15%",
                                        display: (option.label !== "KIND") ? "none" : undefined
                                    }}
                                    onChange={(event, option) => {
                                        if (option != null) setSource(option)
                                    }}
                                    hidden={option.label !== "KIND"}
                                    disabled={option.label !== "KIND"}
                                    renderInput={(params) => <TextField {...params} label="Kind" />}
                                />
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    label="start"
                                    value={start}
                                    onChange={(date) => {
                                        if (date != null) setStart(date)
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                                <DateTimePicker
                                    label="end"
                                    value={end}
                                    onChange={(date) => {
                                        if (date != null) setEnd(date)
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                                </LocalizationProvider>
                            </Toolbar>
                            {messages.map((message, index) => <Send {...message} key={index} />)}
                        </Stack>
                    </Paper>
                </Container>
            </main>
        </ThemeProvider>
    );
}