interface PrefillOptionsProp {
	onCancel: () => void;
}
export default function PrefillOptions({ onCancel }: PrefillOptionsProp) {
	return (
		<div className="flex flex-col">
			<div>Hello</div>
			<button onClick={onCancel}>Cancel</button>
		</div>
	);
}
