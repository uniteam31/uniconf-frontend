export const formatDate = (dateString: string) => {
	return new Date(dateString).toLocaleDateString('ru-RU', {
		day: '2-digit',
		month: 'long',
		hour: '2-digit',
		minute: '2-digit',
	});
};
