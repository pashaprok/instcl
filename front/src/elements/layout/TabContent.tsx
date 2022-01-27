import React from 'react';

type TabContentPropsI = {
	title: string;
};

export const TabContent: React.FC<TabContentPropsI> = ({ children, title }) => (
	<div title={title}>{children}</div>
);
