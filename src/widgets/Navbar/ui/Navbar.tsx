import { useNavigate } from 'react-router-dom';
import { RoutesPaths } from 'shared/const';
import s from './Navbar.module.scss';

export const Navbar = () => {
	const navigate = useNavigate();
	const onTitleClick = () => navigate(RoutesPaths.main);

	return (
		<div className={s.navbar}>
			<div onClick={onTitleClick} className={s.title}>
				UNICONF
			</div>

			<div className={s.curUser}>Admin</div>
		</div>
	);
};
