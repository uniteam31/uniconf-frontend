import classNames from 'classnames';
import { LoginForm } from 'feature/Login';
import s from './LoginPage.module.scss';

export const LoginPage = () => {
	return (
		<div className={classNames(s.page, 'Page')}>
			<LoginForm />
		</div>
	);
};
