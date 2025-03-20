import React, { useEffect } from 'react';
import './styles/index.scss';
import { BrowserRouter } from 'react-router-dom';
import { useUserStore } from 'entities/User';
import { LoadScreen } from 'shared/ui';
import { AppRouter } from './providers/AppRouter';

// TODO импортировать .css после правки конфига
import '@uniteam31/uni-shared-ui/dist/esm/global.scss';

const App = () => {
	const { initAuthData, _init } = useUserStore();

	useEffect(() => {
		initAuthData();
	}, [initAuthData]);

	if (!_init) {
		return <LoadScreen label={'UniConf'} />;
	}

	return (
		<BrowserRouter>
			<div className="App">
				<AppRouter />
			</div>
		</BrowserRouter>
	);
};

export default App;
