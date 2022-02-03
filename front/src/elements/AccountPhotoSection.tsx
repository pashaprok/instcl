import React, { useState } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface AccountPhotoSectionProps {
	imgLink: string;
}

export function AccountPhotoSection({ imgLink }: AccountPhotoSectionProps) {
	const [loaded, setLoaded] = useState(false);
	const onLoading = () => setLoaded(true);

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
