import fetch from 'isomorphic-unfetch';
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { DefaultLayoutData, Footer, Navigation } from '../components/DefaultLayout';
import { EChartsBaseChart } from '../components/EChartsBaseChart';
import { PageSection } from '../components/PageSection';
import { toBasicAxisData } from '../components/EChartsBaseChart/utils';

interface PlaygroundProps {
  setData?: (data: DefaultLayoutData) => void;
  navigation: Navigation;
  footer: Footer;
}

const Playground: NextPage<PlaygroundProps> = ({ footer, navigation, setData }) => {
  useEffect(() => {
    if (setData) {
      setData({ navigation, footer });
    }
  }, [ setData, navigation ]);

  const options: ECharts.Options = {
    title: {
        text: 'Basic Bar Chart'
    },
    tooltip: {},
    legend: {
        data: [ 'Sales', 'Expenses' ]
    },
    xAxis: {
        data: toBasicAxisData([ 'Shirt', 'Cardign', 'Chiffon Shirt', 'Pants', 'Heels', 'Socks' ])
    },
    yAxis: {},
    series: [
      {
        name: 'Sales',
        type: 'bar',
        data: [ 5, 20, 36, 15, 10, 25 ]
      },
      {
        name: 'Expenses',
        type: 'bar',
        data: [ 2, 30, 3, 40, 20, 36 ]
      }
    ]
  };

  return (
    <PageSection>
      <h1>Visualisation Playground</h1>
      <EChartsBaseChart options={ options } width="700px"/>
    </PageSection>
  );
};

Playground.getInitialProps = async () => {
  const res_navigation = await fetch(`${process.env.ASSETS_SOURCE_URL}api/spotlights/navigation/`);
  const navigation = await res_navigation.json();
  const res_footer = await fetch(`${process.env.ASSETS_SOURCE_URL}api/footer/`);
  const footer = await res_footer.json();

  return {
    navigation,
    footer
  };
};

export default Playground;
