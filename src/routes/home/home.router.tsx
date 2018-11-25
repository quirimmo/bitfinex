import * as React from 'react';
import HomeContainer from '../../home/home.container';
import { withRouter } from 'react-router';

/**
 * Home Router Component.
 * This component represents the home route.
 * The meaning of this component is to be the main component associated to the current route (we can call it as "Home Page" for example).
 * The router components are responsible for accessing any info related to the routing,
 * and then pass them to the real component displayed in the page.
 * Do not provide any additional info or rendering here. Do that in the Home Component instead.
 * @export
 * @class HomeRouter
 * @extends {React.Component<any, any>}
 */
export class HomeRouter extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
	}

	public render() {
		return <HomeContainer />;
	}
}

export default withRouter(HomeRouter);
