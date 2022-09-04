import React from 'react';
import { replaceCenter } from '../../../util/StringUtil';
import { Typography } from '@mui/material';

export interface UserIdProps {
	id: string;
}

export default function UserId(props: UserIdProps) {
	return (<>
		<Typography>
			{replaceCenter(props.id.toString(), '*', 18)}
		</Typography>
	</>);
}
