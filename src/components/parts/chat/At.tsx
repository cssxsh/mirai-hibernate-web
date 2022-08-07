import * as React from 'react';

export interface AtProps {
	targetId: number;
}

export default function At(props: AtProps) {
	return <span>{`@${props.targetId}`}</span>
}
