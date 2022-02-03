import React from 'react';

type TabContentProps = {
	title: string;
};

export const TabContent: React.FC<TabContentProps> = ({ children, title }) => (
	<div className={`tab-content-${title}`}>{children}</div>
);
