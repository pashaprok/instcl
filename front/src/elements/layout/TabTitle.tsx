import React, { useCallback } from 'react';
import { useStateFunctionNumber } from '../../types/common.types';

type TabTitlePropsI = {
	title: string;
	index: number;
	selectedTab: number;
	setSelectedTab: useStateFunctionNumber;
};

export const TabTitle: React.FC<TabTitlePropsI> = ({
	title,
	selectedTab,
	setSelectedTab,
	index,
}) => {
	const onClick = useCallback(() => {
		setSelectedTab(index);
	}, [setSelectedTab, index]);

	let cls = '';
	if (selectedTab === index) cls = 'selected';

	return (
		<div className='tab-title__item'>
			<button className={cls} onClick={onClick} type='button'>
				{title}
			</button>
		</div>
	);
};
