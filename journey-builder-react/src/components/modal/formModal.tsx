import { useState } from "react";
import { Form } from "../../types/form";
import PrefillOptions from "./preFillOptionList";
import { GlobalProperties } from "../../types/prefillOptions/dataSource";
import { Database } from "lucide-react";

interface FormModalProps {
	onCloseModal: () => void;
	selectedForm: Form;
	globalProps: GlobalProperties[];
	prereqNodeData: Record<string, unknown>[] | undefined;
}

export default function FormModal({
	onCloseModal,
	selectedForm,
	globalProps,
	prereqNodeData,
}: FormModalProps) {
	const [showPrefillOptions, setShowPrefillOptions] = useState(false);
	const [selectedKey, setSelectedKey] = useState<string | null>(null);
	const handleOnClickField = (key: string) => {
		setShowPrefillOptions(true);
		setSelectedKey(key);
	};

	const handleOnCancel = () => {
		setShowPrefillOptions(false);
	};

	return (
		<div className="backdrop-blur-sm fixed inset-0 z-50 flex justify-center items-center">
			<div className="grid grid-cols-[1fr_3fr] bg-white w-[700px] h-[600px] shadow-lg rounded-md relative px-6 py-8 overflow-auto border-1">
				<div className="grid-cols-[min-content_1fr]">
					{showPrefillOptions && (
						<PrefillOptions
							onCancel={handleOnCancel}
							globalProps={globalProps}
							prereqNodeData={prereqNodeData}
						/>
					)}
				</div>

				<div className="pl-6 pr-6">
					<h2 className="text-base/7 font-semibold text-gray-900">Prefill</h2>
					<div className="inline-flex">
						<p className="mt-1 text-sm/6 text-gray-600 pb-5">
							Prefill Data for this form
						</p>
					</div>
					<ul>
						{Object.keys(selectedForm.field_schema.properties).map((key) => (
							<li key={key}>
								<div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
									<div>
										<Database />
									</div>
									<div
										className={`text-gray-400 hover:bg-gray-100
														block min-w-0 grow py-1.5 pr-3 pl-1 text-base 
														focus:outline-none sm:text-sm/6 cursor-pointer
													${selectedKey === key ? "border-3 border-dashed border-blue-300" : ""}
				  `}
										onClick={() => handleOnClickField(key)}
									>
										{key}
									</div>
								</div>
							</li>
						))}
					</ul>

					<div className="inline-flex gap-1 absolute bottom-2 right-2">
						<button
							type="submit"
							className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
						>
							Save
						</button>
						<button
							onClick={onCloseModal}
							className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-3 rounded"
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
