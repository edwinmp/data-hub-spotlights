import React, { FunctionComponent } from 'react';
import { OptionsType } from 'react-select';
import Select, { Props as AsyncProps } from 'react-select/async';
import { getDefaultStyles } from './utils';
import { DarkThemeOption, DarkThemeGroupLabel } from '.';

interface AsyncSelectProps extends AsyncProps<OptionsType<{ label: string; value: string }>> {
  chooseTheme?: 'light' | 'dark';
}

const AsyncSelect: FunctionComponent<AsyncSelectProps> = ({ chooseTheme: theme, styles, ...props }) => {
  const borderColor = '#8f1b13';

  return (
    <Select
      {...props}
      styles={{ ...getDefaultStyles(theme || 'light', borderColor), ...styles }}
      components={theme === 'dark' ? { Option: DarkThemeOption } : undefined}
      formatGroupLabel={theme === 'dark' ? DarkThemeGroupLabel : undefined}
    />
  );
};

export { AsyncSelect };
