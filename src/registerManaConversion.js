import { CurrencyService } from "./modules/currency"

export const registerManaConversion = () => {
  CurrencyService.convertPrices();
  setTimeout(registerManaConversion, 1000);
};
