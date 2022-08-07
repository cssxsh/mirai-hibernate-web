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
		if (coercedFilterType[k] === s) {
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
	{value: FilterType.ByKind, label: '按消息类型'},
	{value: FilterType.ByBot, label: '按机器人 ID'},
	{value: FilterType.ByGroup, label: '按群号'},
	{value: FilterType.ByFriend, label: '按 QQ 号'},
	{value: FilterType.ByMember, label: '按群成员'},
];

export enum KindFilterType {
	GroupMessages = 'GROUP',
	FriendMessages = 'FRIEND',
	GroupDirectMessage = 'TEMP',
	StrangerDirectMessage = 'STRANGER',
}

function isNumericalMemberInObject(o: any, k: string) {
	return k in o && typeof o[k] === 'number' && isFinite(o[k]);
}

interface TimeBoundOptions {
	from: Timestamp;
	to: Timestamp;
}

function isTimeBoundOptions(o: any): o is TimeBoundOptions {
	return isNumericalMemberInObject(o, 'from') && isNumericalMemberInObject(o, 'to');
}

interface BotBoundOptions {
	bot: BotId;
}

function isBotBoundOptions(o: any): o is BotBoundOptions {
	return isNumericalMemberInObject(o, 'bot');
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

export function isBotFilterOptions(o: MessageFilterOptions): o is BotFilterOptions {
	return isTimeBoundOptions(o) && isBotBoundOptions(o);
}

export interface GroupMessageFilterOptions extends TimeBoundOptions, BotBoundOptions {
	group: GroupId;
}

export function isGroupMessageFilterOptions(o: MessageFilterOptions): o is GroupMessageFilterOptions {
	return isTimeBoundOptions(o) && isBotBoundOptions(o) && isNumericalMemberInObject(o, 'group');
}

export interface DirectMessageFilterOptions extends TimeBoundOptions, BotBoundOptions {
	account: AccountId;
}

export function isDirectMessageFilterOptions(o: MessageFilterOptions): o is DirectMessageFilterOptions {
	return isTimeBoundOptions(o) && isBotBoundOptions(o) && isNumericalMemberInObject(o, 'account');
}

export interface TemporaryMessageFilterOptions extends TimeBoundOptions, BotBoundOptions {
	group: GroupId;
	account: AccountId;
}

export function isTemporaryMessageFilterOptions(o: MessageFilterOptions): o is TemporaryMessageFilterOptions {
	return isTimeBoundOptions(o) && isBotBoundOptions(o) && isNumericalMemberInObject(o, 'account') && isNumericalMemberInObject(o, 'group');
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
