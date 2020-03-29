import React, { FunctionComponent } from 'react';
import { PageSection, PageSectionHeading } from '../PageSection';
import { WebsiteUrl } from '../../utils';

export interface DataSourcesLink {
  caption: string;
  url: string;
  page_url: string;
}

interface DataSourcesSectionProps {
  description: string;
  dataSourceLinks?: DataSourcesLink[];
}

const DataSourcesSection: FunctionComponent<DataSourcesSectionProps> = ({ description, dataSourceLinks }) => {
  const links = dataSourceLinks?.map((item, index) => {
    return (
      <p key={index}>
        <a href={item.url.length > 0 ? item.url : WebsiteUrl + item.page_url}>{item.caption}</a>
      </p>
    );
  });
  return (
    <PageSection wide>
      <PageSectionHeading>Data & Sources</PageSectionHeading>
      <div className="is-typeset max-meter">
        <p>{description}</p>
        {links}
      </div>
    </PageSection>
  );
};

export { DataSourcesSection };
