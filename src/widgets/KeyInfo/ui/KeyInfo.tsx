import { Tabs } from 'antd';
import { useState } from 'react';
import { InfoTab } from './InfoTab/InfoTab';
import s from './KeyInfo.module.scss';

const { TabPane } = Tabs;

export const KeyInfo = () => {
	const [activeTab, setActiveTab] = useState<string>('info');

	return (
		<div className={s.container}>
			<Tabs activeKey={activeTab} onChange={setActiveTab}>
				<TabPane tab="Информация" key="info">
					<InfoTab />
				</TabPane>

				<TabPane tab="История" key="history" disabled />
				<TabPane tab="A/B Тесты" key="abtest" disabled />
			</Tabs>
		</div>
	);
};
