import { connect } from 'react-redux';
import { AppLoader } from './app-loader.presentational';
import IAppStore from './../store/i-app.store';

const mapStateToProps = (state: IAppStore, ownProps: any) => ({
	isLoading: state.isLoading
});

const mapDispatchToProps: any = (dispatch: any) => ({});

const AppLoaderContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(AppLoader);

export default AppLoaderContainer;
