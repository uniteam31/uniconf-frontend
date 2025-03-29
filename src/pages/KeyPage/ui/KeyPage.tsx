import classNames from 'classnames';
import { KeyForm } from 'feature/KeyForm';
import { KeyInfo } from 'widgets/KeyInfo';
import { IKey } from 'entities/Key';
// import { Loader } from 'shared/ui';
import s from './KeyPage.module.scss';

export const KeyPage = () => {
	const key: IKey = {
		_id: '',
		number: 1,
		name: 'key_name_v1',
		percentage: 10,
		include: ['user1', 'user2'],
		exclude: ['user3'],
		description: '',
		dangerous: true,
		createdAt: new Date().toString(),
		updatedAt: new Date().toString(),
		author: {
			_id: '',
			avatar: '',
			firstName: 'Author',
			username: 'admin',
		},
	};

	// if (true) {
	// 	return <Loader className={s.loader} />;
	// }

	return (
		<div className={classNames(s.page, 'Page')}>
			<KeyForm confKey={key} />
			<KeyInfo confKey={key} />
		</div>
	);
};
