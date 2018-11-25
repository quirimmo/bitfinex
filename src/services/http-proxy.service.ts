import axios, { AxiosStatic, AxiosRequestConfig, AxiosPromise } from 'axios';
import { Observable, Subject } from 'rxjs';

/**
 * Static class used for interfacing with your api.
 * It is a really generic class which provides few methods already implemented, like GET, PUT, POST and DELETE.
 * It uses axios in order to perform the HTTP requests, but you are free to change it with your favourite one.
 * @class HTTPProxyService
 */
class HTTPProxyService {
	/**
	 * Reference to the axios object of the axios library.
	 * @static
	 * @type {AxiosStatic}
	 * @memberof HTTPProxyService
	 */
	public static axios: AxiosStatic = axios;

	/**
	 * Perform a HTTP GET request to the given url with the given axios configuration,
	 * and return an AxiosPromise, which is a sub class of standard Promise class
	 * @static
	 * @param {string} url The url where to perform the GET request
	 * @param {AxiosRequestConfig} [config] The AxiosRequestConfig object to be used for the GET request
	 * @returns {AxiosPromise<any>}
	 * @memberof HTTPProxyService
	 */
	public static get(url: string, config?: AxiosRequestConfig): Observable<any> {
		const subject: Subject<any> = new Subject<any>();
		HTTPProxyService.axios.get(url, config).then(onSuccess, onError);
		return subject.asObservable();

		function onSuccess(resp: any) {
			subject.next(resp.data);
			subject.complete();
		}

		function onError(err: any) {
			subject.error(err);
			subject.complete();
		}
	}
	/**
	 * Perform a HTTP POST request to the given url with the given data,
	 * and return an AxiosPromise, which is a sub class of standard Promise class
	 * @static
	 * @param {string} url The url where to perform the POST request
	 * @param {*} [data={}] Custom object with the data to be passed for the POST request
	 * @returns {AxiosPromise<any>}
	 * @memberof HTTPProxyService
	 */
	public static post(url: string, data: any = {}): Observable<any> {
		const subject: Subject<any> = new Subject<any>();
		HTTPProxyService.axios.post(url, data).then(onSuccess, onError);
		return subject.asObservable();

		function onSuccess(resp: any) {
			subject.next(resp.data);
			subject.complete();
		}

		function onError(err: any) {
			subject.error(err);
			subject.complete();
		}
	}
	/**
	 * Perform a HTTP PUT request to the given url with the given data,
	 * and return an AxiosPromise, which is a sub class of standard Promise class
	 * @static
	 * @param {string} url The url where to perform the PUT request
	 * @param {*} [data={}] Custom object with the data to be passed for the PUT request
	 * @returns {AxiosPromise<any>}
	 * @memberof HTTPProxyService
	 */
	public static put(url: string, data: any = {}): Observable<any> {
		const subject: Subject<any> = new Subject<any>();
		HTTPProxyService.axios.put(url, data).then(onSuccess, onError);
		return subject.asObservable();

		function onSuccess(resp: any) {
			subject.next(resp.data);
			subject.complete();
		}

		function onError(err: any) {
			subject.error(err);
			subject.complete();
		}
	}
	/**
	 * Perform a HTTP DELETE request to the given url with the given data,
	 * and return an AxiosPromise, which is a sub class of standard Promise class
	 * @static
	 * @param {string} url The url where to perform the DELETE request
	 * @returns {AxiosPromise<any>}
	 * @memberof HTTPProxyService
	 */
	public static delete(url: string): Observable<any> {
		const subject: Subject<any> = new Subject<any>();
		HTTPProxyService.axios.delete(url).then(onSuccess, onError);
		return subject.asObservable();

		function onSuccess(resp: any) {
			subject.next(resp.data);
			subject.complete();
		}

		function onError(err: any) {
			subject.error(err);
			subject.complete();
		}
	}

	/**
	 * Being only a static class, we are keeping the constructor private in order to prevent to be called from outside
	 */
	private constructor() {}
}

export default HTTPProxyService;
