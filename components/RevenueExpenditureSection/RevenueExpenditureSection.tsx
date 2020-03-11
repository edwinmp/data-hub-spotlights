import React, { FunctionComponent, useState } from 'react';
import { PageSection, PageSectionHeading } from '../PageSection';
import { SpotlightBanner, SpotlightBannerAside, SpotlightBannerMain, SpotlightBannerForm } from '../SpotlightBanner';
import { FormField } from '../FormField';
import { FormFieldSelect } from '../FormFieldSelect';
import { Button } from '../Button';
import { VisualisationSection, VisualisationSectionMain } from '../VisualisationSection';
import { SpotlightSidebar } from '../SpotlightSidebar';
import { SpotlightInteractive } from '../SpotlightInteractive';
import { processTemplateString, SpotlightLocation, SpotlightIndicator } from '../../utils';
import { CurrencySelector } from '../CurrencySelector';

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

  const onChangeCurrency = (isLocal: boolean): void => setUseLocalValue(isLocal);
  console.log(useLocalValue); // TODO: remove when variable is used elsewhere

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
              <FormFieldSelect label="Year" options={props.yearOptions} />
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
