export function replaceCenter(str: string, chr: string, fixedStringLength = 0) {
	if (fixedStringLength === 0) {
		return `${str.charAt(0)}${chr.repeat(str.length - 2)}${str.charAt(str.length - 1)}`;
	} else {
		return `${str.charAt(0)}${chr.repeat(fixedStringLength - 2)}${str.charAt(str.length - 1)}`;
	}
}
