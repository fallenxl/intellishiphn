import { FaWeightHanging } from "react-icons/fa6";
import { Checkbox } from "./ui/checkbox";
import { RadioButton } from "./ui/radio-button";
import { BiCategory } from "react-icons/bi";
import { TbDimensions } from "react-icons/tb";
import { BsBoxes } from "react-icons/bs";

export function ChinaForm({
  volume,
  setVolume,
  isSetVolumeChecked,
  setIsSetVolumeChecked,
  className,
}: {
  volume: any;
  setVolume: any;
  isSetVolumeChecked: boolean;
  setIsSetVolumeChecked: any;
  className?: string;
}) {
  return (
    <>
      <div className={`mt-4 ${className}`}>
        <div className={`mt-4`}>
          <h4 className=" font-bold text-neutral-700">
             <BiCategory className="inline-block text-principal mr-2" />
            Tipo de producto
          </h4>
          <div className="flex gap-4 mt-2">
            <RadioButton
              id="general"
              name="product"
              value="general"
              label="Carga General"
              className="p-4 md:py-2 md:px-6 "
              defaultChecked
            />
            <RadioButton
              id="electronics"
              name="product"
              value="electronics"
              label="Productos Electrónicos"
              className="p-4 md:py-2 px-6  "
            />
          </div>
        </div>
        <div className="mt-4">
          <h4 className=" font-bold text-neutral-700">
            <FaWeightHanging className="inline-block mr-2 text-principal"/>
            Peso</h4>
          <div className="flex flex-col-reverse md:flex-row gap-2 mt-2">
            <input
              type="number"
              name="weight"
              id="weight"
            
              min={0}
              step={0.01}
              placeholder="Ej. 1200"
              required
              className="border-2 border-neutral-200 rounded-xl px-4 py-2 w-full outline-none"
            />
            <div className="flex gap-2">
              <RadioButton
                id="lb"
                name="weight"
                className="text-sm px-4 py-2 w-10"
                value="lb"
                label="lb"
                defaultChecked
              />
              <RadioButton
                id="kg"
                name="weight"
                value="kg"
                label="kg"
                className="text-sm px-4 py-2 w-10"
              />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <h4 className=" font-bold text-neutral-700">
            <TbDimensions className="inline-block mr-2 text-principal"/>
            Dimensiones</h4>
          <Checkbox
            id="setVolumeChecked"
            name="isSetVolumeChecked"
            value={isSetVolumeChecked ? "true" : "false"}
            label="Ingresar volumen directamente"
            checked={isSetVolumeChecked}
            onChange={(e) => {
              setIsSetVolumeChecked(e.target.checked);
            }}
            className="text-sm px-3 py-2 font-normal"
          />
          <div className="flex flex-col-reverse md:flex-row gap-2 mt-2">
            {isSetVolumeChecked && (
              <div className="flex items-start gap-2 text-neutral-700 font-medium">
                <div className="flex flex-col gap-2 w-full ">
                  <label htmlFor="total">Volumen total</label>
                  <input
                    type="number"
                    name="total"
                    id="total"
                    min={0}
                    onChange={(e) => {
                      setVolume({
                        ...volume,
                        customValue: parseFloat(e.target.value),
                      });
                    }}
                    
                    step={0.01}
                    placeholder="Ej. 12.5"
                    required
                    className="border-2 border-neutral-200 rounded-xl px-4 py-2 w-full outline-none"
                  />
                </div>
              </div>
            )}

            {!isSetVolumeChecked && (
              <div className="flex items-start gap-2 text-neutral-700 font-medium">
                <div className="flex flex-col  w-full ">
                  <label htmlFor="width">Ancho</label>
                  <input
                    type="number"
                    name="width"
                    id="width"
                    min={0}
                    onChange={(e) => {
                      setVolume({
                        ...volume,
                        width: parseFloat(e.target.value),
                      });
                    }}
                    step={0.01}
                    placeholder="Ej. 12.5"
                    required
                    className="border-2 border-neutral-200 rounded-xl px-4 py-2 w-full outline-none"
                  />
                </div>
                <div className="flex flex-col  w-full">
                  <label htmlFor="height">Alto</label>
                  <input
                    type="number"
                    name="height"
                    id="height"
                    onChange={(e) => {
                      setVolume({
                        ...volume,
                        height: parseFloat(e.target.value),
                      });
                    }}
                    min={0}
                    
                    step={0.01}
                    placeholder="Ej. 12.5"
                    required
                    className="border-2 border-neutral-200 rounded-xl px-4 py-2 w-full outline-none"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="length">Largo</label>
                  <input
                    type="number"
                    name="length"
                    id="length"
                    min={0}
                    onChange={(e) => {
                      setVolume({
                        ...volume,
                        length: parseFloat(e.target.value),
                      });
                    }}
                    step={0.01}
                    placeholder="Ej. 12.5"
                    required
                    className="border-2 border-neutral-200 rounded-xl px-4 py-2 w-full outline-none"
                  />
                </div>
              </div>
            )}

            <div className="flex items-end gap-2">
              <RadioButton
                id="meters"
                name="dimensions"
                value="m"
                label="m"
                onChange={(e) => {
                  setVolume({
                    ...volume,
                    unit: e.target.value as "cm" | "m",
                  });
                }}
                defaultChecked
                className="text-sm px-4 py-2 w-10"
              />
              <RadioButton
                id="cm"
                name="dimensions"
                className="text-sm px-4 py-2 w-10"
                value="cm"
                label="cm"
                onChange={(e) => {
                  setVolume({
                    ...volume,
                    unit: e.target.value as "cm" | "m",
                  });
                }}
              />
            </div>
          </div>

          {volume.total > 0 && (
            <div className="flex gap-2 mt-2">
              <span className="text-sm text-neutral-500">
                Volumen total: {volume.total ?? 0} m3
              </span>
            </div>
          )}
        </div>
        <div className="mt-4">
          <h4 className=" font-bold text-neutral-700">
            <BsBoxes className="inline-block mr-2 text-principal"/>
            Cantidad</h4>
          <input
            type="number"
            name="quantity"
            id="quantity"
            min={1}
            defaultValue={1}
            step={0}
            placeholder="Valor de la carga"
            required
            className="border-2 border-neutral-200 rounded-xl px-4 py-2 w-full outline-none"
          />
        </div>
      </div>
    </>
  );
}
