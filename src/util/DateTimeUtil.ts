export function toUnixTimestamp(o: Date) {
	return Math.round(o.getTime() / 1000);
}
