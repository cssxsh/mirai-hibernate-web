export enum FilterType {
	ByKind = 'KIND',
	ByBot = 'BOT',
	ByGroup = 'GROUP',
	ByFriend = 'FRIEND',
	ByMember = 'MEMBER',
}

export function toFilterType(s: string): FilterType {
	const coercedFilterType = FilterType as any;
	for (let k in coercedFilterType) {
		if (coercedFilterType[k] == s) {
			return coercedFilterType[k] as FilterType;
		}
	}
	return FilterType.ByKind;
}

export type SearchOption = {
	value: FilterType;
	label: string;
}

export const SearchOptions: SearchOption[] = [
	{value: FilterType.ByKind, label: "按消息类型"},
	{value: FilterType.ByBot, label: "按机器人 ID"},
	{value: FilterType.ByGroup, label: "按群号"},
	{value: FilterType.ByFriend, label: "按 QQ 号"},
	{value: FilterType.ByMember, label: "按群成员"},
];

export enum KindFilterType {
	GroupMessages = 'GROUP',
	FriendMessages = 'FRIEND',
	GroupDirectMessage = 'TEMP',
	StrangerDirectMessage = 'STRANGER',
}

interface TimeBoundOptions {
	from: Timestamp;
	to: Timestamp;
}

interface BotBoundOptions {
	bot: BotId;
}

export interface KindFilterOptions extends TimeBoundOptions {
	kind: KindFilterType;
}

export function isKindFilterOptions(o: MessageFilterOptions): o is KindFilterOptions {
	return 'kind' in o && 'from' in o && 'to' in o && isFinite(o.from) && isFinite(o.to);
}

export interface BotFilterOptions extends TimeBoundOptions, BotBoundOptions {
	// no member
}

export interface GroupMessageFilterOptions extends TimeBoundOptions, BotBoundOptions {
	group: GroupId;
}

export interface DirectMessageFilterOptions extends TimeBoundOptions, BotBoundOptions {
	account: AccountId;
}

export type Timestamp = number;

export type BotId = number;

export type GroupId = number;

export type AccountId = number;

export type MessageFilterOptions
	= KindFilterOptions
	| BotFilterOptions
	| GroupMessageFilterOptions
	| DirectMessageFilterOptions;

export type PartialMessageFilterOptions = Omit<MessageFilterOptions, keyof TimeBoundOptions>

export type MessageRecord = {
	id: number
	bot: number
	fromId: number
	targetId: number
	ids: string | null,
	internalIds: string | null
	time: number
	kind: string
	code: string
	recall: boolean
}

export type PlainText = {
	type: string,
	content: string
}

export type Image = {
	type: string,
	imageId: string
}

export type At = {
	type: string,
	target: number
}
