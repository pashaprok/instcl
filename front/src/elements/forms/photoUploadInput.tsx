import React from 'react';
import { refObj, useStateFunctionAny } from '../../types/common.types';

interface PhotoUploadInputI {
	cls: string;
	imageRef: refObj;
	setFile: useStateFunctionAny;
}

function onChangeFile(
	event: React.ChangeEvent<any>,
	setFile: useStateFunctionAny,
) {
	if (event.target.validity.valid) {
		setFile(event.target.files[0]);
	}
}

export function PhotoUploadInput(props: PhotoUploadInputI) {
	const { cls, setFile, imageRef } = props;

	const onChange = (e: React.ChangeEvent<any>) => {
		onChangeFile(e, setFile);
	};

	return (
		<div className='form-part'>
			<input
				type='file'
				ref={imageRef}
				className={`photo-upload-input ${cls}`}
				accept='.jpg, .jpeg, .png'
				onChange={onChange}
			/>
		</div>
	);
}
