import React from 'react';
import { PartialMessageFilterOptions } from '../../types';
import { Grid, TextField } from '@mui/material';

export interface BotFilterProps {
	onValueChange: (x: PartialMessageFilterOptions) => void;
}

export default function BotFilter(props: BotFilterProps) {
	return (<>
		<Grid item xs={3}>
			<TextField id={'ipt-bot-id'} label={'机器人 QQ 号'} fullWidth />
		</Grid>
	</>);
}
