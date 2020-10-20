import { CONJURED, MAX_ITEM_VALUE, MIN_ITEM_VALUE } from "../constants";

const setMaxQuality = (quality) => (quality > MAX_ITEM_VALUE ? MAX_ITEM_VALUE : quality);

const setMinQuality = (quality) => (quality < MIN_ITEM_VALUE ? MIN_ITEM_VALUE : quality);

const getItemName = (item) => (item.name.startsWith(CONJURED) ? CONJURED : item.name);

export { setMaxQuality, setMinQuality, getItemName };
