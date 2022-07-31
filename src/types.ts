import { kind, bot, group, friend, member } from './logic/Routes';

export type SearchOption = {
	label: string;
	load: (...xs: any[]) => Promise<MessageRecord[]>;
}

export const SearchOptions: SearchOption[] = [
	{label: "KIND", load: kind},
	{label: "BOT", load: bot},
	{label: "GROUP", load: group},
	{label: "FRIEND", load: friend},
	{label: "MEMBER", load: member},
];

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
