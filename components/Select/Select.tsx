import React, { FunctionComponent } from 'react';
import ReactSelect, { OptionsType, Props as SelectProps, Styles } from 'react-select';

export type SelectOptions = OptionsType<{ label: string; value: string }> | undefined;

export interface SelectOption {
  label: string;
  value: string;
}

type chooseThemeType = 'light' | 'dark';

interface ExtendedSelectProps extends SelectProps {
  chooseTheme: chooseThemeType;
}

const Select: FunctionComponent<ExtendedSelectProps> = props => {
  const borderColor = '#8f1b13';
  const styles: Styles = {
    container: provided => ({
      ...provided,
      fontSize: '1.6rem'
    }),
    control: provided => ({
      ...provided,
      ':hover': { borderColor },
      borderColor: '#ddd',
      boxShadow: 'none',
      height: '48px',
      borderRadius: '0'
    }),
    menu: provided => ({
      ...provided,
      color: props.chooseTheme === 'dark' ? '#fff' : '#443e42',
      backgroundColor: props.chooseTheme === 'dark' ? '#443e42' : '#FFFFFF',
      'z-index': 15000
    }),
    option: (provided, state) => ({
      ...provided,
      ':hover':
        props.chooseTheme === 'dark'
          ? {
              cursor: 'pointer'
            }
          : { backgroundColor: '#f0826d' },
      backgroundColor: state.isSelected && props.chooseTheme !== 'dark' ? borderColor : 'transparent'
    })
  };

  return <ReactSelect {...props} styles={{ ...styles, ...props.styles }} />;
};

Select.defaultProps = {
  chooseTheme: 'light'
};

export { Select };
