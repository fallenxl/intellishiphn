
import "./index.css"
export function RadioButton({
  id,
  name,
  value,
  label,
  onChange,
  defaultChecked = false,
  className = "py-3 px-10",
}: {
  id: string;
  name: string;
  value: string;
  label: string;
  defaultChecked?: boolean;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="radio-button-container relative">
      <input
        type="radio"
        id={id}
        name={name}
        defaultChecked={defaultChecked}
        value={value}
        onChange={onChange}
        
        className="peer radio-input absolute opacity-0 cursor-pointer z-10"
      />
      <label
        htmlFor={id}
        className={`radio-label font-bold text-neutral-700 w-full h-full text-center
        border-2 peer-[checked]:bg-neutral-200 border-neutral-200 rounded-xl cursor-pointer flex items-center justify-center transition-colors ${className}`}
      >
        {label}
      </label>
    </div>
  );
}