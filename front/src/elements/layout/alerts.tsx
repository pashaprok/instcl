import React, { useState } from 'react';
import '../../styles/alerts.css';

interface SAlertPropsI {
	txt: string;
}

interface AlertPropsI extends SAlertPropsI {
	type: 'success' | 'fail' | 'warn';
}

function Alert(props: AlertPropsI) {
	const { txt, type } = props;
	const cls = `alert ${type}`;
	const [show, setShow] = useState(true);

	if (show) {
		setTimeout(() => setShow(false), 5000);
		return <div className={cls}>{txt}</div>;
	}

	return <></>;
}

export function FailAlert(props: SAlertPropsI) {
	const { txt } = props;
	return Alert({ txt, type: 'fail' });
}
