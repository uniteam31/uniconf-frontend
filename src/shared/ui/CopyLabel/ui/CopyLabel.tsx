import { Tooltip } from 'antd';
import classNames from 'classnames';
import { useState } from 'react';
import CopyIcon from '../../../assets/icons/copy.svg';
import { copy } from '../../../lib';
import s from './CopyLabel.module.scss';

interface IProps {
	text: string;
	size?: number;
	onRight?: boolean;
	className?: string;
}

export const CopyLabel = (props: IProps) => {
	const { text, size = 24, onRight, className, ...restProps } = props;
	const [copied, setCopied] = useState(false);

	const handleCopyText = () => {
		copy(text).finally(() => {
			setCopied(true);
		});
	};

	const iconStyle = {
		width: size,
		height: size,
	};

	return (
		<span className={classNames(s.text, className)} {...restProps}>
			{onRight && text}
			<Tooltip title={copied ? 'Скопировано!' : 'Скопировать в буфер обмена'}>
				<CopyIcon
					className={s.icon}
					style={iconStyle}
					onClick={handleCopyText}
					onMouseLeave={() => setTimeout(() => setCopied(false), 300)}
				/>
			</Tooltip>
			{!onRight && text}
		</span>
	);
};
