import * as React from 'react';
import { Link } from '@mui/material';

export interface AtProps {
	targetId: number;
}

export default function At(props: AtProps) {
	return <Link href={'#'} underline={'always'} onClick={e => e.preventDefault()}>{`@${props.targetId}`}</Link>
}
