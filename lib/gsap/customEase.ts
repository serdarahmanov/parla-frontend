import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

export const EASE_BRAND = "brandEase";

CustomEase.create(EASE_BRAND, "M0,0 C0.76,0 0.24,1 1,1");
