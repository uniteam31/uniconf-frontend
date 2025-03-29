import { Card, Typography } from 'antd';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormWrapper } from 'shared/lib';
import type { TLoginFormField } from '../../model/login';
import { LoginForm } from '../Form/LoginForm';
import s from './LoginFormWrapper.module.scss';

const { Title } = Typography;

export const LoginFormWrapper = () => {
	const methods = useForm<TLoginFormField>();

	return (
		<Card className={s.card}>
			<Title className={s.title} level={3}>
				Вход в систему
			</Title>

			<FormWrapper<TLoginFormField> methods={methods}>
				<LoginForm />
			</FormWrapper>
		</Card>
	);
};
