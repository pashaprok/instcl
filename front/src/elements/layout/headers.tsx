import React from 'react';

interface HeaderPropsI {
  children: any
}

export function Header(props: HeaderPropsI) {
  const { children } = props;
  return (
    <header className='common-header'>
      {children}
    </header>
  );
}