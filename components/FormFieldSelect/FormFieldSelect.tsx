import React, { FunctionComponent } from 'react';
import { Props as SelectProps } from 'react-select';
import { Select } from '../Select';

interface FormFieldSelectProps extends SelectProps {
  label?: string;
  chooseTheme?: 'light' | 'dark';
}

const FormFieldSelect: FunctionComponent<FormFieldSelectProps> = ({ label, chooseTheme: theme, ...options }) => {
  return (
    <>
      {label ? <label className="form-label">{label}</label> : null}
      <Select {...options} chooseTheme={theme} />
    </>
  );
};

FormFieldSelect.defaultProps = { chooseTheme: 'light' };

export { FormFieldSelect };
