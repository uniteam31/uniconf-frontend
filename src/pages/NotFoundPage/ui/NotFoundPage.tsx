import classNames from 'classnames';
import s from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
	return (
		<div className={classNames(s.container, 'Page')}>
			<div className={s.title}> 404 </div>
			Ничего не найдено
		</div>
	);
};
