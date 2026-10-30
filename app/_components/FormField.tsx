type FormFieldProps = {
  label: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  defaultValue?: string;
  inputClassName?: string;
};

export default function FormField({
  label,
  type = "text",
  placeholder,
  defaultValue,
  inputClassName,
}: FormFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold tracking-[.7px] text-muted-strong">
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={`w-full rounded-[14px] border-[1.5px] bg-white px-4 py-[14px] text-ink ${inputClassName ?? ""}`}
      />
    </label>
  );
}
