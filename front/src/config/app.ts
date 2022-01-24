import env from 'react-dotenv';

export const appConfig = {
	backAPILink: env.backAPILink || '',
	backImagesLink: env.backImagesLink || '',
};
