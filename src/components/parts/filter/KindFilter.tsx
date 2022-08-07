import React, { useState } from 'react';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { MessageKindType, PartialMessageFilterOptions } from '../../../types';

interface KindOption {
	label: string;
	value: MessageKindType;
}

const KindOptions: KindOption[] = [
	{label: '群消息', value: MessageKindType.GroupMessages},
	{label: '好友消息', value: MessageKindType.FriendMessages},
	{label: '群临时会话', value: MessageKindType.GroupDirectMessage},
	{label: '陌生人消息', value: MessageKindType.StrangerDirectMessage},
];

function toKindOptionType(s: string): MessageKindType {
	const coercedOptionType = MessageKindType as any;
	for (let k in coercedOptionType) {
		if (coercedOptionType[k] === s) {
			return coercedOptionType[k] as MessageKindType;
		}
	}
	return MessageKindType.GroupMessages;
}

export interface KindFilterProps {
	onValueChange: (x: PartialMessageFilterOptions) => void;
}

export default function KindFilter(props: KindFilterProps) {
	const [value, setValue] = useState(MessageKindType.GroupMessages);

	return (<>
		<Grid item xs={2}>
			<FormControl fullWidth>
				<InputLabel id={'lbl-filter-type'}>消息类型</InputLabel>
				<Select labelId={'lbl-filter-type'} id={'filter-type'} value={value} label={'消息类型'}
						onChange={(event) => {
							const filterType = toKindOptionType(event.target.value);
							setValue(filterType);
							props.onValueChange({kind: filterType});
						}}>
					{KindOptions.map((it, index) => <MenuItem key={index} value={it.value}>{it.label}</MenuItem>)}
				</Select>
			</FormControl>
		</Grid>
	</>);
}
