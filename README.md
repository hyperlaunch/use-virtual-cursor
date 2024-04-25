# @hyperlaunch/react-use-virtual-cursor

The useVirtualCursor hook creates a virtual cursor that can be moved freely within the viewport with arrow key presses, and trigger click events on elements like buttons and links with the enter key. It's designed for environments such as touch screen kiosks, allowing D-pad navigation to enhance accessibility without requiring additional UI modifications.

## Installation

Install the package via npm or yarn:

```bash
npm install @hyperlaunch/react-use-virtual-cursor
# or
pnpm add @hyperlaunch/react-use-virtual-cursor
# or
bun add @hyperlaunch/react-use-virtual-cursor
```

## Usage

To use the `useVirtualCursor` hook, add it to your React component by attaching the `cursorRef` to the element you want to control, and using `position` to update the elements position. Configure the movement speed through the `moveMultiplier`, which scales the cursor's movement relative to its width for each key press.

### Arguments

- **moveMultiplier** (`number`): Adjusts the scale of movement of the cursor. The movement distance per arrow key press is calculated as a fraction of the cursor's width, allowing for adjustable responsiveness.

### Returns

- **cursorRef** (`React.RefObject<HTMLDivElement>`): A ref to be attached to the cursor element, allowing the hook to manage its position based on keyboard interactions.
- **position** (`{ x: number, y: number }`): The current x and y coordinates of the cursor, useful for positioning the cursor element in an absolute layout.
- **canInteract** (`boolean`): Indicates whether the cursor is currently over an interactive element like links or buttons, enabling dynamic styling changes.

The cursor will be positioned in the center of the screen, initially.

### Example

Here’s an example of how to use `useVirtualCursor` in a component:

```jsx
function Cursor() {
  const { cursorRef, position, canInteract } = useVirtualCursor({
    moveMultiplier: 0.8
  });

  const classNames = `
    absolute pointer-events-none fixed h-8 w-8 rounded-full transition-transform duration-200 z-50
    ${canInteract ? "bg-gray-500 border-2 border-white ring-1 ring-gray-400 shadow-lg origin-center scale-75" : "bg-gray-900/40"}
  `;

  return (
    <div
      ref={cursorRef}
      className={classNames}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
    />
  );
}
```

This component sets up a custom cursor that responds to keyboard inputs. It applies contextual class names if the cursor is over interactive elements, demonstrating how `useVirtualCursor` can be applied to enhance accessibility and interactivity in your React applications.