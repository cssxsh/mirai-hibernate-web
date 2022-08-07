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

export enum MessageKindType {
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
	kind: MessageKindType;
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

export function isMessageRecord(o: MessageRecord | QuotedContent): o is MessageRecord {
	return o.ids == null || typeof o.ids === 'string';
}

export enum MessageChainItemType {
	PlainText= 'PlainText',
	Image = 'Image',
	FlashImage = 'FlashImage',
	At = 'At',
	Face = 'Face',
	QuoteReply = 'QuoteReply',
}

export interface MessageChainItem {
	type: MessageChainItemType | string;
}

function isMessageChainItem(o: object): o is MessageChainItem {
	return 'type' in o;
}

function isMessageChainItemOfSpecificType<T extends MessageChainItem>(o: object, t: MessageChainItemType): o is T {
	return isMessageChainItem(o) && o['type'] === t;
}

export interface PlainText extends MessageChainItem {
	content: string;
}

export function isPlainText(o: object): o is PlainText {
	return isMessageChainItemOfSpecificType(o, MessageChainItemType.PlainText) && 'content' in o;
}

export interface Image extends MessageChainItem {
	imageId: string;
}

export interface FlashImage extends Image {
	// no member
}

export function isImage(o: object): o is Image {
	return isMessageChainItemOfSpecificType(o, MessageChainItemType.Image) && 'imageId' in o;
}

export function isFlashImage(o: object): o is FlashImage {
	return isMessageChainItemOfSpecificType(o, MessageChainItemType.FlashImage) && 'imageId' in o;
}

export interface At extends MessageChainItem {
	target: number;
}

export function isAt(o: object): o is At {
	return isMessageChainItemOfSpecificType(o, MessageChainItemType.At) && isNumericalMemberInObject(o, 'target');
}

export interface QuotedContent {
	kind: MessageKindType;
	botId: number;
	ids: number[];
	internalIds: number[];
	time: number;
	fromId: number;
	targetId: number;
	originalMessage: MessageChainItem[];
}

export interface QuoteMessage extends MessageChainItem {
	source: QuotedContent;
}

export function isQuoteMessage(o: object): o is QuoteMessage {
	return isMessageChainItemOfSpecificType(o, MessageChainItemType.QuoteReply) && 'source' in o;
}
