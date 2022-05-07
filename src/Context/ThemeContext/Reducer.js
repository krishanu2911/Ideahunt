export const Reducer = (themeState, themeAction) => {
    localStorage.setItem("theme", themeAction.type);
    return { ...themeState, theme: themeAction.type };
}