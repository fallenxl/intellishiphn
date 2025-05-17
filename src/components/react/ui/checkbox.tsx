import { FaCheck } from "react-icons/fa6";

export function Checkbox({
  id,
  name,
  value,
  label,
  onChange,
  defaultChecked,
  className = "",
  checked,
}: {
  id: string;
  name: string;
  value: string;
  label: string;
  defaultChecked?: boolean;
  className?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="flex items-center  cursor-pointer">
      <input
        type="checkbox"
        className="peer hidden"
        defaultChecked={defaultChecked}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      <div
        className="w-5 h-5 flex items-center justify-center border border-neutral-200 rounded-sm
    peer-checked:bg-[#44ccd6] peer-checked:border-[#44ccd6] transition-colors"
      >
        <FaCheck
          className={`text-white text-xs ${
            checked ? "opacity-100" : "opacity-0"
          } `}
        />
      </div>
      <span
        className={`text-neutral-700 font-bold transition-colors ${className}`}
      >
        {label}
      </span>
    </label>
  );
}
