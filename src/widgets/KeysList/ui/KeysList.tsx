import { UserOutlined } from '@ant-design/icons';
import { Table, Space, Tag, Typography, Avatar } from 'antd';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IKey } from 'entities/Key';
import { formatDate } from 'shared/lib';
import { useSearchKeys } from '../api/useSearchKeys';

const { Text } = Typography;

interface IProps {
	searchQuery: string;
}

export const KeysList = ({ searchQuery }: IProps) => {
	const { isLoading, search, keys } = useSearchKeys();

	useEffect(() => {
		search(searchQuery);
	}, [searchQuery]);

	const columns = [
		{
			title: 'No.',
			key: 'number',
			width: 1, // minimal width
			render: (record: IKey) => record.number,
			sorter: (a: IKey, b: IKey) => a.number - b.number,
		},
		{
			title: 'Ключ',
			dataIndex: 'name',
			key: 'name',
			render: (name: string, record: IKey) => (
				<Space direction="vertical">
					<Link to={`keys/${name}`}>{name}</Link>
					<Space size={8}>
						<Tag color={record.dangerous ? 'red' : 'blue'}>{record.percentage}%</Tag>
						{record.include.length > 0 && <Tag color="green">+ {record.include.length} id</Tag>}
						{record.exclude.length > 0 && <Tag color="orange">- {record.exclude.length} id</Tag>}
					</Space>
				</Space>
			),
			sorter: (a: IKey, b: IKey) => a.name.localeCompare(b.name),
		},
		{
			title: 'Владелец',
			dataIndex: 'owner',
			key: 'owner',
			render: (author: IKey['owner']) => (
				<Space>
					<Avatar size="small" style={{ backgroundColor: '#1890ff' }} icon={<UserOutlined />} />
					<Text>{author.publicName}</Text>
				</Space>
			),
			sorter: (a: IKey, b: IKey) => a.owner.publicName.localeCompare(b.owner.publicName),
		},
		{
			title: 'Обновлён',
			dataIndex: 'updatedAt',
			key: 'updatedAt',
			render: (date: string) => formatDate(date),
			sorter: (a: IKey, b: IKey) =>
				new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
		},
		{
			title: 'Действия',
			key: 'actions',
			render: (record: IKey) => <Link to={`keys/${record.name}`}>Подробнее</Link>,
		},
	];

	return (
		<Table
			columns={columns}
			dataSource={keys}
			rowKey="key"
			loading={isLoading}
			pagination={{ pageSize: 7 }}
			bordered
		/>
	);
};
