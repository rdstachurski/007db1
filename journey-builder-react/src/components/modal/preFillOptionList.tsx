import { useState } from "react";
import { GlobalProperties } from "../../types/prefillOptions/dataSource";
import { ChevronDown } from "lucide-react";

interface PrefillOptionsProp {
	onCancel: () => void;
	globalProps: GlobalProperties[];
	prereqNodeData: Record<string, unknown>[] | undefined;
}
export default function PrefillOptions({
	onCancel,
	globalProps,
	prereqNodeData,
}: PrefillOptionsProp) {
	const [selectedPrefillKey, setSelectedPrefillKey] = useState<string | null>(
		null
	);
	const renderPrefillFields = (input_mapping?: unknown) => {
		if (input_mapping && typeof input_mapping === "object") {
			const inputMapping = input_mapping as Record<
				string,
				Record<string, unknown>
			>;

			return (
				<ul>
					{Object.keys(inputMapping).map((key) => (
						<li key={key}>
							<button
								type="button"
								onClick={() => setSelectedPrefillKey(key)}
								className={`block w-full text-left rounded-lg px-4 py-2 text-sm font-medium cursor-pointer
      ${
				selectedPrefillKey === key
					? "bg-blue-100 text-blue-700"
					: "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
			}
    `}
							>
								{key}
							</button>
						</li>
					))}
				</ul>
			);
		}
		return null;
	};

	return (
		<div className="flex flex-col h-full justify-between border-e border-gray-100 bg-white">
			<div className="inline-flex border-b border-gray-100">
				<p className="mt-1 text-gray-600 pb-5">Available Prefill Data</p>
			</div>
			<div className="flex-1 overflow-y-auto">
				{/* Global */}
				<ul className="mt-6">
					{globalProps.map((data, index) => (
						<li key={index}>
							<details className="group [&_summary::-webkit-details-marker]:hidden">
								<summary className="flex cursor-pointer items-center rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
									<span className="shrink-0 transition duration-300 group-open:-rotate-180">
										<ChevronDown className="size-5" />
									</span>
									<span className="text-sm font-medium">{data.name}</span>
								</summary>

								<ul className="mt-2 space-y-1 ">
									{Object.keys(data.properties).map((key) => (
										<li key={key}>
											<button
												type="button"
												onClick={() => setSelectedPrefillKey(key)}
												className={`block w-full text-left rounded-lg px-4 py-2 text-sm font-medium cursor-pointer
      ${
				selectedPrefillKey === key
					? "bg-blue-100 text-blue-700"
					: "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
			}
    `}
											>
												{key}
											</button>
										</li>
									))}
								</ul>
							</details>
						</li>
					))}
				</ul>
				{/* Prerequisites */}
				<ul>
					{prereqNodeData &&
						prereqNodeData.map((data, index) => (
							<li key={index}>
								<details className="group [&_summary::-webkit-details-marker]:hidden">
									<summary className="flex cursor-pointer items-center rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
										<span className="shrink-0 transition duration-300 group-open:-rotate-180">
											<ChevronDown className="size-5" />
										</span>
										<span className="text-sm font-medium">
											{String(data.name)}
										</span>
									</summary>

									{renderPrefillFields(data.input_mapping)}
								</details>
							</li>
						))}
				</ul>
			</div>
			<div className="flex gap-2 p-2 border-t border-gray-200">
				<button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
					Select
				</button>
				<button
					onClick={onCancel}
					className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-3 rounded"
				>
					Cancel
				</button>
			</div>
		</div>
	);
}
