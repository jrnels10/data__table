import React, { Component } from 'react';
import { loadModules } from 'esri-loader';
const options = { version: '4.14' };


var template = {
    title: "{OBJECTID}",
    content: [
        {
            type: "fields",
            fieldInfos: [
                {
                    fieldName: "OBJECTID",
                    label: "OBJECTID"
                }
            ]
        }
    ]
};


async function loadMap(value) {
    loadModules(['esri/views/MapView',
        "esri/layers/FeatureLayer",
        'esri/Map'], options)
        .then(async ([MapView, FeatureLayer, Map]) => {
            var map = new Map({
                basemap: "streets"
            });

            var view = new MapView({
                container: "viewDiv",
                map: map,
                zoom: 10,
                center: [-112, 33.3]
            });

            var featureLayer = new FeatureLayer({
                id: 'test-layer',
                popupEnabled: true,
                popupTemplate: template,
                url: "https://gisweb3.azwater.gov/arcgis/rest/services/Wells/GWSI/MapServer/2"
            });

            map.add(featureLayer);
            value.dispatch({ type: "SET_VIEW", payload: { view } })
        })
}

export default class ESRImap extends Component {
    async componentDidMount() {
        await loadMap(this.props.value)
    }
    render() {
        return (
            <div style={{ height: '100%' }} id='viewDiv' />
        )
    }
}
