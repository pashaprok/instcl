import React from 'react';

export type useStateFunction = React.Dispatch<React.SetStateAction<string>>;
export type useStateFunctionBool = React.Dispatch<
	React.SetStateAction<boolean>
>;
export type gqlResponse = 'data' | 'loading' | 'error';
