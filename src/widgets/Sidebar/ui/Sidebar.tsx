import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useUserStore } from 'entities/User';
import { RoutesPaths } from 'shared/const';
import { Button } from 'shared/ui';
import s from './Sidebar.module.scss';

export const Sidebar = () => {
	const { authData } = useUserStore();

	if (!authData) {
		return null;
	}

	return (
		<div className={s.sidebar}>
			<Link to={RoutesPaths.createKey}>
				<Button> Создать ключ </Button>
			</Link>

			<Link to={RoutesPaths.main}>
				<Button className={s.secondaryButton}> Коллекция ключей </Button>
			</Link>

			<Button className={classNames(s.secondaryButton, s.disabled)}> Поиск id в ключах </Button>

			<Button className={classNames(s.secondaryButton, s.disabled)}> История изменений </Button>
		</div>
	);
};
