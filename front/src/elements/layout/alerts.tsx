import React, { useState } from 'react';
import '../../styles/alerts.css';

interface SAlertProps {
	txt: string;
}

interface AlertProps extends SAlertProps {
	type: 'success' | 'fail' | 'warn';
}

function Alert({ txt, type }: AlertProps) {
	const cls = `alert ${type}`;
	const [show, setShow] = useState(true);

	if (show) {
		setTimeout(() => setShow(false), 5000);
		return <div className={cls}>{txt}</div>;
	}

	return <></>;
}

export function FailAlert({ txt }: SAlertProps) {
	return Alert({ txt, type: 'fail' });
}
