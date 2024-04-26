import {
	useCallback,
	useEffect,
	useRef,
	useState,
	type CSSProperties,
} from "react";
import findNearestClickableElement from "./utils/find-nearest-clickable-element";
import getLiveCursorPosition from "./utils/get-live-cursor-position";
import calculateNextPosition from "./utils/calculate-next-position";
import isElementOutOfViewport from "./utils/is-element-out-of-viewport";

const ArrowKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

function simulateClick({ x, y }: { x: number; y: number }) {
	const element = findNearestClickableElement({ x, y });

	if (element instanceof HTMLElement) return element.click();
}

export function useVirtualCursor({
	moveMultiplier = 1,
}: { moveMultiplier?: number }) {
	const cursorRef = useRef<HTMLDivElement>(null);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [canInteract, setcanInteract] = useState<boolean>(false);
	const [cursorDimensions, setCursorDimensions] = useState({
		width: 0,
		height: 0,
	});

	const handleKeyPress = useCallback(
		(e: KeyboardEvent) => {
			if (!cursorDimensions || !moveMultiplier || !position) return;

			const key = e.key;

			if (ArrowKeys.includes(key))
				return setPosition((currentPosition) => {
					const nextPosition = calculateNextPosition({
						currentPosition,
						cursorDimensions,
						moveMultiplier,
						key,
					});

					if (
						!nextPosition ||
						isElementOutOfViewport({ position: nextPosition, cursorDimensions })
					)
						return currentPosition;

					return nextPosition;
				});

			if (key === "Enter" && cursorRef.current)
				return simulateClick(getLiveCursorPosition(cursorRef.current));
		},
		[cursorDimensions, moveMultiplier, position],
	);

	useEffect(() => {
		window.addEventListener("keydown", handleKeyPress);

		return () => window.removeEventListener("keydown", handleKeyPress);
	}, [handleKeyPress]);

	// Set the cursor in the center of the screen initially
	useEffect(() => {
		if (!cursorRef.current) return;

		const { width, height } = cursorRef.current.getBoundingClientRect();

		setCursorDimensions({ width, height });

		setPosition({
			x: (window.innerWidth - width) / 2,
			y: (window.innerHeight - height) / 2,
		});
	}, []);

	// Update state of cursor is/isn't over clickable element
	// biome-ignore lint/correctness/useExhaustiveDependencies: triggered by changes to position
	useEffect(() => {
		if (cursorRef.current) {
			const cursorPosition = getLiveCursorPosition(cursorRef.current);
			const element = findNearestClickableElement(cursorPosition);

			setcanInteract(Boolean(element));
		}
	}, [position]);

	const suggestedStyles: CSSProperties = {
		position: "absolute",
		zIndex: 9999,
		left: `${position.x}px`,
		top: `${position.y}px`,
	};

	return { cursorRef, position, canInteract, suggestedStyles };
}
