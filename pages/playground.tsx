import fetch from 'isomorphic-unfetch';
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { DefaultLayoutData, Footer, Navigation } from '../components/DefaultLayout';
import { EChartsBaseChart } from '../components/EChartsBaseChart';
import { PageSection } from '../components/PageSection';

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
        text: 'ECharts Example'
    },
    tooltip: {},
    legend: {
        data: [ 'Sales' ]
    },
    xAxis: {
        data: [ 'shirt', 'cardign', 'chiffon shirt', 'pants', 'heels', 'socks' ]
    },
    yAxis: {},
    series: [ {
        name: 'Sales',
        type: 'bar',
        data: [ 5, 20, 36, 10, 10, 20 ]
    } ]
  };

  return (
    <PageSection>
      <h1>Visualisation Playground</h1>
      <EChartsBaseChart options={ options }/>
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
