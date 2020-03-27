import React, { FunctionComponent } from 'react';
import { PageSection, PageSectionHeading } from '../PageSection';

interface DataSourcesSectionProps {
  description: string;
  methodologyUrlText: string;
  datasourcesUrlText: string;
  methodologyUrl: string;
  datasourcesUrl: string;
}

const DataSourcesSection: FunctionComponent<DataSourcesSectionProps> = ({
  description,
  methodologyUrlText,
  datasourcesUrlText,
  methodologyUrl,
  datasourcesUrl
}) => {
  return (
    <PageSection wide>
      <PageSectionHeading>Data & Sources</PageSectionHeading>
      <div className="is-typeset max-meter">
        <p>{description}</p>
        <p>
          <a href={methodologyUrl}>{methodologyUrlText}</a>
        </p>
        <p>
          <a href={datasourcesUrl}>{datasourcesUrlText}</a>
        </p>
      </div>
    </PageSection>
  );
};

export { DataSourcesSection };
