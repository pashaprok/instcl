import React from 'react';

interface NoContentProps {
	txt: string;
	cls: string;
}

export const NoContentMsg: React.FC<NoContentProps> = ({ txt, cls }) => (
	<div className={cls}>{txt}</div>
);
