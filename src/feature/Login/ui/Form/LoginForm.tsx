import { Form, Input, Button, Alert } from 'antd';
import { useController, useFormContext } from 'react-hook-form';
import { TLoginFormField } from '../../model/login';

export const LoginForm = () => {
	const {
		control,
		getValues,
		formState: { isValid },
	} = useFormContext<TLoginFormField>();
	const error = '';
	const isLoading = false;

	const {
		field: { value: username, onChange: onChangeUsername },
	} = useController({ control, name: 'login', rules: { required: true } });

	const {
		field: { value: password, onChange: onChangePassword },
	} = useController({ control, name: 'password', rules: { required: true } });

	const handleSubmit = () => {
		if (!isValid) return;

		const formValues = getValues();
		console.log(formValues);
	};

	return (
		<>
			<Form layout="vertical">
				{error && (
					<Form.Item>
						<Alert message={error} type="error" showIcon />
					</Form.Item>
				)}

				<Form.Item>
					<Input placeholder="Логин" size="large" value={username} onChange={onChangeUsername} />
				</Form.Item>

				<Form.Item>
					<Input.Password
						placeholder="Пароль"
						size="large"
						value={password}
						onChange={onChangePassword}
					/>
				</Form.Item>

				<Button type="primary" onClick={handleSubmit} loading={isLoading} block size="large">
					Войти
				</Button>
			</Form>
		</>
	);
};
