import { SearchOutlined } from '@ant-design/icons';
import { Input, Typography } from 'antd';
import classNames from 'classnames';
import React, { useState } from 'react';
import { KeysList } from 'widgets/KeysList';
import s from './MainPage.module.scss';

const { Search } = Input;
const { Title } = Typography;

export const MainPage = () => {
	const [search, setSearch] = useState('');

	return (
		<div className={classNames(s.page, 'Page')}>
			<Title level={3} className={s.title}>
				Поиск ключей
			</Title>

			<Search
				className={s.search}
				placeholder="Поиск по названию ключа или автору"
				allowClear
				enterButton
				size="large"
				prefix={<SearchOutlined />}
				onChange={(e) => setSearch(e.target.value)}
			/>

			<KeysList searchQuery={search} />
		</div>
	);
};
