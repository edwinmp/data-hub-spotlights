import React, { FunctionComponent } from 'react';
import ReactSelect, {
  OptionsType,
  Props as SelectProps,
  Styles,
  OptionProps,
  OptionTypeBase,
  GroupType,
  components
} from 'react-select';

export type SelectOptions = OptionsType<{ label: string; value: string }> | undefined;

export interface SelectOption {
  label: string;
  value: string;
}

interface ExtendedSelectProps extends SelectProps {
  chooseTheme?: 'light' | 'dark';
}

const DarkThemeOption = (props: OptionProps<OptionTypeBase>): JSX.Element => (
  <components.Option {...props}>
    <span>
      {props.children}
      <style jsx>{`
        padding-top: 5px;
        padding-bottom: 5px;
        padding-right: 7px;
        padding-left: 7px;
        background: rgba(143, 27, 19, 0.5);
        color: #fff;
        margin-left: 30px;
        :hover {
          background: rgba(143, 27, 19, 0.75);
        }
      `}</style>
    </span>
  </components.Option>
);

const DarkThemeGroupLabel = (group: GroupType<OptionTypeBase>): JSX.Element => (
  <div className="select-group-label">
    <span>{group.label}</span>
    <style jsx>{`
      div.select-group-label {
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-transform: uppercase;
        letter-spacing: 1px;
        padding: 0.75rem 0;
        color: #f3f3f3;
        font-size: 1.3rem;
        font-family: 'Geomanist Bold', sans-serif;
      }
    `}</style>
  </div>
);

const Select: FunctionComponent<ExtendedSelectProps> = ({ chooseTheme: theme, ...props }) => {
  const borderColor = '#8f1b13';
  const styles: Styles = {
    container: provided => ({ ...provided, fontSize: '1.6rem' }),
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
      color: theme === 'dark' ? '#fff' : '#443e42',
      backgroundColor: theme === 'dark' ? '#443e42' : '#FFFFFF',
      'z-index': 15000
    }),
    option: (provided, state) => ({
      ...provided,
      ':hover': theme === 'dark' ? { cursor: 'pointer' } : { backgroundColor: '#f0826d' },
      backgroundColor: state.isSelected && theme !== 'dark' ? borderColor : 'transparent'
    })
  };

  return (
    <ReactSelect
      {...props}
      styles={{ ...styles, ...props.styles }}
      components={theme === 'dark' ? { Option: DarkThemeOption } : undefined}
      formatGroupLabel={theme === 'dark' ? DarkThemeGroupLabel : undefined}
    />
  );
};

Select.defaultProps = {
  chooseTheme: 'light'
};

export { Select };
