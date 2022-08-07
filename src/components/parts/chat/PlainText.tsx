import React from 'react';
import { Typography } from '@mui/material';

export interface PlainTextProps {
	content: string;
}

export default function PlainText(props: PlainTextProps) {
	return (<>
		<Typography>{props.content}</Typography>
	</>);
}
