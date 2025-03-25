import classNames from 'classnames';
import { KeysList } from 'widgets/KeysList';
import s from './MainPage.module.scss';

export const MainPage = () => {
	return (
		<div className={classNames(s.page, 'Page')}>
			<KeysList />
		</div>
	);
};
