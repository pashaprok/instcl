import React, { ReactNode } from 'react';
import { resetLSToken } from '../../utils/token.helpers';

interface ButtonPropsI {
	cls: string;
	txt: string | ReactNode;
}

interface ButtonPropsFuncI extends ButtonPropsI {
	onClickF: Function;
}

export function Button(props: ButtonPropsFuncI) {
	const { cls, onClickF, txt } = props;
	return (
		<button type='button' className={cls} onClick={e => onClickF(e)}>
			{txt}
		</button>
	);
}

export function LogoutButton(props: ButtonPropsI) {
	const { cls, txt } = props;

	const logout = (e: React.ChangeEvent) => {
		e.preventDefault();
		resetLSToken();
		window.location.reload();
	};

	return <Button cls={cls} txt={txt} onClickF={logout} />;
}
