import classNames from 'classnames';
import { KeyForm } from 'feature/KeyForm';
import { KeyInfo } from 'widgets/KeyInfo';
import s from './KeyPage.module.scss';

export const KeyPage = () => {
	return (
		<div className={classNames(s.page, 'Page')}>
			<KeyForm />
			<KeyInfo />
		</div>
	);
};
