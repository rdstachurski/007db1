import { useState } from "react";
import { Form } from "../../types/form";
import PrefillOptions from "./preFillOptionList";

interface FormModalProps {
	onCloseModal: () => void;
	selectedForm: Form;
}

export default function FormModal({
	onCloseModal,
	selectedForm,
}: FormModalProps) {
	const [showPrefillOptions, setShowPrefillOptions] = useState(false);

	const handleOnClickField = () => {
		setShowPrefillOptions(true);
	};

	const handleOnCancel = () => {
		setShowPrefillOptions(false);
	};
	return (
		<div className="backdrop-blur-sm fixed inset-0 z-50 flex justify-center items-center">
			<div className="grid bg-white w-[700px] h-[600px] shadow-lg rounded-md relative px-6 py-8 overflow-auto border-1">
				{showPrefillOptions && <PrefillOptions onCancel={handleOnCancel} />}
				<div className="flex justify-center">
					<ul>
						{Object.keys(selectedForm.field_schema.properties).map((key) => (
							<li>
								<div
									onClick={handleOnClickField}
									className="flex items-center outline-1 outline-gray-300"
								>
									{key}
								</div>
							</li>
						))}
					</ul>
				</div>
				<div>
					<button
						onClick={onCloseModal}
						className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-3 rounded"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
}
