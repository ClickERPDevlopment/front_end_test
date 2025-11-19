import { FC } from "react";

interface InputFieldProps {
    id: string;
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

const RNDInputField: FC<InputFieldProps> = ({
    id,
    label,
    type,
    value,
    onChange,
    required = true,
}) => (
    <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-semibold text-gray-700">
            {label}
        </label>
        <input
            type={type}
            id={id}
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={value}
            onChange={onChange}
            required={required}
        />
    </div>
);

export default RNDInputField;
