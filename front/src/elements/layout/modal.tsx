import React from 'react';
import '../../styles/modal.css';
import { Button } from '../buttons/Button';
import { HeadingThird } from './titles';

interface ModalProps {
	handleClose: any;
	show: boolean;
	children: any;
	title: string;
}

export function Modal({ show, children, handleClose, title }: ModalProps) {
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
