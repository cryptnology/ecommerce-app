type ThemeStoreType = {
  mode: 'light' | 'dark';
  toggleMode: (theme: 'light' | 'dark') => void;
};

export default ThemeStoreType;
