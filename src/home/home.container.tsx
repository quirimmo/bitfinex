/**
 * Home Container component which is rendered by the Home Route Component when displaying the Home Route
 */
import { connect } from 'react-redux';
import Home from './home.presentational';
import IAppStore from './../store/i-app.store';

const mapStateToProps = (state: IAppStore, ownProps: any) => ({
	symbols: state.symbols
});

const mapDispatchToProps: any = (dispatch: any) => ({});

const HomeContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);

export default HomeContainer;
