export function extractLSTokens() {
	const ls = localStorage.getItem('user');

	if (ls) {
		const { access, refresh } = JSON.parse(ls);
		return { access, refresh };
	}

	return {
		access: '',
		refresh: '',
	};
}

export function setLSToken(access: string, refresh: string) {
	localStorage.setItem(
		'user',
		JSON.stringify({
			access,
			refresh,
		}),
	);
}

export function resetLSToken() {
	localStorage.removeItem('user');
}
