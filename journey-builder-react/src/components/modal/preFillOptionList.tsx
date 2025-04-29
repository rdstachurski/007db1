import { GlobalProperties } from "../../types/prefillOptions/dataSource";

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
							<div>{key}</div>
						</li>
					))}
				</ul>
			);
		}
		return null;
	};

	return (
		<div className="flex flex-col">
			<div>
				<ul>
					{globalProps.map((data, index) => (
						<li key={index}>
							<div className="text-sm font-medium border-b-2">{data.name}</div>
							<ul>
								{Object.keys(data.properties).map((key) => (
									<li>
										<div>{key}</div>
									</li>
								))}
							</ul>
						</li>
					))}
				</ul>
				<ul>
					{prereqNodeData &&
						prereqNodeData.map((data, index) => (
							<li key={index}>
								<div className="text-sm font-medium border-b-2">
									{String(data.name)}
								</div>
								{renderPrefillFields(String(data.name))}
							</li>
						))}
				</ul>
			</div>
			<button onClick={onCancel}>Cancel</button>
		</div>
	);
}
