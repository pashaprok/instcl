import { useStateFunctionBool } from './common.types';

interface UserInfoI {
	__typename: string;
	id: UserID;
	email: string;
	name: string;
	password: string;
	createdAt: number;
	updatedAt: number;
	image?: string;
}
export interface AuthFormPropsI {
	user?: UserInfoI;
	setRedirect: useStateFunctionBool;
}

export interface AccountInfoPropsI {
	user: UserInfoI;
}

export type UserID = number;
