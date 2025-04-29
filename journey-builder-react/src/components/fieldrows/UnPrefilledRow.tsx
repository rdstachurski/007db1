import { ALargeSmall, Database } from "lucide-react";

interface UnPrefilledRowProp {
	keyName: string;
	type: string;
	selected: boolean;
	onUnprefilledClick: (key: string) => void;
}

export function UnPrefilledRow({
	keyName,
	type,
	selected,
	onUnprefilledClick,
}: UnPrefilledRowProp) {
	const propTypeIcon = (type: string) => {
		if (type === "string") {
			return <ALargeSmall />;
		} else {
			return <Database />;
		}
	};

	return (
		<div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
			<div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6 border-r-1 pr-1">
				{propTypeIcon(type)}
			</div>
			<div
				className={`text-gray-400 hover:bg-gray-100
        block min-w-0 grow py-1.5 pr-3 pl-1 text-base 
        focus:outline-none sm:text-sm/6 cursor-pointer
        ${selected ? "border-3 border-dashed border-blue-300" : ""}
      `}
				onClick={() => onUnprefilledClick(keyName)}
			>
				{keyName}
			</div>
		</div>
	);
}
