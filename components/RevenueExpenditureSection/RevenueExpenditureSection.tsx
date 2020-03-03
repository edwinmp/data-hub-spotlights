import React, { FunctionComponent } from 'react';
import { PageSection, PageSectionHeading } from '../PageSection';
import { SpotlightBanner, SpotlightBannerAside, SpotlightBannerMain, SpotlightBannerForm } from '../SpotlightBanner';
import { FormField } from '../FormField';
import { FormFieldSelect } from '../FormFieldSelect';
import { Button } from '../Button';
import { VisualisationSection, VisualisationSectionMain } from '../VisualisationSection';
import { SpotlightSidebar } from '../SpotlightSidebar';
import { SpotlightInteractive } from '../SpotlightInteractive';

interface SelectType {
  label: string;
  value: string;
}

interface RevenueSectionProps {
  budgetTypeOptions?: SelectType[];
  currencyOptions?: SelectType[];
  yearOptions?: SelectType[];
}

const RevenueExpenditureSection: FunctionComponent<RevenueSectionProps> = ({
  budgetTypeOptions,
  currencyOptions,
  yearOptions
}) => {
  return (
    <PageSection>
      <PageSectionHeading>Revenue in [Location]</PageSectionHeading>
      <SpotlightBanner className={'spotlight-banner--alt'}>
        <SpotlightBannerAside>
          <FormField className={'form-field--inline'}>
            <FormFieldSelect label={'Budget Type'} options={budgetTypeOptions} />
          </FormField>
          <FormField className={'form-field--inline'}>
            <FormFieldSelect label={'Currency'} options={currencyOptions} />
          </FormField>
        </SpotlightBannerAside>
        <SpotlightBannerMain>
          <SpotlightBannerForm>
            <FormField className={'form-field--inline'}>
              <FormFieldSelect label={'Year'} options={yearOptions} />
            </FormField>
            <FormField className={'form-field--inline'}>
              <Button className={'button'}>{'Update'}</Button>
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
