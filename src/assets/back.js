const modules = import.meta.glob("./*.svg", {
  eager: true,
  query: "?react",
  import: "default",
});

const backgrounds = {};

Object.entries(modules).forEach(([, component], index) => {
  backgrounds[`Back${index + 1}`] = component;
});

export default backgrounds;