import { SpotlightTheme } from '.';

export const filterByThemeSection = (themes: SpotlightTheme[], section: string): SpotlightTheme[] =>
  themes.filter(theme => theme.section === section);
