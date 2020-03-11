import React, { FunctionComponent } from 'react';
import { Select, SelectOption } from '../Select';

interface CurrencySelectorProps {
  currencyCode: string; // for local currency - only alternative is US$
  label?: string;
  placeholder?: string;
  width?: string;
  onChange?: (isLocalCurrency: boolean) => void;
}

const getOptions = (currencyCode: string): SelectOption[] => [
  { label: 'Constant 2015 USD', value: '$' },
  { label: `Current ${currencyCode}`, value: 'local' }
];

const CurrencySelector: FunctionComponent<CurrencySelectorProps> = ({ onChange, currencyCode, ...props }) => {
  const onSelectCurrency = (option: SelectOption): void => {
    if (onChange) {
      onChange(option.value === 'local');
    }
  };
  const options = getOptions(currencyCode);

  return (
    <div>
      <label className="form-label">{props.label}</label>
      <Select options={options} onChange={onSelectCurrency} placeholder={props.placeholder} defaultValue={options[0]} />
      <style jsx>{`
        width: ${props.width};
      `}</style>
    </div>
  );
};

CurrencySelector.defaultProps = {
  width: '300px',
  label: 'Currency',
  placeholder: 'Select Currency'
};

export { CurrencySelector };
