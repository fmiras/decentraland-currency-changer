import { CurrencyService } from "./modules/currency"

export const registerManaConversion = () => {
  CurrencyService.convertPrices();
  setTimeout(registerManaConversion, 1000);
};

console.log("DCL Marketplace currency changer extension loaded.")