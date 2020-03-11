import React, { FunctionComponent, useState } from 'react';
import { createYearOptionsFromRange, processTemplateString, SpotlightIndicator, SpotlightLocation } from '../../utils';
import { Button } from '../Button';
import { CurrencySelector } from '../CurrencySelector';
import { FormField } from '../FormField';
import { FormFieldSelect } from '../FormFieldSelect';
import { PageSection, PageSectionHeading } from '../PageSection';
import { SelectOption } from '../Select';
import { SpotlightBanner, SpotlightBannerAside, SpotlightBannerForm, SpotlightBannerMain } from '../SpotlightBanner';
import { SpotlightInteractive } from '../SpotlightInteractive';
import { SpotlightSidebar } from '../SpotlightSidebar';
import { VisualisationSection, VisualisationSectionMain } from '../VisualisationSection';

interface SelectType {
  label: string;
  value: string;
}

interface RevenueSectionProps {
  countryName: string;
  currencyCode: string;
  indicator: SpotlightIndicator;
  location?: SpotlightLocation;
  budgetTypeOptions?: SelectType[];
  yearOptions?: SelectType[];
}

const RevenueExpenditureSection: FunctionComponent<RevenueSectionProps> = ({ indicator, location, ...props }) => {
  const [useLocalValue, setUseLocalValue] = useState(false);
  const [selectedYear, setSelectedYear] = useState(indicator.start_year);

  const onChangeCurrency = (isLocal: boolean): void => setUseLocalValue(isLocal);
  const onSelectYear = (option?: SelectOption): void => setSelectedYear(option ? parseInt(option.value) : undefined);
  console.log(useLocalValue, selectedYear); // TODO: remove when variable is used elsewhere

  return (
    <PageSection>
      <PageSectionHeading>
        {processTemplateString(indicator.name, { location: location ? location.name : props.countryName })}
      </PageSectionHeading>
      <SpotlightBanner className="spotlight-banner--alt">
        <SpotlightBannerAside>
          <FormField className="form-field--inline">
            <FormFieldSelect label="Budget Type" options={props.budgetTypeOptions} />
          </FormField>
          <FormField className="form-field--inline">
            <CurrencySelector currencyCode={props.currencyCode} onChange={onChangeCurrency} width="100%" />
          </FormField>
        </SpotlightBannerAside>
        <SpotlightBannerMain>
          <SpotlightBannerForm>
            <FormField className="form-field--inline">
              <FormFieldSelect
                label="Year"
                options={createYearOptionsFromRange(indicator.start_year, indicator.end_year)}
                defaultValue={
                  indicator.start_year ? { label: `${indicator.start_year}`, value: `${indicator.start_year}` } : null
                }
                onChange={onSelectYear}
              />
            </FormField>
            <FormField className="form-field--inline">
              <Button>Update</Button>
            </FormField>
          </SpotlightBannerForm>
        </SpotlightBannerMain>
      </SpotlightBanner>
      <VisualisationSection>
        <SpotlightSidebar>
          <SpotlightInteractive />
        </SpotlightSidebar>
        <VisualisationSectionMain>
          <SpotlightInteractive />
        </VisualisationSectionMain>
      </VisualisationSection>
    </PageSection>
  );
};

export { RevenueExpenditureSection };
