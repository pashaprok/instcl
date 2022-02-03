import React, { ReactNode } from 'react';
import { resetLSToken } from '../../utils/token.helpers';

interface ButtonPropsI {
	cls: string;
	txt: string | ReactNode;
}

interface ButtonPropsFuncI extends ButtonPropsI {
	onClickF: Function;
}

export function Button({ cls, onClickF, txt }: ButtonPropsFuncI) {
	return (
		<button type='button' className={cls} onClick={e => onClickF(e)}>
			{txt}
		</button>
	);
}

export function LogoutButton({ cls, txt }: ButtonPropsI) {
	const logout = (e: React.ChangeEvent) => {
		e.preventDefault();
		resetLSToken();
		window.location.reload();
	};

	return <Button cls={cls} txt={txt} onClickF={logout} />;
}
