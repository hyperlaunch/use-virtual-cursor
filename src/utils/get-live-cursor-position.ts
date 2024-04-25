export default function getLiveCursorPosition(cursor: HTMLElement) {
	const rect = cursor.getBoundingClientRect();
	const x = rect.left + rect.width / 2 + window.scrollX;
	const y = rect.top + rect.height / 2 + window.scrollY;

	return { x, y };
}
