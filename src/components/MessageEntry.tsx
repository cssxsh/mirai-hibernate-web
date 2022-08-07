import { MessageRecord } from '../types';
import { Avatar, Card, CardContent, Grid} from '@mui/material';
import * as React from 'react';
import './Component.css';
import MessageChain from './parts/MessageChain';
import UserId from './parts/chat/UserId';
import LocaleTime from './parts/chat/LocaleTime';

export default function MessageEntry(message: MessageRecord) {
	return (
		<Card sx={{marginBottom: '0.5em'}} id={message.id.toString()}>
			<CardContent>
				<Grid container spacing={2}>
					<Grid item xs={1}>
						<Avatar sx={{width: "100%", height: "auto"}}
								src={`https://q.qlogo.cn/g?b=qq&nk=${message.fromId}&s=640`} />
					</Grid>
					<Grid item xs={11}>
						<Grid container direction={'column'}>
							<Grid item>
								<Grid container direction={'row'}>
									<Grid item>
										<UserId id={message.fromId.toString()} />
									</Grid>
									<Grid item flexGrow={1}></Grid>
									<Grid item>
										<LocaleTime timestamp={message.time} />
									</Grid>
								</Grid>
							</Grid>
							<Grid item>
								{message.recall ? (<span className={'text-recalled'}>该消息已被撤回</span>) : null}
							</Grid>
							<Grid item sx={{marginLeft: '0.5em'}}>
								<MessageChain message={message} />
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	)
}
