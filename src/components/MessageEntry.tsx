import { At, Image, MessageRecord, PlainText } from '../types';
import { Avatar, Card, CardContent, Grid, Link, Typography } from '@mui/material';
import * as React from 'react';
import './Component.css';
import { replaceCenter } from '../util/StringUtil';

export default function MessageEntry(message: MessageRecord) {
	const chain = JSON.parse(message.code) as [PlainText | Image | At]
	return (
		<Card sx={{marginBottom: '0.5em'}}>
			<CardContent>
				<Grid container spacing={2}>
					<Grid item xs={1}>
						<Avatar sx={{width: "100%", height: "auto"}}
								src={`https://q.qlogo.cn/g?b=qq&nk=${message.fromId}&s=640`} />
					</Grid>
					<Grid item xs={10}>
						<Grid container direction={'column'}>
							<Grid item>
								<Typography>
									{replaceCenter(message.fromId.toString(), '*', 18)}
								</Typography>
							</Grid>
							<Grid item sx={{marginLeft: '0.5em'}}>
								{chain.map((item, index) => {
									switch (item.type) {
										case "PlainText":
											return (item as PlainText).content
										case "Image":
											const id = (item as Image).imageId
											const match = id.substring(1, 37).replaceAll("-", "")
											return <img key={index}
														src={`https://gchat.qpic.cn/gchatpic_new/${message.fromId}/${message.targetId}-0-${match}/0?term=3`}
														alt={id}
														className={'image-preview'} />
										case "At":
											const target = (item as At).target
											return <Link key={index} href="#" underline="always">{`@${target}`}</Link>
										default:
											return `[${item.type}]`
									}
								})}
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	)
}
