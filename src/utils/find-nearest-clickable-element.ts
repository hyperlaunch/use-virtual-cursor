function findNearestElements({ x, y }: { x: number; y: number }) {
	return document.elementsFromPoint(x, y);
}

function clickable(element: Element) {
	return element.matches(
		'a, button, input[type="button"], input[type="submit"], [onclick], [role="button"]',
	);
}

export default function findNearestClickableElement(position: {
	x: number;
	y: number;
}): Element | undefined {
	const elements = findNearestElements(position);

	return [...(elements || [])].find(clickable);
}
