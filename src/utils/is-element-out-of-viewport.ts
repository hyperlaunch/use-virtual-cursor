export default function isElementOutOfViewport({
	position,
	cursorDimensions,
}: {
	position: { x: number; y: number };
	cursorDimensions: { width: number; height: number };
}): boolean {
	const viewportWidth = window.innerWidth;
	const viewportHeight = window.innerHeight;

	const rightEdge = position.x + cursorDimensions.width;
	const bottomEdge = position.y + cursorDimensions.height;

	const isOutOfHorizontalBounds = rightEdge > viewportWidth || position.x < 0;
	const isOutOfVerticalBounds = bottomEdge > viewportHeight || position.y < 0;

	return isOutOfHorizontalBounds || isOutOfVerticalBounds;
}
