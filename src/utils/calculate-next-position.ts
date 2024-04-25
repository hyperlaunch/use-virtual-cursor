export default function calculateNextPosition({
	currentPosition,
	cursorDimensions,
	moveMultiplier,
	key,
}: {
	currentPosition: { x: number; y: number };
	cursorDimensions: { width: number; height: number };
	moveMultiplier: number;
	key: string;
}) {
	const increment =
		Math.max(cursorDimensions.width, cursorDimensions.height) * moveMultiplier;

	if (key === "ArrowUp")
		return { ...currentPosition, y: currentPosition.y - increment };
	if (key === "ArrowDown")
		return { ...currentPosition, y: currentPosition.y + increment };
	if (key === "ArrowLeft")
		return { ...currentPosition, x: currentPosition.x - increment };
	if (key === "ArrowRight")
		return { ...currentPosition, x: currentPosition.x + increment };

	return currentPosition;
}
