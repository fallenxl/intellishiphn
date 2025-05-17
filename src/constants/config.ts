// config.ts
export const CONFIG = {
  miamiRates: [
    {
      name: "standard",
      pricePerLb: 4.85,
      fee: 0.20,
    },
    {
      name: "express",
      pricePerLb: 9.99,
      fee: 0.20,
    },
    {
      name: "maritime",
      fee: 0.20,
      variants: [
        { max: 14, price: 3.40 },
        { max: 29, price: 2.85 },
        { min: 30, price: 2.50 },
      ],
    },
  ],
  chinaRates: {
    general: {
      pricePerM3: 815,
      minVolume: 0.080,
      minCharge: 88,
    },
    electronics: {
      pricePerM3: 950,
      handlingFee: 89.90,
      minVolume: 0.080,
      minCharge: 88,
    },
    ISV: 0.15, // 15%
  },
};
