import React, { FunctionComponent, ReactNode, useEffect, useState } from 'react';
import {
  BudgetType,
  createYearOptionsFromRange,
  processTemplateString,
  SpotlightIndicator,
  SpotlightLocation
} from '../../utils';
import { Alert } from '../Alert';
import { CurrencySelector } from '../CurrencySelector';
import { FormField } from '../FormField';
import { FormFieldSelect } from '../FormFieldSelect';
import { Icon } from '../Icon';
import { Loading } from '../Loading';
import { PageSection, PageSectionHeading } from '../PageSection';
import { RevenueExpenditureLineChart } from '../RevenueExpenditureLineChart';
import { RevenueExpenditureTreeMap } from '../RevenueExpenditureTreeMap';
import { SelectOption } from '../Select';
import { SpotlightBanner, SpotlightBannerAside, SpotlightBannerForm, SpotlightBannerMain } from '../SpotlightBanner';
import { SpotlightInteractive } from '../SpotlightInteractive';
import { SpotlightSidebar } from '../SpotlightSidebar';
import { VisualisationSection, VisualisationSectionMain } from '../VisualisationSection';
import { getIndicatorContentOptions, parseBudgetType, useRevenueExpenditureData } from './utils';

interface SelectType {
  label: string;
  value: string;
}

interface RevenueSectionProps {
  countryCode: string;
  countryName: string;
  currencyCode: string;
  indicator: SpotlightIndicator;
  location?: SpotlightLocation;
  budgetTypeOptions?: SelectType[];
}

const renderPaddedAlert = (message: string): ReactNode => (
  <div>
    <Alert variant="error">
      <Icon name="error-error" />
      <p>{message}</p>
    </Alert>
    <style jsx>{`
      div {
        padding: 8px;
      }
    `}</style>
  </div>
);

const RevenueExpenditureSection: FunctionComponent<RevenueSectionProps> = ({ indicator, location, ...props }) => {
  const [retryCount, setRetryCount] = useState(0);
  const [useLocalValue, setUseLocalValue] = useState(false);
  const [year, setYear] = useState<number | undefined>(indicator.start_year && indicator.start_year);
  const [budgetTypes, setBudgetTypes] = useState<BudgetType[]>([]);
  const [selectedBudgetType, setSelectedBudgetType] = useState<BudgetType | undefined>(undefined);
  const { data, dataLoading, options, setOptions, refetch, error } = useRevenueExpenditureData(
    {
      indicators: [indicator.ddw_id],
      geocodes: location ? [location.geocode] : [props.countryCode],
      limit: 10000
    },
    indicator
  );
  useEffect(() => {
    setOptions({
      ...options,
      geocodes: location ? [location.geocode] : [props.countryCode],
      indicators: [indicator.ddw_id]
    });
    setYear(indicator.start_year);
  }, [location]);
  useEffect(() => {
    if (!dataLoading && year && data.hasOwnProperty(year)) {
      const _budgetTypes = Object.keys(data[year]) as BudgetType[];
      setBudgetTypes(_budgetTypes);
      setSelectedBudgetType(_budgetTypes[0]);
    }
    if (retryCount > 0 && !dataLoading) {
      setRetryCount(0);
    }
  }, [dataLoading]);
  useEffect(() => {
    if (error) {
      const { message } = error;
      if (message.includes('relation') && message.includes('does not exist') && retryCount === 0 && refetch) {
        refetch();
        setRetryCount(retryCount + 1);
      }
    } else if (retryCount > 0) {
      setRetryCount(0);
    }
  }, [error]);

  const onChangeCurrency = (isLocal: boolean): void => setUseLocalValue(isLocal);
  const onSelectYear = (option?: SelectOption): void => {
    if (option) {
      setYear(parseInt(option.value));
      if (data && data[option.value]) {
        const _budgetTypes = Object.keys(data[option.value]) as BudgetType[];
        setBudgetTypes(_budgetTypes);
        setSelectedBudgetType(_budgetTypes[0]);
      }
    } else {
      setYear(undefined);
      setBudgetTypes([]);
    }
  };
  const onChangeBudgetType = (option?: SelectOption): void => {
    if (option) {
      setSelectedBudgetType(option.value as BudgetType);
    } else {
      setSelectedBudgetType(undefined);
    }
  };

  return (
    <PageSection>
      <PageSectionHeading>
        {processTemplateString(indicator.name, { location: location ? location.name : props.countryName })}
      </PageSectionHeading>

      <SpotlightBanner className="spotlight-banner--alt">
        <SpotlightBannerAside>
          <FormField className="form-field--inline">
            <FormFieldSelect
              label="Year"
              options={createYearOptionsFromRange(indicator.start_year, indicator.end_year)}
              value={year ? { label: `${year}`, value: `${year}` } : null}
              onChange={onSelectYear}
            />
          </FormField>
          <FormField className="form-field--inline">
            <FormFieldSelect
              label="Budget Type"
              options={budgetTypes.map(type => ({ label: parseBudgetType(type), value: type }))}
              value={
                selectedBudgetType ? { label: parseBudgetType(selectedBudgetType), value: selectedBudgetType } : null
              }
              isLoading={dataLoading}
              isDisabled={dataLoading}
              onChange={onChangeBudgetType}
            />
          </FormField>
        </SpotlightBannerAside>
        <SpotlightBannerMain>
          <SpotlightBannerForm>
            <FormField className="form-field--inline">
              <CurrencySelector currencyCode={props.currencyCode} width="100%" onChange={onChangeCurrency} />
            </FormField>
          </SpotlightBannerForm>
        </SpotlightBannerMain>
      </SpotlightBanner>

      <VisualisationSection>
        <SpotlightSidebar>
          <SpotlightInteractive background="#ffffff">
            {error ? (
              renderPaddedAlert('Something went wrong while loading this widget')
            ) : (
              <Loading active={dataLoading}>
                <RevenueExpenditureLineChart
                  data={data}
                  budgetType={selectedBudgetType}
                  valueOptions={{
                    dataFormat: 'currency',
                    useLocalValue,
                    prefix: useLocalValue ? props.currencyCode : indicator.value_prefix,
                    suffix: indicator.value_suffix
                  }}
                />
              </Loading>
            )}
          </SpotlightInteractive>
        </SpotlightSidebar>
        <VisualisationSectionMain>
          <SpotlightInteractive background="#ffffff">
            {error ? (
              renderPaddedAlert('Something went wrong while loading this widget')
            ) : (
              <Loading active={dataLoading}>
                <RevenueExpenditureTreeMap
                  data={
                    data && year && data.hasOwnProperty(year) && selectedBudgetType
                      ? data[year][selectedBudgetType]
                      : []
                  }
                  budgetType={selectedBudgetType}
                  config={getIndicatorContentOptions(indicator)}
                  valueOptions={{
                    dataFormat: 'currency',
                    useLocalValue,
                    prefix: useLocalValue ? props.currencyCode : indicator.value_prefix,
                    suffix: indicator.value_suffix
                  }}
                />
              </Loading>
            )}
          </SpotlightInteractive>
        </VisualisationSectionMain>
      </VisualisationSection>
    </PageSection>
  );
};

export { RevenueExpenditureSection };
