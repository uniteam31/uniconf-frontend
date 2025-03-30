import { IUser } from 'entities/User';
import type { TMeta } from 'shared/types';

export interface IKeyFormField {
	name: string;
	percentage: number;
	include: string[];
	exclude: string[];
	description: string;
	dangerous?: boolean;
}

export interface IKey extends TMeta, IKeyFormField {
	number: number;
	owner: IUser;
}
