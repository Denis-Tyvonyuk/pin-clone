import { create } from "zustand";

const useEditorStore = create((set) => ({
  selectedLayer: "canvas",
  setSelectedLayer: (newLayer) => set({ selectedLayer: newLayer }),
  textOptions: {
    text: "",
    fontSize: 48,
    color: "#000000",
    top: 0,
    left: 0,
  },

  canvasOptions: {
    height: 0,
    orientation: "",
    size: "original",
    backgroundColor: "#008080",
  },
  setCanvasOptions: (newOption) => set({ canvasOptions: newOption }),

  setTextOptions: (newOptions) => set({ textOptions: newOptions }),
  addText: () =>
    set({
      textOptions: {
        text: "Add text",
        fontSize: 48,
        color: "#000000",
        top: 0,
        left: 0,
      },
    }),
}));

export default useEditorStore;
