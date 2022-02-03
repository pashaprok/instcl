import { FormProps } from './common.types';

export type UserID = number;

export interface UserInfo {
	__typename: string;
	id: UserID;
	email: string;
	name: string;
	password: string;
	createdAt: number;
	updatedAt: number;
	avatar?: string;
}

export interface AuthFormProps extends FormProps {
	user?: UserInfo;
}

export interface AccountInfoProps {
	user: UserInfo;
}

export interface UserListProps {
	currentUser: UserInfo;
	list: UserInfo[];
}

export interface UsersListItemProps {
	user: UserInfo;
}
