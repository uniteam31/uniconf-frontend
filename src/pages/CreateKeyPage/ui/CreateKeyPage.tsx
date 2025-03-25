import classNames from 'classnames';
import { KeyForm } from 'feature/KeyForm';
import s from './CreateKeyPage.module.scss';

export const CreateKeyPage = () => {
	return (
		<div className={classNames(s.page, 'Page')}>
			<KeyForm />
		</div>
	);
};
