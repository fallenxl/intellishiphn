import { BiCategory } from "react-icons/bi";
import { RadioButton } from "./ui/radio-button";
import { FaWeightHanging } from "react-icons/fa6";

export function MiamiForm() {
  return (
    <div className="miami-form">
      <div className="mt-4">
        <h4 className=" font-bold text-neutral-700">
            <BiCategory className="inline-block text-principal mr-2" />
            Servicio</h4>
        <div className="flex w-full gap-2 mt-2">
            <RadioButton
              id="standard"
              name="service"
              className=" px-4 py-2 flex-grow text-sm"
              value="standard"
              label="Aéreo Standard"
              defaultChecked
            />
            <RadioButton
              id="express"
              name="service"
              value="express"
              label="Aéreo Express"
              className="px-4 py-2 flex-grow text-sm"
            />
            <RadioButton
              id="maritime"
              name="service"
              value="maritime"
              label="Marítimo"
              className="px-4 py-2 text-sm"
            />
         
        </div>
      </div>
      <div className="mt-4">
        <h4 className=" font-bold text-neutral-700">
            <FaWeightHanging className="inline-block mr-2 text-principal"/>
            Peso</h4>
        <div className="flex  gap-2 mt-2">
          <input
            type="number"
            name="weight"
            id="weight"
            
            min={0}
            step={0.01}
            placeholder="Ej. 12.5"
            required
            className="border-2 border-neutral-200 rounded-xl px-4 py-2 w-full outline-none"
          />
          <div className="flex gap-2">
            <RadioButton
              id="lb"
              name="weightUnit"
              className="text-sm px-4 py-2 w-10"
              value="lb"
              label="lb"
              defaultChecked
            />
            <RadioButton
              id="kg"
              name="weightUnit"
              value="kg"
              label="kg"
              className="text-sm px-4 py-2 w-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
