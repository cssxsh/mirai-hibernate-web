import { MessageRecord } from "../types";

export const bot = async function (bot: number, start: number, end: number) {
	const response = await fetch(`/message/bot?bot=${bot}&start=${start}&end=${end}`);
	const data = await response.json()

	return data as MessageRecord[]
}

export const group = async function (bot: number, group: number, start: number, end: number) {
	const response = await fetch(`/message/group?bot=${bot}&group=${group}&start=${start}&end=${end}`);
	const data = await response.json()

	return data as MessageRecord[]
}

export const friend = async function (bot: number, friend: number, start: number, end: number) {
	const response = await fetch(`/message/group?bot=${bot}&friend=${friend}&start=${start}&end=${end}`);
	const data = await response.json()

	return data as MessageRecord[]
}

export const member = async function (bot: number, group: number, member: number, start: number, end: number) {
	const response = await fetch(`/message/member?bot=${bot}&group=${group}&member=${member}&start=${start}&end=${end}`);
	const data = await response.json()

	return data as MessageRecord[]
}

export const kind = async function (kind: string, start: number, end: number) {
	const response = await fetch(`/message/kind?kind=${kind}&start=${start}&end=${end}`);
	const data = await response.json()

	return data as MessageRecord[]
}
