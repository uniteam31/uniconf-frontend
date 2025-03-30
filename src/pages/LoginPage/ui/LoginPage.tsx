import classNames from 'classnames';
import { LoginForm } from 'feature/Login';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from 'entities/User';
import { RoutesPaths } from 'shared/const';
import s from './LoginPage.module.scss';

export const LoginPage = () => {
	const { authData } = useUserStore();
	const navigate = useNavigate();

	useEffect(() => {
		if (authData) navigate(RoutesPaths.main);
	}, [authData]);

	return (
		<div className={classNames(s.page, 'Page')}>
			<LoginForm />
		</div>
	);
};
