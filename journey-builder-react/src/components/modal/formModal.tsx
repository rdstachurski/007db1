import { useState } from "react";
import { Form } from "../../types/form";
import PrefillOptions from "./preFillOptionList";
import { GlobalProperties } from "../../types/prefillOptions/dataSource";
import ToggleBtn from "../buttons/ToggleBtn";
import { UnPrefilledRow } from "../fieldrows/UnPrefilledRow";
import InputRow from "../fieldrows/InputRow";

interface FormModalProps {
	onCloseModal: () => void;
	initialInputMapping: Record<string, Record<string, unknown>>;
	selectedForm: Form;
	globalProps: GlobalProperties[];
	prereqNodeData: Record<string, unknown>[] | undefined;
	handleOnFormSubmit: (
		e: React.FormEvent<HTMLFormElement>,
		formValues: Record<string, Record<string, unknown>>
	) => void;
}

export default function FormModal({
	onCloseModal,
	initialInputMapping,
	selectedForm,
	globalProps,
	prereqNodeData,
	handleOnFormSubmit,
}: FormModalProps) {
	const [showPrefillOptions, setShowPrefillOptions] = useState(false);
	const [selectedKey, setSelectedKey] = useState<string | null>(null);
	const [togglePrefill, setTogglePrefill] = useState(false);
	const [formValues, setFormValues] =
		useState<Record<string, Record<string, unknown>>>(initialInputMapping);

	const handleOnCancel = () => {
		setShowPrefillOptions(false);
	};
	const handleToggle = () => {
		setTogglePrefill((prev) => {
			const newValue = !prev;
			if (!newValue) {
				setShowPrefillOptions(false);
			}
			setSelectedKey(null);
			return newValue;
		});
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormValues((prev) => ({
			...prev,
			[name]: { prefilled: togglePrefill, value: value },
		}));
	};

	const handleUnPrefilledClick = (key: string) => {
		setSelectedKey(key);
		setShowPrefillOptions(true);
	};

	const handleSavePrefill = (prefillSource: string) => {
		if (selectedKey) {
			setFormValues((prev) => ({
				...prev,
				[selectedKey]: {
					prefilled: togglePrefill,
					[selectedKey]: prefillSource + "." + selectedKey,
				},
			}));
		}

		setShowPrefillOptions(false);
		setSelectedKey(null);
	};

	const renderRowType = (key: string) => {
		const value = (formValues[key]?.value as string) ?? "";
		const type = selectedForm.field_schema.properties[key].type;

		if (togglePrefill) {
			return (
				<UnPrefilledRow
					keyName={key}
					type={type}
					selected={selectedKey === key}
					onUnprefilledClick={() => handleUnPrefilledClick(key)}
				/>
			);
		}

		return (
			<InputRow
				keyName={key}
				value={value}
				type={type}
				onInputChange={handleInputChange}
			/>
		);
	};

	return (
		<div className="backdrop-blur-sm fixed inset-0 z-50 flex justify-center items-center">
			<div className="grid grid-cols-[1fr_3fr] bg-white w-[700px] h-[600px] shadow-lg rounded-md relative px-6 py-8 overflow-auto border-1">
				<div className="grid-cols-[min-content_1fr]">
					{showPrefillOptions && togglePrefill && (
						<PrefillOptions
							onCancel={handleOnCancel}
							globalProps={globalProps}
							prereqNodeData={prereqNodeData}
							onSelectPrefill={handleSavePrefill}
						/>
					)}
				</div>

				<div className="pl-6 pr-6">
					<h2 className="text-base/7 font-semibold text-gray-900">Prefill</h2>
					<div className="inline-flex">
						<p className="mt-1 text-sm/6 text-gray-600 pb-5">
							Prefill Data for this form
						</p>
						<div className="absolute right-2 pr-5">
							<ToggleBtn onClick={handleToggle} />
						</div>
					</div>
					<form onSubmit={(e) => handleOnFormSubmit(e, formValues)}>
						<ul>
							{Object.keys(selectedForm.field_schema.properties).map((key) => (
								<li key={key}>
									<div className="mt-2">{renderRowType(key)}</div>
								</li>
							))}
						</ul>
						{!showPrefillOptions && (
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
						)}
					</form>
				</div>
			</div>
		</div>
	);
}
