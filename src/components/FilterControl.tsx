import React, { useEffect, useState } from 'react';
import {
	FilterType,
	KindFilterType, MessageFilterOptions,
	MessageRecord,
	PartialMessageFilterOptions,
	SearchOptions,
	toFilterType,
} from '../types';
import { Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import KindFilter from './parts/KindFilter';
import { fetchMessages } from '../logic/Routes';
import { toUnixTimestamp } from '../util/DateTimeUtil';
import BotFilter from './parts/BotFilter';

const ONE_HOUR = 60 * 60 * 1000;

export interface FilterControlProps {
	setMessages: (xs: MessageRecord[]) => void;
}

export default function FilterControl(props: FilterControlProps) {
	const [filterType, setFilterType] = useState(FilterType.ByKind);
	const [fromDate, setFromDate] = useState(new Date(Date.now() - ONE_HOUR));
	const [toDate, setToDate] = useState(new Date());
	const [filterOption, setFilterOption] = useState<PartialMessageFilterOptions>({kind: KindFilterType.GroupMessages});

	let filterComponent: JSX.Element = <></>;

	const filterValueChangeHandler = (x: PartialMessageFilterOptions) => {
		setFilterOption(x);
	};

	const resetState = () => {
		setFilterType(FilterType.ByKind);
		setToDate(new Date());
		setFromDate(new Date(Date.now() - ONE_HOUR));
		setFilterOption({kind: KindFilterType.GroupMessages});
	};

	const refresh = () => {
		setToDate(new Date());
	};

	switch (filterType) {
		case FilterType.ByKind:
			filterComponent = <KindFilter onValueChange={filterValueChangeHandler} />;
			break;
		case FilterType.ByBot:
			filterComponent = <BotFilter onValueChange={filterValueChangeHandler} />;
			break;
		case FilterType.ByGroup:
			// TODO
			break;
		case FilterType.ByFriend:
			// TODO
			break;
		case FilterType.ByMember:
			// TODO
			break;
	}

	useEffect(() => {
		const options = {...filterOption, from: toUnixTimestamp(fromDate), to: toUnixTimestamp(toDate)} as MessageFilterOptions;
		fetchMessages(options)
			.then(xs => {
				props.setMessages(xs);
			}).catch(console.error);
	}, [fromDate, toDate, filterOption]);

	return (<>
		<Paper sx={{padding: 1}}>
			<Grid container direction={'row'} spacing={1} alignItems={'center'}>
				<Grid item xs={2}>
					<FormControl fullWidth>
						<InputLabel id={'lbl-filter-type'}>过滤条件</InputLabel>
						<Select labelId={'lbl-filter-type'} id={'filter-type'} value={filterType} label={'过滤条件'} onChange={(event) => { setFilterType(toFilterType(event.target.value)) }}>
							{SearchOptions.map((it, index) => <MenuItem key={index} value={it.value}>{it.label}</MenuItem>)}
						</Select>
					</FormControl>
				</Grid>
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<Grid item xs={4}>
						<DateTimePicker
							onChange={(event) => {
								if (event == null) {
									return;
								}

								// if the starting date is later than the ending date
								// set the ending date to one hour in the future
								const startingTime = event.getTime();
								const endingTime = toDate.getTime();
								if (startingTime >= endingTime) {
									const newEndingTime = startingTime + ONE_HOUR;
									setFromDate(event);
									setToDate(new Date(newEndingTime));
								} else {
									setFromDate(event);
								}
							}}
							value={fromDate}
							renderInput={(value) => {
								return (
									<FormControl fullWidth>
										<TextField {...value} label={'开始时间'} />
									</FormControl>
								)
							}}/>
					</Grid>
					<Grid item xs={4}>
						<DateTimePicker
							onChange={(event) => {
								if (event == null) {
									return;
								}

								// if the ending date is earlier than the starting date
								// set the starting date to one hour in the past
								const startingTime = fromDate.getTime();
								const endingTime = event.getTime();
								if (endingTime <= startingTime) {
									const newStartingTime = endingTime - ONE_HOUR;
									setFromDate(new Date(newStartingTime));
									setToDate(event);
								} else {
									setToDate(event);
								}
							}}
							value={toDate}
							renderInput={(value) => {
								return (
									<FormControl fullWidth>
										<TextField {...value} label={'结束时间'} />
									</FormControl>
								)
							}}/>
					</Grid>
				</LocalizationProvider>
				<Grid item xs={1}>
					<Button onClick={refresh}>刷新</Button>
				</Grid>
				<Grid item xs={1}>
					<Button onClick={resetState}>重置</Button>
				</Grid>
				{filterComponent}
			</Grid>
		</Paper>
	</>);
}
