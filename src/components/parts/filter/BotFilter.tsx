import React, { useEffect, useState } from 'react';
import { PartialMessageFilterOptions } from '../../../types';
import { Autocomplete, Grid, TextField } from '@mui/material';
import { fetchKnownBots } from '../../../logic/Routes';

export interface BotFilterProps {
	onValueChange: (x: PartialMessageFilterOptions) => void;
}

export default function BotFilter(props: BotFilterProps) {
	const [value, setValue] = useState('');
	const [textValue, setTextValue] = useState('');
	const [knownBots, setKnownBots] = useState<Array<string>>([]);
	const onValueChange = props.onValueChange;

	useEffect(() => {
		fetchKnownBots().then(data => setKnownBots(data.map(it => it.toString())));
	}, []);

	return (<>
		<Grid item xs={3}>
			<Autocomplete
				value={value}
				inputValue={textValue}
				onChange={(_, newValue) => {
					const resolvedNewValue = newValue == null ? '' : newValue;
					setValue(resolvedNewValue);
					try {
						if (resolvedNewValue.length > 0) {
							const id = Number(resolvedNewValue);
							onValueChange({
								bot: id
							});
						}
					} catch (_) { }
				}}
				onInputChange={(_, value) => {
					setTextValue(value);
				}}
				renderInput={(params) => <TextField {...params} label={'机器人 QQ 号'} />}
				options={knownBots} />
		</Grid>
	</>);
}
