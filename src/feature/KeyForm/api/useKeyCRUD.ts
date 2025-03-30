import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IKey, IKeyFormField } from 'entities/Key';
import { useKeyStore } from 'entities/Key';
import { axiosInstance } from 'shared/api';
import { getApiResponseErrorMessage } from 'shared/lib';
import type { ApiResponse } from 'shared/types';

interface IKeyRequestProps {
	formValues: IKeyFormField;
}

export const useKeyCRUD = () => {
	const { setCurrentKey, key } = useKeyStore();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<null | string>();

	const create = useCallback(async ({ formValues }: IKeyRequestProps) => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await axiosInstance.post<ApiResponse<IKey>>('/keys', formValues);

			const newKey = response.data.data;
			navigate(`/keys/${newKey.name}`);
		} catch (error) {
			const errorMessage =
				getApiResponseErrorMessage(error) || 'Произошла неизвестная ошибка при создании ключа';
			setError(errorMessage);
		} finally {
			setIsLoading(false);
		}
	}, []);

	const update = useCallback(async ({ formValues }: IKeyRequestProps) => {
		setIsLoading(true);
		setError(null);

		try {
			if (!key?.name) throw new Error('Неверно заданное имя ключа');

			const response = await axiosInstance.put<ApiResponse<IKey>>(`/keys/${key.name}`, formValues);

			const newKey = response.data.data;
			setCurrentKey(newKey);

			return newKey;
		} catch (error) {
			const errorMessage =
				getApiResponseErrorMessage(error) ||
				(error as string) ||
				'Произошла неизвестная ошибка при обновлении ключа';
			setError(errorMessage);
		} finally {
			setIsLoading(false);
		}
	}, []);

	return {
		isLoading,
		error,
		create,
		update,
	};
};
