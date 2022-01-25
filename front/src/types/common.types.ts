import React from 'react';

export type useStateFunction = React.Dispatch<React.SetStateAction<string>>;
export type useStateFunctionAny = React.Dispatch<React.SetStateAction<any>>;
export type useStateFunctionBool = React.Dispatch<
	React.SetStateAction<boolean>
>;

export type refObj = React.MutableRefObject<any>;
export type gqlResponse = 'data' | 'loading' | 'error';
