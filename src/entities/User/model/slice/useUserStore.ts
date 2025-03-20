import { create } from 'zustand';
import { axiosInstance } from 'shared/api';
import { LOCAL_STORAGE } from 'shared/const';
import type { ApiResponse } from 'shared/types';
import type { IUser } from '../types/user';

interface IUserStore {
	/** Поля */
	authData?: IUser;
	_init?: boolean;
	/** Методы */
	setAuthData: (authData: IUser) => void;
	initAuthData: () => void;
	logout: () => void;
}

type TUserInitialData = ApiResponse<IUser>;

export const useUserStore = create<IUserStore>((set) => ({
	setAuthData: (authData) => {
		set({ authData });
	},

	initAuthData: async () => {
		try {
			const response = await axiosInstance.get<TUserInitialData>('/auth');
			const authData = response.data.data;

			if (!authData) {
				throw new Error('Что-то пошло не так...');
			}

			set({ authData });
		} catch (e) {
			console.error('Произошла ошибка: ' + e);
		}

		set({ _init: true });
	},

	logout: () => {
		localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
		set({ authData: undefined });
	},
}));
