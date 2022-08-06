import React, { useEffect, useState } from 'react';
import { PartialMessageFilterOptions } from '../../types';
import { Grid, TextField } from '@mui/material';

export interface BotFilterProps {
	onValueChange: (x: PartialMessageFilterOptions) => void;
}

export default function BotFilter(props: BotFilterProps) {
	const [value, setValue] = useState('');

	const updateValue = () => {
		console.log(value);
		if (value.length > 0) {
			try {
				const id = Number(value);
				props.onValueChange({bot: id});
			} catch (_) { }
		}
	};

	useEffect(() => {
		const t = setTimeout(updateValue, 350);
		return () => clearTimeout(t);
	}, [value]);

	return (<>
		<Grid item xs={3}>
			<TextField id={'ipt-bot-id'} label={'机器人 QQ 号'} fullWidth inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} value={value} onChange={(e) => {setValue(e.target.value);}} />
		</Grid>
	</>);
}
