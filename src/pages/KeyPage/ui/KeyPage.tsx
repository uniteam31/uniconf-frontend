import classNames from 'classnames';
import { KeyForm } from 'feature/KeyForm';
import { useEffect } from 'react';
import { NotFoundPage } from 'pages/NotFoundPage';
import { KeyInfo } from 'widgets/KeyInfo';
import { useKeyStore } from 'entities/Key';
import { Loader } from 'shared/ui';
import { useGetKey } from '../api/useGetKey';
import s from './KeyPage.module.scss';

export const KeyPage = () => {
	const { key, clearCurrentKey } = useKeyStore();
	const { isLoading } = useGetKey();

	useEffect(() => () => clearCurrentKey(), []);

	if (isLoading) {
		return <Loader className={s.loader} />;
	}

	if (!key) {
		return <NotFoundPage />;
	}

	return (
		<div className={classNames(s.page, 'Page')}>
			<KeyForm confKey={key} />
			<KeyInfo />
		</div>
	);
};
