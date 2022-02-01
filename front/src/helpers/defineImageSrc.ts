import { appConfig } from '../config/app';

export function defineImageSrc(
	imageLink: string | undefined,
	type: 'avatar' | 'post',
) {
	let imageScr: string = `/images/${type}-default.png`;
	if (imageLink && type === 'avatar')
		imageScr = `${appConfig.backImagesLink}/avatar/${imageLink}`;

	if (imageLink && type === 'post')
		imageScr = `${appConfig.backImagesLink}/post/${imageLink}`;

	return imageScr;
}
