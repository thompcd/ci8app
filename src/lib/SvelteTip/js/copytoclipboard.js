export const copyToClipboard = async ({
	snippet = '',
	onCopySuccess = null,
	onCopyFail = null
}) => {
	try {
		await navigator.clipboard.writeText(snippet);
		onCopySuccess && onCopySuccess();
	} catch (err) {
		onCopyFail && onCopyFail();
	}
};
