import React from 'react';

interface NoContentPropsI {
	txt: string;
	cls: string;
}

export const NoContentMsg: React.FC<NoContentPropsI> = ({ txt, cls }) => (
	<div className={cls}>{txt}</div>
);
