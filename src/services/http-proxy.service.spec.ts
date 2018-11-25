import axios, { AxiosRequestConfig } from 'axios';
import { Subject } from 'rxjs';
const mockNext = jest.spyOn(Subject.prototype, 'next');
const mockComplete = jest.spyOn(Subject.prototype, 'complete');
const mockError = jest.spyOn(Subject.prototype, 'error');
import HTTPProxyService from './http-proxy.service';

const fakeUrl: string = 'http://fake.url';
const results = { data: ['data'] };

describe('HttpProxyService', () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.runOnlyPendingTimers();
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(HTTPProxyService).toBeDefined();
	});

	it('should define the attributes', () => {
		expect(HTTPProxyService.axios).toBeDefined();
		expect(HTTPProxyService.axios).toEqual(axios);
	});

	it('should define the public methods', () => {
		expect(typeof HTTPProxyService.get).toEqual('function');
		expect(typeof HTTPProxyService.post).toEqual('function');
		expect(typeof HTTPProxyService.put).toEqual('function');
		expect(typeof HTTPProxyService.delete).toEqual('function');
	});

	describe('get', () => {
		const getConfig: AxiosRequestConfig = {};
		it('should call the axios.get method', () => {
			const mockGet = jest.spyOn(axios, 'get').mockResolvedValue(results);
			HTTPProxyService.get(fakeUrl, getConfig);
			expect(mockGet).toHaveBeenCalledWith(fakeUrl, getConfig);
		});

		it('should call the next and complete methods of Subject', async () => {
			jest.spyOn(axios, 'get').mockResolvedValue(results);
			await HTTPProxyService.get(fakeUrl, getConfig);
			expect(mockNext).toHaveBeenCalledWith(['data']);
			expect(mockComplete).toHaveBeenCalled();
		});

		it('should call the error and complete methods of Subject', async () => {
			jest.spyOn(axios, 'get').mockRejectedValue('fatal error');
			await HTTPProxyService.get(fakeUrl, getConfig);
			expect(mockError).toHaveBeenCalledWith('fatal error');
			expect(mockComplete).toHaveBeenCalled();
		});
	});

	describe('post', () => {
		it('should call the axios.post method', () => {
			const mockPost = jest.spyOn(axios, 'post').mockResolvedValue(results);
			const data: any = {};
			HTTPProxyService.post(fakeUrl, data);
			expect(mockPost).toHaveBeenCalledWith(fakeUrl, data);
		});

		it('should call the next and complete methods of Subject', async () => {
			jest.spyOn(axios, 'post').mockResolvedValue(results);
			const data: any = {};
			await HTTPProxyService.post(fakeUrl, data);
			expect(mockNext).toHaveBeenCalledWith(['data']);
			expect(mockComplete).toHaveBeenCalled();
		});

		it('should call the error and complete methods of Subject', async () => {
			jest.spyOn(axios, 'post').mockRejectedValue('fatal error');
			const data: any = {};
			await HTTPProxyService.post(fakeUrl, data);
			expect(mockError).toHaveBeenCalledWith('fatal error');
			expect(mockComplete).toHaveBeenCalled();
		});
	});

	describe('put', () => {
		it('should call the axios.put method', () => {
			const mockPut = jest.spyOn(axios, 'put').mockResolvedValue(results);
			const data: any = {};
			HTTPProxyService.put(fakeUrl, data);
			expect(mockPut).toHaveBeenCalledWith(fakeUrl, data);
		});

		it('should call the next and complete methods of Subject', async () => {
			jest.spyOn(axios, 'put').mockResolvedValue(results);
			const data: any = {};
			await HTTPProxyService.put(fakeUrl, data);
			expect(mockNext).toHaveBeenCalledWith(['data']);
			expect(mockComplete).toHaveBeenCalled();
		});

		it('should call the error and complete methods of Subject', async () => {
			jest.spyOn(axios, 'put').mockRejectedValue('fatal error');
			const data: any = {};
			await HTTPProxyService.put(fakeUrl, data);
			expect(mockError).toHaveBeenCalledWith('fatal error');
			expect(mockComplete).toHaveBeenCalled();
		});
	});

	describe('delete', () => {
		it('should call the axios.put method', () => {
			const mockDelete = jest.spyOn(axios, 'delete').mockResolvedValue(results);
			HTTPProxyService.delete(fakeUrl);
			expect(mockDelete).toHaveBeenCalledWith(fakeUrl);
		});

		it('should call the next and complete methods of Subject', async () => {
			jest.spyOn(axios, 'delete').mockResolvedValue(results);
			await HTTPProxyService.delete(fakeUrl);
			expect(mockNext).toHaveBeenCalledWith(['data']);
			expect(mockComplete).toHaveBeenCalled();
		});

		it('should call the error and complete methods of Subject', async () => {
			jest.spyOn(axios, 'delete').mockRejectedValue('fatal error');
			await HTTPProxyService.delete(fakeUrl);
			expect(mockError).toHaveBeenCalledWith('fatal error');
			expect(mockComplete).toHaveBeenCalled();
		});
	});
});
