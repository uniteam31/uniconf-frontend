import React from 'react';
import { useForm } from 'react-hook-form';
import type { IKey, IKeyFormField } from 'entities/Key';
import { FormWrapper } from 'shared/lib';
import { KeyForm } from '../KeyForm/KeyForm';
import s from './KeyFormWrapper.module.scss';

interface IProps {
	confKey?: IKey;
}

export const KeyFormWrapper = (props: IProps) => {
	const methods = useForm<IKeyFormField>();

	return (
		<div className={s.container}>
			<FormWrapper methods={methods}>
				<KeyForm {...props} />
			</FormWrapper>
		</div>
	);
};
