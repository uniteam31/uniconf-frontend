import { Suspense } from 'react';
import { useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoadScreen } from 'shared/ui';
import { routerConfig } from '../routerConfig/routerConfig';
import type { AppRoutesProps } from '../routerConfig/routerConfig';
import { RequireAuth } from './RequireAuth';

/** Рендерит все маршруты и проставляет разрешения на просмотр. Также показывает LoadScreen при загрузке
 * новой страницы с сервисом */
export const AppRouter = () => {
	const renderWithWrapper = useCallback((route: AppRoutesProps) => {
		const element = (
			// TODO default uniconf icon
			<Suspense fallback={<LoadScreen label="UNICONF" />}>
				{route.element}
			</Suspense>
		);

		return (
			<Route
				key={route.path}
				path={route.path}
				element={route.authOnly ? <RequireAuth>{element}</RequireAuth> : element}
			/>
		);
	}, []);

	return <Routes>{Object.values(routerConfig).map(renderWithWrapper)}</Routes>;
};
