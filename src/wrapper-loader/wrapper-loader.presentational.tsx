import * as React from 'react';
import './wrapper-loader.presentational.scss';
// @ts-ignore
import * as loader from './dollar-loading.gif';

export interface IWrapperLoaderProps {
	isLoading: boolean;
	imageSrc?: string;
	position: 'fixed' | 'absolute';
}

export class WrapperLoader extends React.Component<IWrapperLoaderProps, any> {
	constructor(props: IWrapperLoaderProps) {
		super(props);
	}

	public render() {
		const imageSrc = this.props.imageSrc || loader;
		return (
			<div className={this.props.isLoading ? 'generic-abstract-loader-wrapper' : ''}>
				{this.props.isLoading && (
					<div style={{ position: this.props.position }} className="generic-abstract-loader">
						<img src={imageSrc} />
					</div>
				)}
				{this.props.children}
			</div>
		);
	}
}
