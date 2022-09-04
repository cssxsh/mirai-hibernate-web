import React from 'react';
import './ChatParts.css';

export interface FaceProps {
	id: number;
}

export default function Face(props: FaceProps) {
	// TODO: can we display the stickers inline?
	return (<>
		<span className={'text-monospace'}>[{FaceNameLut[props.id] || `Face:${props.id}`}]</span>
	</>);
}

const FaceNameLut: {[x: number]: string} = {
	0: '惊讶',
	1: '撇嘴',
	2: '色',
	/// todo: i am too tired to complete this list
	339: '舔屏'
};
