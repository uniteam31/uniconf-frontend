import { RouteProps } from 'react-router-dom';
import { CreateKeyPage } from 'pages/CreateKeyPage';
import { KeyPage } from 'pages/KeyPage';
import { LoginPage } from 'pages/LoginPage';
import { MainPage } from 'pages/MainPage';

export type AppRoutesProps = RouteProps & {
	authOnly?: boolean;
};

/** Конфигурация путей всего приложения */
export enum Routes {
	MAIN = 'main',
	LOGIN = 'login',
	KEY = 'key',
	CREATE_KEY = 'createKey',
}

export type Path = '/' | '/login' | '/keys/:id' | '/create/key';

export const RoutesPaths: Record<Routes, Path> = {
	[Routes.MAIN]: '/',
	[Routes.LOGIN]: '/login',
	[Routes.KEY]: '/keys/:id',
	[Routes.CREATE_KEY]: '/create/key',
	// // 404
	// [Routes.NOT_FOUND]: '*',
};

export const routerConfig: Record<Routes, AppRoutesProps> = {
	[Routes.MAIN]: {
		path: RoutesPaths.main,
		element: <MainPage />,
		authOnly: true,
	},
	[Routes.LOGIN]: {
		path: RoutesPaths.login,
		element: <LoginPage />,
	},
	[Routes.KEY]: {
		path: RoutesPaths.key,
		element: <KeyPage />,
		authOnly: true,
	},
	[Routes.CREATE_KEY]: {
		path: RoutesPaths.createKey,
		element: <CreateKeyPage />,
		authOnly: true,
	},
	// [Routes.NOT_FOUND]: {
	// 	path: RoutesPaths.notFound,
	// 	element: <NotFoundPage />,
	// },
};
