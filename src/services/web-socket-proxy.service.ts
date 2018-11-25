import { SOCKET_URL } from './../constants/web-socket-proxy.constants';
import { fromEvent, Observable, Subject, of } from 'rxjs';

export class WebSocketProxy {
	public static socket: WebSocket;
	public static streamObservable: Subject<any>;
	public static isConnected: boolean;
	public static tradesChannelObservable: Subject<any>;
	public static tradesChannelId: number;
	public static booksChannelObservable: Subject<any>;
	public static booksChannelId: number;

	public static connect(): Observable<any> {
		WebSocketProxy.streamObservable = new Subject<any>();
		WebSocketProxy.socket = new WebSocket(SOCKET_URL);
		WebSocketProxy.subscribeToSocketEvents();
		return fromEvent(WebSocketProxy.socket, 'open');
	}

	public static subscribeToSocketEvents() {
		fromEvent(WebSocketProxy.socket, 'open').subscribe(WebSocketProxy.onConnectSubscribe);
		fromEvent(WebSocketProxy.socket, 'close').subscribe(WebSocketProxy.onDisconnectSubscribe);
		fromEvent(WebSocketProxy.socket, 'message').subscribe(WebSocketProxy.onMessageSubscribe);
		fromEvent(WebSocketProxy.socket, 'error').subscribe(WebSocketProxy.onErrorSubscribe);
	}

	public static onConnectSubscribe(): void {
		console.log('Socket: connected');
		WebSocketProxy.isConnected = true;
	}

	public static subscribeToTradesChannel(symbol: string): Subject<any> {
		WebSocketProxy.tradesChannelObservable = new Subject<any>();
		WebSocketProxy.sendMessage(
			JSON.stringify({
				event: 'subscribe',
				channel: 'trades',
				symbol
			})
		);
		return WebSocketProxy.tradesChannelObservable;
	}

	public static subscribeToBooksChannel(symbol: string): Subject<any> {
		WebSocketProxy.booksChannelObservable = new Subject<any>();
		WebSocketProxy.sendMessage(
			JSON.stringify({
				event: 'subscribe',
				channel: 'book',
				symbol
			})
		);
		return WebSocketProxy.booksChannelObservable;
	}

	public static onDisconnectSubscribe(): void {
		console.log('Socket: disconnected');
		WebSocketProxy.isConnected = false;
	}

	public static onMessageSubscribe(message: any): void {
		const receivedData: any = JSON.parse(message.data);
		if (receivedData.event === 'subscribed') {
			if (receivedData.channel === 'trades') {
				WebSocketProxy.tradesChannelId = receivedData.chanId;
			} else if (receivedData.channel === 'book') {
				WebSocketProxy.booksChannelId = receivedData.chanId;
			}
		}

		if (Array.isArray(receivedData)) {
			if (receivedData[0] === WebSocketProxy.tradesChannelId) {
				if (receivedData[1] !== 'hb') {
					// received some "te" "tu" value sometimes so filtering out it
					if (typeof receivedData[1] !== 'string') {
						WebSocketProxy.tradesChannelObservable.next(receivedData[1]);
					} else {
						WebSocketProxy.tradesChannelObservable.next([receivedData[2]]);
					}
				}
			} else if (receivedData[0] === WebSocketProxy.booksChannelId) {
				if (receivedData[1] !== 'hb') {
					WebSocketProxy.booksChannelObservable.next(receivedData[1]);
				}
			}
		}
	}

	public static onErrorSubscribe(err: any): void {
		console.log('Socket: error received', err);
	}

	public static disconnect(): Observable<any> {
		return of(WebSocketProxy.socket.close());
	}

	public static sendMessage(data: string | ArrayBuffer | Blob | ArrayBufferView): void {
		WebSocketProxy.socket.send(data);
	}
}
