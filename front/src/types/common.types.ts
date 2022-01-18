import React from 'react';

export type useStateFunction = React.Dispatch<React.SetStateAction<string>>;
export type gqlResponse = 'data' | 'loading' | 'error';
