import { Link } from 'react-router-dom';
import { useUserStore } from 'entities/User';
import { RoutesPaths } from 'shared/const';
import { Button } from 'shared/ui';
import s from './Sidebar.module.scss';

export const Sidebar = () => {
	const { authData } = useUserStore();

	// TODO delete mock
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

			<Link to={''}>
				<Button className={s.secondaryButton}> Поиск id в ключах </Button>
			</Link>

			<Link to={''}>
				<Button className={s.secondaryButton}> История изменений </Button>
			</Link>
		</div>
	);
};
