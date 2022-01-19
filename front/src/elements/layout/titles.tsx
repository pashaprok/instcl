import React from 'react';

interface IHOneProps {
	text: string;
	cls: string;
}

export const HeadingOne: React.FC<IHOneProps> = ({ text, cls }) => {
	const classes = `heading-one ${cls}`;
	return <h1 className={classes}>{text}</h1>;
};