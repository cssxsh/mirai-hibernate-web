import React from 'react';
import './ChatParts.css';

export interface ImageProps {
	fromId: number;
	targetId: number;
	imageId: string;

	isFlashImage?: boolean;
}

export default function Image(props: ImageProps) {
	const match = props.imageId.substring(1, 37).replaceAll("-", "")
	return <img src={`https://gchat.qpic.cn/gchatpic_new/${props.fromId}/${props.targetId}-0-${match}/0?term=${props.isFlashImage ? 2 : 3}`}
				alt={props.imageId}
				className={'image-preview'} />
}
