import { ALargeSmall, Database } from "lucide-react";

interface InputRowProps {
	keyName: string;
	value: string;
	onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	type: string;
}

export default function InputRow({
	keyName,
	value,
	onInputChange,
	type,
}: InputRowProps) {
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
			<input
				name={keyName}
				value={value}
				onChange={onInputChange}
				className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
				placeholder={keyName}
			></input>
		</div>
	);
}
