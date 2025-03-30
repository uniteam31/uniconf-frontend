import { CloseOutlined } from '@ant-design/icons';
import {
	Slider,
	Input,
	Tag,
	Space,
	Form,
	Button,
	InputNumber,
	Checkbox,
	Typography,
	Alert,
} from 'antd';
import React, { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import type { IKey, IKeyFormField } from 'entities/Key';
import { useUserStore } from 'entities/User';
import { CopyLabel } from 'shared/ui';
import { useKeyCRUD } from '../../api/useKeyCRUD';
import s from './KeyForm.module.scss';

const { Title } = Typography;
const { TextArea } = Input;

interface IProps {
	confKey?: IKey;
}

export const KeyForm = ({ confKey }: IProps) => {
	const {
		control,
		handleSubmit: handleSubmitContext,
		formState: { isDirty, isValid },
		getValues,
		reset,
	} = useFormContext<IKeyFormField>();
	const { authData } = useUserStore();

	const { error, isLoading, update, create } = useKeyCRUD();

	// Состояния формы
	const {
		field: { value: name, onChange: onChangeName },
	} = useController({
		control,
		name: 'name',
		defaultValue: confKey?.name ?? '',
		rules: { required: true },
	});

	const {
		field: { value: description, onChange: onChangeDescription },
	} = useController({ control, name: 'description', defaultValue: confKey?.description ?? '' });

	const {
		field: { value: percentage, onChange: onChangePercentage },
	} = useController({ control, name: 'percentage', defaultValue: confKey?.percentage ?? 0 });

	const {
		field: { value: include, onChange: onChangeInclude },
	} = useController({ control, name: 'include', defaultValue: confKey?.include ?? [] });

	const {
		field: { value: exclude, onChange: onChangeExclude },
	} = useController({ control, name: 'exclude', defaultValue: confKey?.exclude ?? [] });

	const {
		field: { value: dangerous, onChange: onChangeDangerous },
	} = useController({ control, name: 'dangerous', defaultValue: !!confKey?.dangerous });

	const [includeInput, setIncludeInput] = useState<string>('');
	const [excludeInput, setExcludeInput] = useState<string>('');

	// Обработчики для полей пользователей
	const handleTagClose = (username: string, type: 'include' | 'exclude') => {
		if (type === 'include') {
			onChangeInclude(include.filter((t) => t !== username));
		} else {
			onChangeExclude(exclude.filter((t) => t !== username));
		}
	};

	const handleTagAdd = (username: string, type: 'include' | 'exclude') => {
		if (!username.trim()) return;

		if (type === 'include') {
			if (!include.includes(username)) {
				onChangeInclude([...include, username]);
				onChangeExclude(exclude.filter((n) => n !== username));
			}
			setIncludeInput('');
		} else {
			if (!exclude.includes(username)) {
				onChangeExclude([...exclude, username]);
				onChangeInclude(include.filter((n) => n !== username));
			}
			setExcludeInput('');
		}
	};

	// Отправка формы
	const handleSubmit = () => {
		const formValues = getValues();
		if (confKey) {
			update({ formValues }).then((newData) => reset(newData));
		} else {
			create({ formValues }).finally();
		}
	};

	const handleReset = () => {
		reset();
	};

	const disabled = confKey && confKey?.owner._id !== authData?._id;

	return (
		<div className={s.wrapper}>
			<Title level={3}>{confKey?.name ? <CopyLabel text={confKey.name} /> : 'Новый ключ'}</Title>

			{error && <Alert className={s.error} message={error} type="error" showIcon />}

			{/* Сообщение об отсутсвии прав */}
			{disabled && (
				<Alert
					className={s.error}
					message="У вас нет прав на редактирование этого ключа. Обратитесь к владельцу"
					type="error"
					showIcon
				/>
			)}

			<Form layout="vertical" className={s.form} disabled={disabled}>
				{/* Название ключа */}
				{!confKey && (
					<Form.Item label="Название ключа" required>
						<Input value={name} onChange={onChangeName} placeholder="Введите название ключа" />
					</Form.Item>
				)}

				{/* Опасный ключ */}
				{(!confKey || dangerous) && (
					<Form.Item>
						{!confKey && (
							<Checkbox
								checked={dangerous}
								onChange={onChangeDangerous}
								style={{ color: dangerous ? 'red' : 'inherit' }}
							>
								Опасный ключ
							</Checkbox>
						)}
						{dangerous && (
							<Alert
								className={s.alert}
								message="Изменения этого ключа могут повлиять на критическую функциональность"
								type="error"
								showIcon
							/>
						)}
					</Form.Item>
				)}

				{/* Раскатка на пользователей */}
				<Form.Item label={'Раскатка на процент пользователей:'}>
					<div className={s.percentage}>
						<Slider
							className={s.slider}
							min={0}
							max={100}
							value={percentage}
							onChange={onChangePercentage}
						/>
						<InputNumber min={0} max={100} value={percentage} onChange={onChangePercentage} />
					</div>
				</Form.Item>

				{/* Описание ключа */}
				<Form.Item label="Описание">
					<TextArea
						rows={4}
						className={s.textarea}
						value={description}
						onChange={onChangeDescription}
						placeholder="Добавьте описание ключа"
					/>
				</Form.Item>

				{/* Принудительно включить пользователей */}
				<Form.Item label="Принудительно раскатить на пользователей:">
					<Space direction="vertical" className={s.userSelect}>
						<Input
							value={includeInput}
							onChange={(e) => setIncludeInput(e.target.value)}
							onPressEnter={() => handleTagAdd(includeInput, 'include')}
							onBlur={() => handleTagAdd(includeInput, 'include')}
							placeholder="Введите userID или username и нажмите Enter"
						/>
						<Space wrap>
							{include.map((user) => (
								<Tag
									closable={!disabled}
									closeIcon={<CloseOutlined />}
									onClose={() => handleTagClose(user, 'include')}
									key={`include-${user}`}
								>
									{user}
								</Tag>
							))}
						</Space>
					</Space>
				</Form.Item>

				{/* Принудительно исключить пользователей */}
				<Form.Item label="Принудительно исключить пользователей:">
					<Space direction="vertical" className={s.userSelect}>
						<Input
							value={excludeInput}
							onChange={(e) => setExcludeInput(e.target.value)}
							onPressEnter={() => handleTagAdd(excludeInput, 'exclude')}
							onBlur={() => handleTagAdd(excludeInput, 'exclude')}
							placeholder="Введите userID или username и нажмите Enter"
						/>
						<Space wrap>
							{exclude.map((user) => (
								<Tag
									closable={!disabled}
									closeIcon={<CloseOutlined />}
									onClose={() => handleTagClose(user, 'exclude')}
									key={`exclude-${user}`}
								>
									{user}
								</Tag>
							))}
						</Space>
					</Space>
				</Form.Item>

				<div className={s.spaceDivider} />

				<div className={s.buttonContainer}>
					<Button onClick={handleReset} className={s.secondary} disabled={!isDirty}>
						Сбросить
					</Button>
					<Button
						type="primary"
						onClick={handleSubmitContext(handleSubmit)}
						disabled={disabled || confKey ? !isDirty : !isValid || !isDirty}
						loading={isLoading}
					>
						Сохранить
					</Button>
				</div>
			</Form>
		</div>
	);
};
