import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IKey, useKeyStore } from 'entities/Key';
import { axiosInstance } from 'shared/api';
import { getApiResponseErrorMessage } from 'shared/lib';
import type { ApiResponse } from 'shared/types';

export const useGetKey = () => {
	const { name } = useParams();
	const { setCurrentKey } = useKeyStore();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<null | string>();

	useEffect(() => {
		refetch().finally();
	}, [name]);

	const refetch = useCallback(async () => {
		setIsLoading(true);
		setError(null);

		try {
			if (!name) throw new Error('Неверно заданное имя ключа');

			const response = await axiosInstance.get<ApiResponse<IKey>>(`/keys/${name}`);

			const key = response.data.data;
			setCurrentKey(key);
		} catch (error) {
			const errorMessage =
				getApiResponseErrorMessage(error) ||
				(error as string) ||
				'Произошла неизвестная ошибка при получении данных';
			setError(errorMessage);
		} finally {
			setIsLoading(false);
		}
	}, []);

	return {
		isLoading,
		error,
	};
};
