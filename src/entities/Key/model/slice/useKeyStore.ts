import { create } from 'zustand';
import { IKey } from '../types/key';

interface IKeyStore {
	/** Поля */
	key?: IKey;
	/** Методы */
	setCurrentKey: (key: IKey) => void;
	clearCurrentKey: () => void;
}

export const useKeyStore = create<IKeyStore>((set) => ({
	setCurrentKey: (key) => {
		set({ key });
	},

	clearCurrentKey: () => {
		set({ key: undefined });
	},
}));
