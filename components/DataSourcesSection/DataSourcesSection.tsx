import React, { FunctionComponent } from 'react';
import { PageSection, PageSectionHeading } from '../PageSection';

export interface DataSourcesLink {
  caption: string;
  url: string;
}

interface DataSourcesSectionProps {
  description: string;
  dataSourceLinks?: DataSourcesLink[];
}

const DataSourcesSection: FunctionComponent<DataSourcesSectionProps> = ({ description, dataSourceLinks }) => (
  <PageSection wide>
    <PageSectionHeading>Data & Sources</PageSectionHeading>
    <div className="is-typeset max-meter">
      <p>{description}</p>
      {dataSourceLinks &&
        dataSourceLinks.map((item, index) => {
          return (
            <p key={index}>
              <a href={item.url}>{item.caption}</a>
            </p>
          );
        })}
    </div>
  </PageSection>
);

export { DataSourcesSection };
