import { GlobalWithFetchMock } from 'jest-fetch-mock';

const customGlobal: GlobalWithFetchMock = (global as unknown) as GlobalWithFetchMock;

const WebSocket = require('ws');
global.WebSocket = WebSocket;

customGlobal.fetch = require('jest-fetch-mock');
customGlobal.fetchMock = customGlobal.fetch;

