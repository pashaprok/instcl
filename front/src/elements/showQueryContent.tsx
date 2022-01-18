import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { gqlResponse } from '../types/common.types';

interface IShowContentProps {
	response: gqlResponse;
	data: any;
	error: any;
}

export const ShowContent: React.FC<IShowContentProps> = ({
	response,
	data,
	error,
}) => {
	if (response === 'data') {
		return <div>{data ? JSON.stringify(data) : ''}</div>;
	}
	if (response === 'error') {
		return <div>{error}</div>;
	}

	return <LoadingSpinner />;
};
