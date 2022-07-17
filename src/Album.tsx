import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import {createTheme, Theme, ThemeProvider} from '@mui/material/styles';
import ChipInput from '@sarakusha/material-ui-chip-input';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import RedoIcon from '@mui/icons-material/Redo';
import {useEffect, useState} from "react";


function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

type Face = {
    md5: string,
    code: string,
    content: string,
    url: string,
    height: string,
    width: string,
    disable: boolean,
}

type FaceTag = {
    id: number
    md5: string,
    tag: string,
}

const random = async () => {
    const response = await fetch("/face/random");
    const data = await response.json()

    return data as Face
}

const disable = async (md5: string) => {
    const response = await fetch(`/face/disable?md5=${md5}`, {
        method: "PUT"
    });
    const data = await response.json()

    return data as Face
}

const getTag = async (md5: string) => {
    const response = await fetch(`/face/tag?md5=${md5}`);
    const data = await response.json()

    return data as FaceTag[]
}

const putTag = async (md5: string, tag: string) => {
    const response = await fetch(`/face/tag?md5=${md5}&tag=${tag}`, {
        method: "PUT"
    });
    const data = await response.json()

    return data as FaceTag[]
}

const deleteTag = async (md5: string, tag: string) => {
    const response = await fetch(`/face/tag?md5=${md5}&tag=${tag}`, {
        method: "DELETE"
    });
    const data = await response.json()

    return data as FaceTag[]
}

export default function Album() {
    const [face, loadFace] = useState<Face>({
        md5: "error", code: "", content: "", disable: true, height: "", url: "", width: "",
    });
    const [tags, loadTag] = useState<FaceTag[]>([{
        id: 0,
        md5: "error",
        tag: "error"
    }]);

    useEffect(() => {
        random().then(record => loadFace(record))
    }, []);

    useEffect(() => {
        getTag(face.md5).then(record => loadTag(record))
    }, [face]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <CameraIcon sx={{ mr: 2 }} />
                    <Typography variant="h6" color="inherit" noWrap>
                        表情包审核
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                <Container sx={{ py: 8 }} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        <Card
                            sx={(theme) => (
                                {
                                    width: '50%', display: 'flex', flexDirection: 'column',
                                    [theme.breakpoints.down('md')]: {
                                        width: '100%',
                                        height: '50%'
                                    },
                                }
                            )}
                        >
                            <CardMedia
                                component="img"
                                //"https://source.unsplash.com/random"
                                image={face.url}
                                alt={face.md5}
                            />
                        </Card>
                        <Card
                            sx={(theme) => (
                                {
                                    width: '50%', display: 'flex', flexDirection: 'column',
                                    [theme.breakpoints.down('md')]: {
                                        width: '100%',
                                        height: '50%'
                                    },
                                }
                            )}
                        >
                            <CardActions>
                                <IconButton aria-label="delete" disabled={face.disable} onClick={() => disable(face.md5).then(record => loadFace(record))}>
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton aria-label="flush" onClick={() => getTag(face.md5).then(record => loadTag(record))}>
                                    <RefreshIcon />
                                </IconButton>
                                <IconButton aria-label="redo" onClick={() => random().then(record => loadFace(record))}>
                                    <RedoIcon />
                                </IconButton>
                            </CardActions>
                            <CardActions>
                                <ChipInput value={tags.map(tag => tag.tag)}
                                           onDelete={(tag) => deleteTag(face.md5, tag).then(record => loadTag(record))}
                                           onAdd={(tag) => putTag(face.md5, tag).then(record => loadTag(record))}
                                />
                            </CardActions>
                        </Card>
                    </Grid>
                </Container>
            </main>
            {/* Footer */}
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    Footer
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    Something here to give the footer a purpose!
                </Typography>
                <Copyright />
            </Box>
            {/* End footer */}
        </ThemeProvider>
    );
}