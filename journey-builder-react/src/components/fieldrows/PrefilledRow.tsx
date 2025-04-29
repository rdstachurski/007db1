import { X } from "lucide-react";

interface PrefilledRowProp {
	keyName: string;
	value: string;
	onRemovePrefilled: () => void;
}
export function PrefilledRow({
	keyName,
	value,
	onRemovePrefilled,
}: PrefilledRowProp) {
	return (
		<div className="flex items-center rounded-2xl bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 overflow-hidden">
			<div className="text-gray-400 block min-w-0 grow py-1.5 truncate whitespace-nowrap max-w-sm">
				{keyName + " : " + value}
			</div>
			<button className="pl-1 pr-1.5" onClick={onRemovePrefilled}>
				<X size={20} />
			</button>
		</div>
	);
}
