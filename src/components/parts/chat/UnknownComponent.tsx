import React from 'react';
import './ChatParts.css';
import { MessageChainItem } from '../../../types';

export interface UnknownComponentProps {
	message: MessageChainItem;
}

export default function UnknownComponent(props: UnknownComponentProps) {
	return (<>
		<span className={'text-monospace'}>[{props.message.type}]</span>
	</>);
}
