import { UserOutlined, LogoutOutlined, DownOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Space, Typography } from 'antd';
import type { MenuProps } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from 'entities/User';
import LogoIcon from 'shared/assets/icons/switch.svg';
import { RoutesPaths } from 'shared/const';
import s from './Navbar.module.scss';

const { Text } = Typography;

export const Navbar = () => {
	const navigate = useNavigate();
	const { authData, logout } = useUserStore();

	const handleTitleClick = () => navigate(RoutesPaths.main);

	const handleLogout = () => logout();

	const menuItems: MenuProps['items'] = [
		{
			key: 'user-info',
			label: (
				<Space direction="vertical" size={0}>
					<Text strong>{authData?.publicName}</Text>
					<Text type="secondary">{authData?.username}</Text>
				</Space>
			),
			disabled: true,
		},
		{
			type: 'divider',
		},
		{
			key: 'logout',
			label: 'Выйти',
			icon: <LogoutOutlined />,
			onClick: handleLogout,
			danger: true,
		},
	];

	return (
		<div className={s.navbar}>
			<div onClick={handleTitleClick} className={s.title}>
				<LogoIcon className={s.icon} /> UNICONF
			</div>

			{authData && (
				<Dropdown
					menu={{ items: menuItems }}
					placement="bottomRight"
					arrow={{ pointAtCenter: true }}
					trigger={['click']}
				>
					<Space style={{ cursor: 'pointer', padding: '0 12px' }}>
						<Avatar size="default" style={{ backgroundColor: '#1890ff' }} icon={<UserOutlined />} />
						<Text strong>{authData.publicName}</Text>
						<DownOutlined style={{ fontSize: 12, color: '#666' }} />
					</Space>
				</Dropdown>
			)}
		</div>
	);
};
