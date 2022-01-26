import React, { useState } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface AccountPhotoSectionI {
	imgLink: string;
}

export function AccountPhotoSection(props: AccountPhotoSectionI) {
	const { imgLink } = props;
	const [loaded, setLoaded] = useState(false);

	function onLoading() {
		setLoaded(true);
	}

	return (
		<div className='photo-section'>
			<img
				style={{ display: loaded ? 'block' : 'none' }}
				className='avatar'
				src={imgLink}
				alt='avatar'
				onLoad={onLoading}
			/>

			{!loaded && <LoadingSpinner />}
		</div>
	);
}
