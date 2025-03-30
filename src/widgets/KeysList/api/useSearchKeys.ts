import { useCallback, useState } from 'react';
import { IKey } from 'entities/Key';
import { axiosInstance } from 'shared/api';
import { getApiResponseErrorMessage } from 'shared/lib';
import type { ApiResponse } from 'shared/types';

export const useSearchKeys = () => {
	const [keys, setKeys] = useState<IKey[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<null | string>();

	const search = useCallback(async (searchQuery: string) => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await axiosInstance.get<ApiResponse<IKey[]>>(`/keys?search=${searchQuery}`);

			const keys = response.data.data;
			setKeys(keys);
		} catch (error) {
			const errorMessage =
				getApiResponseErrorMessage(error) || 'Произошла неизвестная ошибка при входе в аккаунт';
			setError(errorMessage);
		} finally {
			setIsLoading(false);
		}
	}, []);

	return {
		isLoading,
		error,
		search,
		keys,
	};
};
