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
	let cls = `alert ${type}`;
	const [show, setShow] = useState(true);

	if (show) {
		setTimeout(() => setShow(false), 5000);
	} else {
		cls += ' hidden';
	}

	return <div className={cls}>{txt}</div>;
}

export function FailAlert(props: SAlertPropsI) {
	const { txt } = props;
	return Alert({ txt, type: 'fail' });
}
