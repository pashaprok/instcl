import React from 'react';

interface HeaderProps {
	children: any;
}

export function Header({ children }: HeaderProps) {
	return <header className='common-header'>{children}</header>;
}
