import type { TMeta } from 'shared/types';

export interface IUser {
	_id: TMeta['_id'];
	publicName: string;
	username: string;
}
