import React, { useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { NextPage } from 'next';
import { DefaultLayoutData, Navigation } from '../components/DefaultLayout';

interface PlaygroundProps {
  setData?: (data: DefaultLayoutData) => void;
  navigation: Navigation;
}
const Playground: NextPage<PlaygroundProps> = ({ navigation, setData }) => {
  useEffect(() => {
    if (setData) {
      setData({ navigation });
    }
  }, [ setData, navigation ]);

  return <h1>Visualisation Playground</h1>;
};

Playground.getInitialProps = async () => {
  const res = await fetch(`${process.env.ASSETS_SOURCE_URL}api/spotlights/navigation/`);
  const data = await res.json();

  return { navigation: data[0] };
};

export default Playground;
