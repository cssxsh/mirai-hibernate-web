import React from 'react';
import {
	isAt, isFace, isFlashImage,
	isImage,
	isMessageRecord,
	isPlainText,
	isQuoteMessage,
	MessageChainItem,
	MessageRecord,
	QuotedContent,
} from '../../types';
import PlainText from './chat/PlainText';
import Image from './chat/Image';
import At from './chat/At';
import QuotedMessageChain from './QuotedMessageChain';
import UnknownComponent from './chat/UnknownComponent';
import Face from './chat/Face';

export interface MessageChainProps {
	message: MessageRecord | QuotedContent;
}

export default function MessageChain(props: MessageChainProps) {
	let chain;
	if (isMessageRecord(props.message)) {
		chain = JSON.parse(props.message.code) as MessageChainItem[];
	} else {
		chain = props.message.originalMessage;
	}

	return (<>
		{chain.map((item, index) => {
			if (isPlainText(item)) {
				return <PlainText key={index} content={item.content} />;
			}

			if (isAt(item)) {
				return <At key={index} targetId={item.target} />;
			}

			if (isFace(item)) {
				return <Face key={index} id={item.id} />
			}

			if (isImage(item)) {
				return <Image key={index} fromId={props.message.fromId} targetId={props.message.targetId} imageId={item.imageId} />;
			}

			if (isFlashImage(item)) {
				return <Image key={index} fromId={props.message.fromId} targetId={props.message.targetId} imageId={item.imageId} isFlashImage={true} />;
			}

			if (isQuoteMessage(item)) {
				return <QuotedMessageChain key={index} message={item} />;
			}

			return <UnknownComponent key={index} message={item} />;
		})}
	</>);
}
