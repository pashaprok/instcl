import React, { ReactElement, useState } from 'react';
import { TabTitle } from './TabTitle';
import '../../styles/tabs.css';

type TabsPropsI = {
	children: ReactElement[];
};

export const Tabs: React.FC<TabsPropsI> = ({ children }) => {
	const [selectedTab, setSelectedTab] = useState(0);

	return (
		<>
			<div className='tabs-titles'>
				{children.map((item, index) => (
					<TabTitle
						key={item.props.title}
						title={item.props.title}
						index={index}
						selectedTab={selectedTab}
						setSelectedTab={setSelectedTab}
					/>
				))}
			</div>
			{children[selectedTab]}
		</>
	);
};
