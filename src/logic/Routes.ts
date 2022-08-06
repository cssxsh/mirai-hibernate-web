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

async function fetchMessagesByKind(filter: KindFilterOptions): Promise<Array<MessageRecord>> {
	const response = await fetch(`/message/kind?kind=${filter.kind}&start=${filter.from}&end=${filter.to}`);
	const data = await response.json();

	return data as MessageRecord[];
}

async function fetchMessagesByBot(filter: BotFilterOptions): Promise<Array<MessageRecord>> {
	const response = await fetch(`/message/bot?bot=${filter.bot}&start=${filter.from}&end=${filter.to}`);
	const data = await response.json();

	return data as MessageRecord[];
}

async function fetchMessagesByGroup(filter: GroupMessageFilterOptions): Promise<Array<MessageRecord>> {
	const response = await fetch(`/message/group?bot=${filter.bot}&group=${filter.group}&start=${filter.from}&end=${filter.to}`);
	const data = await response.json();

	return data as MessageRecord[];
}

async function fetchMessagesByFriend(filter: DirectMessageFilterOptions): Promise<Array<MessageRecord>> {
	const response = await fetch(`/message/group?bot=${filter.bot}&friend=${filter.account}&start=${filter.from}&end=${filter.to}`);
	const data = await response.json();

	return data as MessageRecord[];
}

async function fetchMessagesByTemporarySession(filter: TemporaryMessageFilterOptions): Promise<Array<MessageRecord>> {
	const response = await fetch(`/message/member?bot=${filter.bot}&group=${filter.group}&member=${filter.account}&start=${filter.from}&end=${filter.to}`);
	const data = await response.json();

	return data as MessageRecord[];
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
