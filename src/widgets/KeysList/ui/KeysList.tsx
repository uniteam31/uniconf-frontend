import { UserOutlined } from '@ant-design/icons';
import { Table, Space, Tag, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { IKey } from 'entities/Key';
import { formatDate } from 'shared/lib';

const { Text } = Typography;

interface IProps {
	search: string;
}

export const KeysList = ({ search }: IProps) => {
	const loading = false;

	const columns = [
		{
			title: 'No.',
			key: 'number',
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
						<Tag color="blue">{record.percentage}%</Tag>
						{record.include.length > 0 && <Tag color="green">+ {record.include.length} id</Tag>}
						{record.exclude.length > 0 && <Tag color="orange">- {record.exclude.length} id</Tag>}
					</Space>
				</Space>
			),
			sorter: (a: IKey, b: IKey) => a.name.localeCompare(b.name),
		},
		{
			title: 'Создатель',
			dataIndex: 'author',
			key: 'author',
			render: (author: IKey['author']) => (
				<Space>
					<Avatar size="small" style={{ backgroundColor: '#1890ff' }} icon={<UserOutlined />} />
					<Text>{author.firstName}</Text>
				</Space>
			),
			sorter: (a: IKey, b: IKey) => a.author.firstName.localeCompare(b.author.firstName),
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
			dataSource={mockData}
			rowKey="key"
			loading={loading}
			pagination={{ pageSize: 7 }}
			bordered
		/>
	);
};

const mockData: IKey[] = [
	{
		_id: '',
		number: 4,
		description: '',
		name: 'new_payment_system',
		percentage: 75,
		include: ['user_123', 'admin_456'],
		exclude: ['test_789'],
		author: {
			_id: '',
			firstName: 'Админ',
			username: 'a.petrov@example.com',
		},
		updatedAt: '2023-11-20T09:45:00Z',
		createdAt: '2023-11-20T09:45:00Z',
	},
	{
		_id: '',
		description: '',
		number: 1,
		name: 'new_payment_system',
		percentage: 75,
		include: ['user_123', 'admin_456'],
		exclude: ['test_789'],
		author: {
			_id: '',
			firstName: 'Админ ',
			username: 'a.petrov@example.com',
		},
		updatedAt: '2023-11-20T09:45:00Z',
		createdAt: '2023-11-20T09:45:00Z',
	},
	{
		_id: '',
		description: '',
		number: 3,
		name: 'new_payment_system',
		percentage: 75,
		include: ['user_123', 'admin_456'],
		exclude: ['test_789'],
		author: {
			_id: '',
			firstName: 'Админ',
			username: 'a.petrov@example.com',
		},
		updatedAt: '2023-11-20T09:45:00Z',
		createdAt: '2023-11-20T09:45:00Z',
	},
	{
		_id: '',
		description: '',
		number: 2,
		name: 'new_payment_system',
		percentage: 75,
		include: ['user_123', 'admin_456'],
		exclude: ['test_789'],
		author: {
			_id: '',
			firstName: 'Админ ',
			username: 'a.petrov@example.com',
		},
		updatedAt: '2023-11-20T09:45:00Z',
		createdAt: '2023-11-20T09:45:00Z',
	},
];
