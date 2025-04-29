interface FormModalProps {
	onCloseModal: () => void;
}

export default function FormModal({ onCloseModal }: FormModalProps) {
	return (
		<div className="backdrop-blur-sm fixed inset-0 z-50 flex justify-center items-center">
			<div className="grid grid-cols-[1fr_3fr] bg-white w-[700px] h-[600px] shadow-lg rounded-md relative px-6 py-8 overflow-auto border-1">
				<button
					onClick={onCloseModal}
					className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-3 rounded"
				>
					Cancel
				</button>
			</div>
		</div>
	);
}
