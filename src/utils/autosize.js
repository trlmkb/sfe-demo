export const autoSize = (target, initialHeight) => {
  target.style.height = initialHeight;
  target.style.height = target.scrollHeight + "px";
};
