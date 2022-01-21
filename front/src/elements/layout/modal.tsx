import React from 'react';
import '../../styles/modal.css';
import { Button } from '../buttons/Button';
import { HeadingThird } from './titles';

interface ModalPropsI {
	handleClose: any;
	show: boolean;
	children: any;
	title: string;
}

export function Modal(props: ModalPropsI) {
	const { show, children, handleClose, title } = props;
	const showHideClassName = show ? 'modal display-block' : 'modal display-none';

	return (
		<div className={showHideClassName}>
			<section className='modal-main'>
				<HeadingThird cls='modal-title' text={title} />
				{children}
				<Button
					cls='modal-close-btn'
					onClickF={handleClose}
					txt={<i className='fas fa-times' />}
				/>
			</section>
		</div>
	);
}
