import React, { useEffect, useState } from 'react';
import { PartialMessageFilterOptions } from '../../types';
import { Grid, TextField } from '@mui/material';

export interface GroupMessageFilterProps {
	onValueChange: (x: PartialMessageFilterOptions) => void;
}

export default function GroupMessageFilter(props: GroupMessageFilterProps) {
	const [botId, setBotId] = useState('');
	const [groupId, setGroupId] = useState('');

	const updateValue = () => {
		console.log(botId);
		if (botId.length > 0 && groupId.length > 0) {
			try {
				const id = Number(botId);
				const gid = Number(groupId);
				props.onValueChange({bot: id, group: gid});
			} catch (_) { }
		}
	};

	useEffect(() => {
		const t = setTimeout(updateValue, 350);
		return () => clearTimeout(t);
	}, [botId]);

	return (<>
		<Grid item xs={3}>
			<TextField id={'ipt-bot-id'} label={'机器人 QQ 号'} fullWidth inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} value={botId} onChange={(e) => {setBotId(e.target.value);}} />
		</Grid>
		<Grid item xs={3}>
			<TextField id={'ipt-group-id'} label={'群号'} fullWidth inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} value={botId} onChange={(e) => {setGroupId(e.target.value);}} />
		</Grid>
	</>);
}
