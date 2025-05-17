// shipping-calculator.ts

import { CONFIG } from "../constants/config";



type Unit = 'cm' | 'm';

export function calculateMiamiPrice(serviceName: string, weightLb: number, weightUnit: string){
  const service = CONFIG.miamiRates.find(s => s.name === serviceName);
  if (!service) return null;

  let pricePerLb = 0;

  if (weightUnit === 'kg') {
    weightLb = weightLb * 2.20462;
  }


  // round to next number ej. 1.4 => 2
  weightLb = Math.ceil(weightLb);
  console.log('Weight:', weightLb);
  
  if ('pricePerLb' in service) {
    pricePerLb = service.pricePerLb ?? 0;
  } else if ('variants' in service) {
    for (const v of service.variants) {
      if (v.max && weightLb <= v.max) {
        pricePerLb = v.price;
        break;
      }
      if (v.min && weightLb >= v.min) {
        pricePerLb = v.price;
      }
    }
  }

  const total = weightLb * pricePerLb + service.fee;
  return {
    total: parseFloat(total.toFixed(2)),
    subtotal: parseFloat((weightLb * pricePerLb).toFixed(2)),
    type: serviceName,
    fee: service.fee,
  }
}

export function calculateChinaPrice(
  largo: number,
  ancho: number,
  alto: number,
  unit: Unit,
  tipoCarga: 'general' | 'electronics',
  cantidad: number = 1,
  isSetVolume: boolean = false,
  totalVolume: number = 0,
): { total: number; subtotal: number; type: string | null; handlingFee: number, unitCost: number; quantity: number } {
  const rate = CONFIG.chinaRates[tipoCarga];
  console.log('Rate:', rate);
  const pricePerM3 = rate.pricePerM3;
  const minCharge = rate.minCharge;
  const minVolume = rate.minVolume;
  const handlingFee = 'handlingFee' in rate ? rate.handlingFee : 0;

  let volumeM3 = 0;

  if (unit === 'cm') {
    volumeM3 = (largo * ancho * alto) / 1_000_000;
  } else {
    volumeM3 = largo * ancho * alto;
  }

  if (isSetVolume) {
    volumeM3 = totalVolume;
    if (unit === 'cm') {
      volumeM3 = totalVolume / 1_000_000;
    }
  }

  let subtotal = 0;
  let unitCost = 0;
  if (volumeM3 <= minVolume) {
    subtotal = minCharge;
    unitCost = minCharge;
  } else {
    unitCost = pricePerM3 * volumeM3;
    subtotal = volumeM3 * pricePerM3;
  }
  subtotal = subtotal  + handlingFee;
  const total = subtotal * cantidad;



  return {
    type: tipoCarga,
    handlingFee: handlingFee,
    unitCost: unitCost,
    quantity: cantidad,
    subtotal: parseFloat(subtotal.toFixed(2)),
    total: parseFloat(total.toFixed(2)),
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}
