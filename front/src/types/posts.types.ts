import { UserInfo } from './auth.types';
import { FormProps } from './common.types';

export type PostID = number;

export interface PostInfo {
	__typename: string;
	id: PostID;
	title: string;
	content: string;
	photo: string;
	createdAt: number;
	updatedAt: number;
	author?: UserInfo;
}

export interface PostFormProps extends FormProps {
	post: PostInfo;
}
