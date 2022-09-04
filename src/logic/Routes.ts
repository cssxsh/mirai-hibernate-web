import {
	BotFilterOptions, DirectMessageFilterOptions, GroupMessageFilterOptions,
	isBotFilterOptions,
	isDirectMessageFilterOptions,
	isGroupMessageFilterOptions,
	isKindFilterOptions, isTemporaryMessageFilterOptions,
	KindFilterOptions,
	MessageFilterOptions,
	MessageRecord, TemporaryMessageFilterOptions,
} from '../types';

interface RemoteResponse {
	code: number;
	msg: string;
	data?: object;
}

async function fetchDataFromRemote(url: string, expectNonZeroStatusCode = false): Promise<RemoteResponse> {
	const response = await fetch(url);
	const responseBody = await response.json();
	const coercedResult = responseBody as RemoteResponse;

	if (coercedResult.code !== 0 && !expectNonZeroStatusCode) {
		throw coercedResult;
	} else {
		return coercedResult;
	}
}

async function fetchMessage(url: string): Promise<Array<MessageRecord>> {
	const response = await fetchDataFromRemote(url);

	return response.data as MessageRecord[];
}

async function fetchMessagesByKind(filter: KindFilterOptions): Promise<Array<MessageRecord>> {
	return fetchMessage(`/message/kind?kind=${filter.kind}&start=${filter.from}&end=${filter.to}`);
}

async function fetchMessagesByBot(filter: BotFilterOptions): Promise<Array<MessageRecord>> {
	return fetchMessage(`/message/bot?bot=${filter.bot}&start=${filter.from}&end=${filter.to}`);
}

async function fetchMessagesByGroup(filter: GroupMessageFilterOptions): Promise<Array<MessageRecord>> {
	return fetchMessage(`/message/group?bot=${filter.bot}&group=${filter.group}&start=${filter.from}&end=${filter.to}`);
}

async function fetchMessagesByFriend(filter: DirectMessageFilterOptions): Promise<Array<MessageRecord>> {
	return fetchMessage(`/message/group?bot=${filter.bot}&friend=${filter.account}&start=${filter.from}&end=${filter.to}`);
}

async function fetchMessagesByTemporarySession(filter: TemporaryMessageFilterOptions): Promise<Array<MessageRecord>> {
	return fetchMessage(`/message/member?bot=${filter.bot}&group=${filter.group}&member=${filter.account}&start=${filter.from}&end=${filter.to}`);
}

export async function fetchMessages(filter: MessageFilterOptions): Promise<Array<MessageRecord>> {
	console.log(filter);

	if (isKindFilterOptions(filter)) {
		return fetchMessagesByKind(filter);
	}

	if (isBotFilterOptions(filter)) {
		return fetchMessagesByBot(filter);
	}

	if (isGroupMessageFilterOptions(filter)) {
		return fetchMessagesByGroup(filter);
	}

	if (isDirectMessageFilterOptions(filter)) {
		return fetchMessagesByFriend(filter);
	}

	if (isTemporaryMessageFilterOptions(filter)) {
		return fetchMessagesByTemporarySession(filter);
	}

	console.error("Invalid message fetch filter predicate!");
	return [];
}

export async function fetchKnownBots(): Promise<Array<number>> {
	const data = await fetchDataFromRemote('/archive/bot');

	return data.data as Array<number>;
}
