import { UserOutlined, LogoutOutlined, SettingOutlined, DownOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu, Space, Typography } from 'antd';
import type { MenuProps } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IUser } from 'entities/User';
import LogoIcon from 'shared/assets/icons/switch.svg';
import { RoutesPaths } from 'shared/const';
import s from './Navbar.module.scss';

const { Text } = Typography;

export const Navbar = () => {
	const navigate = useNavigate();
	// const { authData } = useKeyStore();

	// TODO Delete mock
	const authData: IUser = {
		_id: '',
		firstName: 'Admin',
		username: 'admin',
	};

	const onTitleClick = () => navigate(RoutesPaths.main);

	const handleLogout = () => {
		alert('Выход из системы');
	};

	const menuItems: MenuProps['items'] = [
		{
			key: 'user-info',
			label: (
				<Space direction="vertical" size={0}>
					<Text strong>{authData.firstName}</Text>
					<Text type="secondary">{authData.username}</Text>
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
			<div onClick={onTitleClick} className={s.title}>
				<LogoIcon className={s.icon} /> UNICONF
			</div>

			<Dropdown
				menu={{ items: menuItems }}
				placement="bottomRight"
				arrow={{ pointAtCenter: true }}
				trigger={['click']}
			>
				<Space style={{ cursor: 'pointer', padding: '0 12px' }}>
					<Avatar size="default" style={{ backgroundColor: '#1890ff' }} icon={<UserOutlined />} />
					<Text strong>{authData.firstName}</Text>
					<DownOutlined style={{ fontSize: 12, color: '#666' }} />
				</Space>
			</Dropdown>
		</div>
	);
};
