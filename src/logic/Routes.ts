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

async function fetchMessage(url: string): Promise<Array<MessageRecord>> {
	const response = await fetch(url);
	const data = await response.json();

	return data as MessageRecord[];
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

	return [];
}
