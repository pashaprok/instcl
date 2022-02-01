import { useStateFunctionBool } from './common.types';

export type UserID = number;

export interface UserInfoI {
	__typename: string;
	id: UserID;
	email: string;
	name: string;
	password: string;
	createdAt: number;
	updatedAt: number;
	avatar?: string;
}

export interface AuthFormPropsI {
	user?: UserInfoI;
	setRedirect: useStateFunctionBool;
}

export interface AccountInfoPropsI {
	user: UserInfoI;
}

export interface UserListPropsI {
	currentUser: UserInfoI;
	list: UserInfoI[];
}

export interface UsersListItemPropsI {
	user: UserInfoI;
}
