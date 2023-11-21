import { create } from "zustand";

const useAuthStore = create((set) => ({
  name: "",
  role: "",
  id: "",
  setUserName: (name) => set({ name: name }),
  setUserRole: (role) => set({ role: role }),
  setId: (userId) => set({ id: userId }),
  logout: () => set({ role: "", id: "", name: "" }),
}));

export default useAuthStore;
