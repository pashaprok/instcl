import { UserInfoI } from './auth.types';

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
