import React, { useState } from 'react';
import { MessageRecord, SearchOption, SearchOptions } from '../types';
import { Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const ONE_HOUR = 60 * 60 * 1000;

export interface FilterControlProps {
	setMessages: (xs: MessageRecord[]) => void;
}

export default function FilterControl(props: FilterControlProps) {
	// TODO
	const [filterType, setFilterType] = useState(SearchOptions[0].label);
	const [fromDate, setFromDate] = useState(new Date(Date.now() - ONE_HOUR));
	const [toDate, setToDate] = useState(new Date());
	const [botId, setBotId] = useState('');
	const [groupId, setGroupId] = useState('');

	return (<>
		<Paper sx={{padding: 1}}>
			<Grid container direction={'row'} spacing={1} justifyContent={'center'} alignItems={'center'}>
				<Grid item xs={2}>
					<FormControl fullWidth>
						<InputLabel id={'lbl-filter-type'}>Filter Type</InputLabel>
						<Select labelId={'lbl-filter-type'} id={'filter-type'} value={filterType} label={'Filter Type'} onChange={(event) => { setFilterType(event.target.value) }}>
							{SearchOptions.map((it, index) => <MenuItem key={index} value={it.label}>{it.label}</MenuItem>)}
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
										<TextField {...value} label={'From Date'} />
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
										<TextField {...value} label={'To Date'} />
									</FormControl>
								)
							}}/>
					</Grid>
				</LocalizationProvider>
				<Grid item xs={2}>
					<Button>Refresh</Button>
				</Grid>
			</Grid>
			<Grid container direction={'row'}>

			</Grid>
		</Paper>
	</>);
}
