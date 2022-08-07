import React from 'react';
import { Typography } from '@mui/material';

export interface LocaleTimeProps {
	timestamp: number;
}

export default function LocaleTime(props: LocaleTimeProps) {
	return (<>
		<Typography>
			{new Date(props.timestamp * 1000).toLocaleString()}
		</Typography>
	</>);
}
