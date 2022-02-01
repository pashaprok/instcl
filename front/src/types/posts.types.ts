import { UserInfoI } from './auth.types';
import { FormPropsI } from './common.types';

export type PostID = number;

export interface PostInfoI {
	__typename: string;
	id: PostID;
	title: string;
	content: string;
	photo: string;
	createdAt: number;
	updatedAt: number;
	author?: UserInfoI;
}

export interface PostFormPropsI extends FormPropsI {
	post: PostInfoI;
}
