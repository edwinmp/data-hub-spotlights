import React, { FunctionComponent, useState } from 'react';
import { SpotlightIndicator, SpotlightOptions, SpotlightTheme } from '../../utils';
import { SpotlightBanner } from '../SpotlightBanner';
import { SpotlightComparison } from '../SpotlightComparison';
import { SpotlightFilters } from '../SpotlightFilters';

interface ComparisonWrapperProps {
  themes: SpotlightTheme[];
  onCompare: (indicators: SpotlightIndicator[]) => void;
}

const ComparisonWrapper: FunctionComponent<ComparisonWrapperProps> = ({ themes, onCompare }) => {
  const [indicatorOne, setIndicatorOne] = useState<SpotlightIndicator | undefined>(undefined);
  const [indicatorTwo, setIndicatorTwo] = useState<SpotlightIndicator | undefined>(undefined);
  const onFilterChange = (index: number) => (options: SpotlightOptions): void => {
    if (options.indicator) {
      if (index === 0) {
        setIndicatorOne(options.indicator);
      } else {
        setIndicatorTwo(options.indicator);
      }
    }
  };
  const onClickCompare = (): void => {
    if (indicatorOne && indicatorTwo) {
      onCompare([indicatorOne, indicatorTwo]);
    }
  };

  return (
    <SpotlightBanner>
      <SpotlightComparison>
        <SpotlightFilters
          themes={themes}
          onOptionsChange={onFilterChange(0)}
          topicLabel="Topic"
          indicatorLabel="Indicator"
          yearLabel="Year"
          topicClassName="form-field--inline-three"
          indicatorClassName="form-field--inline-three"
          yearClassName="form-field--inline-three"
        />
      </SpotlightComparison>
      <SpotlightComparison legendClassName="spotlight__comparison-legend--alt">
        <SpotlightFilters
          themes={themes}
          onOptionsChange={onFilterChange(1)}
          topicLabel="Topic"
          indicatorLabel="Indicator"
          yearLabel="Year"
          topicClassName="form-field--inline-three"
          indicatorClassName="form-field--inline-three"
          yearClassName="form-field--inline-three"
        />
      </SpotlightComparison>
      <button
        type="submit"
        className="button button--compare"
        onClick={onClickCompare}
        disabled={!indicatorOne || !indicatorTwo}
      >
        Compare
      </button>
    </SpotlightBanner>
  );
};

export { ComparisonWrapper };
