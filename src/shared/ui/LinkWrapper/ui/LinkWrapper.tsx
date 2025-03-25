import type { ReactNode } from 'react';

interface IProps {
	to: string;
	disabled?: boolean;
	children: React.ReactNode;
}

export const LinkWrapper = ({ children }: IProps) => {
	const onClick = () => {};

	return children;
};
