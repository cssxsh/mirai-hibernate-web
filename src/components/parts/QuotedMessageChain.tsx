import React from 'react';
import { QuoteMessage } from '../../types';
import MessageChain from './MessageChain';
import { Grid } from '@mui/material';
import UserId from './chat/UserId';
import LocaleTime from './chat/LocaleTime';
import IconButton from '@mui/material/IconButton';
import { East } from '@mui/icons-material';

export interface QuotedMessageChainProps {
	message: QuoteMessage;
}

export default function QuotedMessageChain(props: QuotedMessageChainProps) {
	return (<>
		<Grid container direction={'column'} sx={{mx: 1, px: 1, backgroundColor: '#eee'}}>
			<Grid item>
				<Grid container direction={'row'} spacing={1} alignItems={'center'}>
					<Grid item>
						<UserId id={props.message.source.fromId.toString()} />
					</Grid>
					<Grid item flexGrow={1} />
					<Grid item>
						<LocaleTime timestamp={props.message.source.time} />
					</Grid>
					<Grid item>
						<IconButton aria-label={'goto quoted message'} component={'label'} size={'small'}>
							<East fontSize={'inherit'} />
						</IconButton>
					</Grid>
				</Grid>
			</Grid>
			<Grid item>
				<MessageChain message={props.message.source} />
			</Grid>
		</Grid>
	</>);
}
