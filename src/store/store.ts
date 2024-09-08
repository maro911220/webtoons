import { create } from "zustand";

type Store = {
  toonWeb: string[];
};

export const defaultStore = create<Store>()((set) => ({
  toonWeb: ["kakao", "naver", "kakao_page"],
}));
