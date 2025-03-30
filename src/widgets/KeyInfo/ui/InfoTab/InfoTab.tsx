import { UserOutlined, ClockCircleOutlined, NumberOutlined, EditOutlined } from '@ant-design/icons';
import { Typography, Avatar, Space, Divider } from 'antd';
import { useKeyStore } from 'entities/Key';
import { formatDate } from 'shared/lib';
import s from './InfoTab.module.scss';

const { Title, Text } = Typography;

export const InfoTab = () => {
	const { key: confKey } = useKeyStore();

	if (!confKey) return null;

	return (
		<>
			<Title level={4}>Обзор ключа</Title>

			{/* Метаданные */}
			<Space size="middle" direction="vertical" className={s.metadata}>
				<Space>
					<NumberOutlined />
					Номер ключа: <span className={s.bold}>{confKey.number}</span>
				</Space>

				<Space>
					<ClockCircleOutlined />
					Создан: <span className={s.bold}>{formatDate(confKey.createdAt)}</span>
				</Space>

				<Space>
					<EditOutlined />
					Обновлён: <span className={s.bold}>{formatDate(confKey.updatedAt)}</span>
				</Space>
			</Space>

			{/* Описание */}
			<Divider orientation="left">Описание ключа</Divider>
			<Text type="secondary" className={s.description}>
				{confKey.description || 'Описание отсутствует'}
			</Text>

			{/* Создатель */}
			<Divider orientation="left">Создатель ключа</Divider>
			<Space size="middle">
				<Avatar icon={<UserOutlined />} className={s.avatar} />
				<Text strong>{confKey.owner.publicName}</Text>
			</Space>
		</>
	);
};
