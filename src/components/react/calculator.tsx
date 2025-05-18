"use client";
import { useEffect, useMemo, useState, useCallback } from "react";
import { RadioButton } from "./ui/radio-button";
import { CiCalculator1 } from "react-icons/ci";
import { calculateChinaPrice, calculateMiamiPrice, formatCurrency } from "../../utils/shopping";
import { ChinaForm } from "./china-form";
import { MiamiForm } from "./miami-form";
import { BiMapAlt } from "react-icons/bi";

export function Calculator() {
  const [origin, setOrigin] = useState<"miami" | "china">("miami");
  const [isSetVolumeChecked, setIsSetVolumeChecked] = useState(false);
  const [volume, setVolume] = useState({
    length: 0,
    width: 0,
    height: 0,
    total: 0,
    unit: "m",
    customValue: 0,
  });

  const [chinaPrice, setChinaPrice] = useState({
    total: 0,
    subtotal: 0,
    type: null,
    handlingFee: 0,
    unitCost: 0,
    quantity: 0,
  });

  const [miamiPrice, setMiamiPrice] = useState({
    total: 0,
    subtotal: 0,
    type: null,
    fee: 0,
    weight: 0,
    weightUnit: "lb",
  });

  // ✅ Recalcular volumen automáticamente cuando cambian medidas
  useEffect(() => {
    const total = isSetVolumeChecked
      ? volume.customValue
      : volume.length * volume.width * volume.height;

    const totalConverted =
      volume.unit === "cm"
        ? parseFloat((total / 1_000_000).toFixed(10))
        : parseFloat(total.toFixed(2));

    setVolume((prev) => ({
      ...prev,
      total: totalConverted,
    }));
  }, [
    isSetVolumeChecked,
    volume.length,
    volume.width,
    volume.height,
    volume.customValue,
    volume.unit,
  ]);

  // ✅ Resetear volumen al cambiar de origen
  useEffect(() => {
    setMiamiPrice({
      total: 0,
      subtotal: 0,
      type: null,
      fee: 0,
      weight: 0,
      weightUnit: "lb",
    });
    setChinaPrice({
      total: 0,
      subtotal: 0,
      type: null,
      handlingFee: 0,
      unitCost: 0,
      quantity: 0,
    });
    setVolume((prev) => ({
      ...prev,
      length: 0,
      width: 0,
      height: 0,
      total: 0,
    }));
  }, [origin]);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    if (origin === "china") {
      const cost = calculateChinaPrice(
        parseFloat(data.length as string),
        parseFloat(data.width as string),
        parseFloat(data.height as string),
        data.dimensions as "cm" | "m",
        data.product as "general" | "electronics",
        parseInt(data.quantity as string),
        isSetVolumeChecked,
        isSetVolumeChecked ? parseFloat(data.total as string) : 0
      );
      setChinaPrice(cost as any);
    }

    if (origin === "miami") {
      const cost = calculateMiamiPrice(
        data.service as string,
        parseFloat(data.weight as string),
        data.weightUnit as string
      );
      setMiamiPrice(cost as any);
    }
  }, [origin, isSetVolumeChecked]);

  // ✅ Render condicionales para resultados
  const chinaResult = useMemo(() => {
    if (origin !== "china" || !chinaPrice.type) return null;
    return (
      <div className="mt-4">
        <div className="flex flex-col items-end gap-2 mt-2 text-neutral-700">
          <span className="text-sm text-neutral-500">
            {chinaPrice.type === "electronics"
              ? "Productos Electrónicos"
              : "Carga General"}
          </span>
          <div className="flex justify-between w-full">
            <span className="font-medium">Costo de manejo</span>
            <span>{formatCurrency(chinaPrice.handlingFee)}</span>
          </div>
          <div className="flex justify-between w-full">
            <span className="font-medium">
              Costo de carga x {chinaPrice.quantity}
            </span>
            <span>{formatCurrency(chinaPrice.unitCost * chinaPrice.quantity)}</span>
          </div>
          <div className="flex justify-between w-full text-xl font-bold">
            <span>Total</span>
            <span>
              {formatCurrency(chinaPrice.total)}
              <small className="text-sm text-neutral-500 font-normal ml-2">
                + ISV
              </small>
            </span>
          </div>
        </div>
      </div>
    );
  }, [origin, chinaPrice]);

  const miamiResult = useMemo(() => {
    if (origin !== "miami" || !miamiPrice.type) return null;
    return (
      <div className="mt-4">
        <div className="flex flex-col items-end gap-2 mt-2 text-neutral-700">
          <span className="text-sm text-neutral-500">
            {miamiPrice.type === "express" ? "Aéreo Express" : "Aéreo Standard"}
          </span>
          <div className="flex justify-between w-full">
            <span className="font-medium">Peso a cobrar</span>
            <span>{miamiPrice.weight} {"->"} {Math.ceil(miamiPrice.weight)} libras</span>
          </div>
          <div className="flex justify-between w-full">
            <span className="font-medium">Seguro</span>
            <span>{formatCurrency(miamiPrice.fee)}</span>
          </div>
          <div className="flex justify-between w-full">
            <span className="font-medium">Costo de flete</span>
            <span>{formatCurrency(miamiPrice.subtotal)}</span>
          </div>
          <div className="flex justify-between w-full text-xl font-bold">
            <span>Total</span>
            <span>{formatCurrency(miamiPrice.total)}</span>
          </div>
        </div>
      </div>
    );
  }, [origin, miamiPrice]);

  return (
    <div className="md:px-4 py-0 flex flex-col md:flex-row items-start md:w-2/3">
      <div className="w-full">
        <form onSubmit={handleSubmit} className="md:border border-neutral-200 rounded-xl md:p-10">
          <h3 className="text-2xl font-bold text-neutral-700 pb-4">
            Calculadora de Carga
          </h3>
          <div>
            <h4 className=" font-bold text-neutral-700">
              <BiMapAlt className="inline-block mr-2 text-principal" />
              Origen de la carga
            </h4>
            <div className="flex gap-4 mt-2 text-sm">
              {["miami", "china"].map((loc) => (
                <RadioButton
                  key={loc}
                  id={loc}
                  name="origin"
                  value={loc}
                  label={loc === "miami" ? "Miami, USA" : "Guangzhou, China"}
                  className="p-4 md:py-2 md:px-6"
                  defaultChecked={loc === "miami"}
                  onChange={() => setOrigin(loc as "miami" | "china")}
                />
              ))}
            </div>

            <div className="mt-4">
              <h4 className=" font-bold text-neutral-700">
                <BiMapAlt className="inline-block mr-2 text-principal" />
                Destino
              </h4>
              <h5 className="text-neutral-500 font-bold mt-2 ml-6">Honduras</h5>

              {origin === "china" && (
                <ChinaForm
                  volume={volume}
                  setVolume={setVolume}
                  isSetVolumeChecked={isSetVolumeChecked}
                  setIsSetVolumeChecked={setIsSetVolumeChecked}
                />
              )}
            </div>

            {chinaResult}
            {origin === "miami" && <MiamiForm />}
            {miamiResult}

            <div className="mt-8">
              <button className="bg-principal text-white font-bold py-2 px-4 rounded-xl w-full cursor-pointer">
                <CiCalculator1 className="inline-block mr-2 text-xl" />
                Calcular
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
