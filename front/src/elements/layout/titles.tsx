import React from 'react';

interface TitleProps {
	text: string;
	cls: string;
}

export const HeadingOne: React.FC<TitleProps> = ({ text, cls }) => {
	const classes = `heading-one ${cls}`;
	return <h1 className={classes}>{text}</h1>;
};

export const HeadingThird: React.FC<TitleProps> = ({ text, cls }) => {
	const classes = `heading-third ${cls}`;
	return <h3 className={classes}>{text}</h3>;
};

export const HeadingSecond: React.FC<TitleProps> = ({ text, cls }) => {
	const classes = `heading-second ${cls}`;
	return <h2 className={classes}>{text}</h2>;
};
