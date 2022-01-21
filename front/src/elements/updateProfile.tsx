import React, { useState } from 'react';
import { Button } from './buttons/Button';
import { Modal } from './layout/modal';
import { UpdateAccountForm } from './forms/UpdateAccountForm';

export function UpdateProfile() {
	const [showModal, setShowModal] = useState(false);
	const toggleModal = async (e: React.ChangeEvent<any>) => {
		e.preventDefault();
		setShowModal(!showModal);
	};
	return (
		<>
			<Button
				cls='blue-btn'
				txt={<><i className='fas fa-user-edit' /> Update Profile</>}
				onClickF={toggleModal}
			/>
			<Modal
				handleClose={toggleModal}
				show={showModal}
				title='Update your profile info'
			>
				<UpdateAccountForm setRedirect={setShowModal} />
			</Modal>
		</>
	);
}
