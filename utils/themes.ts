import { SpotlightTheme } from '.';

export const filterThemesBySection = (themes: SpotlightTheme[], section: string): SpotlightTheme[] =>
  themes.filter(theme => theme.section === section);
