interface InputFields {
  type?: string;
  label?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CommonInputField({
  type = "text",
  label,
  name,
  value,
  placeholder,
  onChange,
}: InputFields) {
  return (
    <div className="">
      {label && (
        <label className="block text-black-800 font-medium">{label}</label>
      )}

      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        autoComplete="off"
       className="w-full h-12 px-4 py-6 rounded-lg border border-gray-500
           focus:ring-2 focus:ring-blue-800 focus:border-blue-400
           mb-4 outline-none text-gray-800"

      />
    </div>
  );
}
