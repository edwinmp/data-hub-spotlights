import fetch from 'isomorphic-unfetch';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { DefaultLayoutData, Footer, Navigation } from '../components/DefaultLayout';
import { EChartsBaseChart } from '../components/EChartsBaseChart';
import { PageSection } from '../components/PageSection';
import { NumericAxisConfig as AxisConfig } from '../components/PlottableAxis/types';

interface PlaygroundProps {
  setData?: (data: DefaultLayoutData) => void;
  navigation: Navigation;
  footer: Footer;
}

const PlottableAxis = dynamic(
  () => import('../components/PlottableAxis').then(mod => mod.PlottableAxis),
  { ssr: false }
);

const Playground: NextPage<PlaygroundProps> = ({ footer, navigation, setData }) => {
  useEffect(() => {
    if (setData) {
      setData({ navigation, footer });
    }
  }, [ setData, navigation ]);
  const [ axisConfig, setAxisConfig ] = useState<AxisConfig | undefined>();
  const configureAxis = async () => {
    const NumericAxisConfig = await import('../components/PlottableAxis/NumericAxisConfig')
      .then(mod => mod.NumericAxisConfig);
    const config = new NumericAxisConfig({
      domain: [ 1, 10 ],
      tickInterval: 1,
      prefix: 'Num ',
      orientation: 'bottom',
      // data: [ 1, 3, 4, 5, 7, 9 ],
      showEndTickLabels: true
    });
    setAxisConfig(config);
  };
  // trigger configureAxis on initial component mount
  useEffect(() => {
    configureAxis();
  }, []);

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
      { axisConfig ? <PlottableAxis config={ axisConfig }/> : null }
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
