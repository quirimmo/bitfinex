import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import './app-navigation.presentational.scss';

interface IAppNavigationState {
	isMenuOpen: boolean;
}

class AppNavigation extends React.Component<any, IAppNavigationState> {
	constructor(props: any) {
		super(props);
		this.state = { isMenuOpen: false };
	}

	public render() {
		return (
			<nav>
				<Menu isOpen={this.state.isMenuOpen}>
					<NavLink className="menu-nav-item" to="/">
						Home
					</NavLink>
				</Menu>
			</nav>
		);
	}
}

export default AppNavigation;
