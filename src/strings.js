/** Shared user-facing copy — punctuation and formatting. */
import { OUTSIDE_DELIVERY_FREE_KM } from "./packages.js";
import { isWithinFreeDeliveryRadius } from "./delivery.js";

export const SUPPORT_PHONE = "077 375 7018";
export const SUPPORT_PHONE_E164 = "0773757018";

export const FREE_INSTALLATION_RADIUS_LABEL =
  OUTSIDE_DELIVERY_FREE_KM + " km · free installation included";

export const FREE_INSTALLATION_RADIUS_SHORT =
  OUTSIDE_DELIVERY_FREE_KM + " km · free installation included";

export function installationQualifiedLabel(km) {
  const n = Math.round(Number(km) || 0);
  if (n > 0 && isWithinFreeDeliveryRadius(n)) {
    return "Qualified — free installation included · ~" + n + " km from Harare";
  }
  return "Qualified — free installation within " + OUTSIDE_DELIVERY_FREE_KM + " km of Harare";
}

export function installationQualifiedShort() {
  return "Qualified · free installation included";
}

export function installationCheckoutHint(quote) {
  if (!quote?.enabled) {
    return "Free installation within " + OUTSIDE_DELIVERY_FREE_KM + " km of Harare";
  }
  if (quote.fee > 0) {
    return "+" + quote.fee.toLocaleString() + " delivery for installation";
  }
  if (quote.km > 0 && isWithinFreeDeliveryRadius(quote.km)) {
    return installationQualifiedShort();
  }
  return FREE_INSTALLATION_RADIUS_SHORT;
}
