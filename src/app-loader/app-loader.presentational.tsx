import * as React from 'react';
import { WrapperLoader } from './../wrapper-loader/wrapper-loader.presentational';
import './app-loader.presentational.scss';

export interface IAppLoaderProps {
	isLoading: boolean;
}

export class AppLoader extends React.Component<IAppLoaderProps, any> {
	constructor(props: IAppLoaderProps) {
		super(props);
	}

	public render() {
		if (!this.props.isLoading) {
			return null;
		}
		return (
			<WrapperLoader position="fixed" isLoading={this.props.isLoading}>
				<div className="app-loader" />
			</WrapperLoader>
		);
	}
}
