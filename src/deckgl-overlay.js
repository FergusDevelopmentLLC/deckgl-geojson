import React, {Component} from 'react';
import DeckGL, {GeoJsonLayer} from 'deck.gl';

const LIGHT_SETTINGS = {
  // lightsPosition: [-0.144528, 49.739968, 8000, -3.807751, 54.104682, 8000],
  // ambientRatio: 0.4,
  // diffuseRatio: 0.6,
  // specularRatio: 0.2,
  // lightsStrength: [0.8, 0.0, 0.8, 0.0],
  // numberOfLights: 2

  lightsPosition: [-97.5, 37.5, 1000],
  ambientRatio: 1,
  diffuseRatio: 1,
  specularRatio: 1,
  lightsStrength: [1, 1],
  numberOfLights: 1
};

export default class DeckGLOverlay extends Component {

  static get defaultViewport() {
    return {
      longitude: -97.5,
      latitude: 37.5,
      zoom: 4.5,
      minZoom: 1,
      maxZoom: 15,
      pitch: 20,
      bearing: 0
    };
  }

  render() {
    const {viewport, data, colorScale} = this.props;

    if (!data) {
      return null;
    }

    const layer = new GeoJsonLayer({
      id: 'geojson',
      data,
      opacity: 0.8,
      stroked: false,
      filled: true,
      extruded: true,
      wireframe: true,
      fp64: true,
      getElevation: f => Math.sqrt(f.properties.valuePerSqm) * 10,
      getFillColor: f => colorScale(f.properties.growth),
      getLineColor: f => [255, 255, 255],
      lightSettings: LIGHT_SETTINGS,
      pickable: Boolean(this.props.onHover),
      onHover: this.props.onHover
    });

    return (
      <DeckGL {...viewport} layers={ [layer] } initWebGLParameters />
    );
  }
}
