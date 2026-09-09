import { clsx, type ClassValue } from "clsx";
import merge from "../lib/twMerge.config";

export const cn = (...inputs: ClassValue[]) => {
    return merge(clsx(inputs));
};
