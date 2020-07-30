#ADWR GIS APPLICATION

### Below is a detailed explanation on the process and structure of the GIS application.

## Table of Contents

- [Installation](#nstallation)
- [Initiate Table](#initiate-table)
- [Table Structure](#table-structure)
- [Table Parameters](#table-paramaters)

## Initiate Table

To initialize a data table within a project, you must format the data using the [`TableDataBuilders`](#table-data-builders). Then import the [`Table`](#table) and [`TableTabs`](#table-tabs) from TableV2. The Object that is returned from [`TableDataBuilders`](#table-data-builders) will be passed to [`Table`](#table) as an array of objects. The [`TableTabs`](#table-tabs) will then be passed as a child of [`Table`](#table) where it will then receive the data specific to the `TableTab`. It is done this way so that if multiple [`TableTabs`](#table-tabs) are present, the [`Table`](#table) will determine what `TableTab` is visible based on the Tab that is clicked.

```js
import React, { Component } from "react";
import Table2, { TableTab } from "./TableV2/Table";
import { ESRITableObj, ADWRTableObj } from "./TableV2/TableObj";

export default class Scratch extends Component {
  render() {
    const GWSI = new ESRITableObj("GWSI", gwsiData, "OBJECTID");
    const ADWR = new ADWRTableObj("ADWR", adwrData);

    return (
      <Table2 data={[GWSI, ADWR]}>
        <TableTab name="GWSI" sort={true} locate={true} roundTo={2} />
        <TableTab name="ADWR" sort={true} locate={false} roundTo={2} />
      </Table2>
    );
  }
}
```

## Table Structure

The ADWR GIS React Application can be run in both Visual Studio and Visual Studio Code. The ide of choice must have [Node.js](https://nodejs.org/en/) installed to run the virtual server and to install package dependencies.
Once Node is installed, pull the ADWR GIS APP Repository into a local folder, navigate to that folder and run `npm install` in the terminal. This will install all [`dependencies`](#dependencies) for the Application.

## Table

Table is the wrapper for the [`TableTabs`](#table-tabs). This component determines what `TableTab` is visible. It also breaks the array of objects down and passes the proper data to the correct `TableTab`.

## Props passed into component:

| Props           | Type             | Required | Description                                                                      | Example                                                                                       |
| :-------------- | :--------------- | :------- | :------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------- |
| table           | array of objects | true     | determines the tabs and headers of the table.                                    | [{ 'id': "wellReg",'name': 'Wells55','searchBy': 'REGISTRY_ID', 'layer': 'WellRegistry_5793'} |
| view            | object           | true     | The object that houses all of the layers used in the map                         | {layerViews:{...},graphics:{...}}                                                             |
| dispatch        | function         | true     | A function that takes an object parameter to clear the queryResults array.       | dispatch({type:"CLEAR_DATA",{payload:[]}})                                                    |
| queryResults    | array of objects | true     | The data to be loaded into the table.                                            | [{type:'GWSI',item:feature[0]},{type:'Wells55',item:feature[1]}]                              |
| externalButtons | boolean          | false    | Displays the buttons to access external queries such as docushare. Default=false | externalButtons={true}                                                                        |

---

## How to use...

ADWR GIS Application is divided into two applications:

- `ADWR GIS React` Is a front end application the handles the arcGIS map and UI.
- `ADWR GIS API` is a backend API for GIS related services.

The GIS React Application requires that the GIS API be running. This is because the API determines if the application is online of offline. The developer can go into the web.config file for the GIS API and switch the specific map to offline if needed.

`<add key="WellsHubStatus" value="Offline" /> <!--Active/Offline-->`

The API also allows initial data to be loaded in the map. For example, waterbank makes a request to the database and creates a featureLayer in the map based on this data. If the data is not available in the SDE then a seperate request through the GIS API is made.

Current API requests can be found [here](https://gisweb3.azwater.gov/gis_api)

<----------------------------------------------------------------------------------->

## Folder Structure

As of 5/19/20, the folder structure appears as follows:

```
CLIENTAPP/
  React_README.md
  ADWR_GIS_README.md
  node_modules/
  package.json
  deploy.js
  .gitignore
  .env
  public/
    index.html
    favicon.ico
    manifest.json
  src/
    components/
        library/
            Alert/
            Buttons/
            Cards/
            HOC/
            Legend/
            loader/
            modals/
            Notice/
            Table/
            Templates/
            Tools/
        Map/
        Nav/
            NavOptions/
                Basemap/
                Buffer/
                CustomSearch/
                Draw/
                Edit/
                Layers/
                Print/
                Search/
                TRS/
        Pages/
            GWSI/
            Home/
                Images/
            Offline/
            SurfaceWater/
            WaterBank/
                Images/
                wbComponents/
            Wellshub/
                Images/
                whComponents/
        Utils/
            API/
            Error/
    images/
    Context.js
    App.js
    registerServiceWorker.js
    index.css
    index.js

```

<----------------------------------------------------------------------------------->

## Dependencies

Dependencies for the application can be found in the the package.json file in the root of the project.

- [`@babel/polyfill`](https://babeljs.io/docs/en/babel-polyfill)- This will emulate a full EcmaScript2015
- [`axios`](https://github.com/axios/axios)- simplified fetch request
- [`esri-loader`](https://github.com/Esri/esri-loader) - react version of ArcGIS JavaScript
- `move-file` - moves contents of build folder to IIS server
- [`prompts`](https://www.npmjs.com/package/prompts) - used for terminal questionaire
- [`react`](https://reactjs.org/) - A JavaScript library for building user interfaces
-

<----------------------------------------------------------------------------------->

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run deploy` recommended

Runs the deploy.js file found at the root of the project. The file runs in the terminal and asks the developer a series of questions about the build.

- It will ask what environment is the build for...
  - Development: `localhost:3000`
  - Test: `https://gisweb-test.azwater.gov/waterbank`
  - Production: `https://gisweb3.azwater.gov/waterbank`
- Then is will ask for the landing page if the build is for Test or Production
  - If the build is for Development, Home.js will be the landing page.
- It will then ask for your confirmation on the build and once approved it will build the app which can be found the CLIENTAPP/build folder.

<----------------------------------------------------------------------------------->

## Portal

### Building Map

The ADWR GIS React application like many other mapping applications uses the ESRI ArcGIS JavaScript API (ESRI_API) to load a default map and tools for the user to interact with the map and data. For this application and many others built for ADWR, the mapping application uses ESRI_API to import a custom built map from Portal or ArcGIS Online into the application. For this particular case, we are importing a Portal map. https://gisweb3.azwater.gov/portal

### Importing Map to Application

The map is built in Portal using layers provided from either shapefiles or REST service URLs. Once this map is built in Portal, the url for the webmap will contain the mapId as the endPoint... `https://gisweb3.azwater.gov/portal/webmap?id=`12345678910

This mapId is then brought in to the application as a Portal map reference. In the case of ADWR GIS React Application, the mapId is stored in the Portal.js file located in the Utils folder. The mapId is then imported in the Map.js file. This is done so that the same Map.js file can be used for every application. There is no need to create a seperate Map.js file for each map.

```js
<script>
        import React, { Component } from 'react';
        import { loadModules } from 'esri-loader';

        loadModules([
            'esri/views/MapView',
             "esri/config",
            'esri/WebMap'])
            .then(([MapView, esriConfig, WebMap]) => {
        esriConfig.portalUrl = "https://gisweb3.azwater.gov/portal/";

        /************************************************************
         * Creates a new WebMap instance. A WebMap must reference
         * a PortalItem ID that represents a WebMap saved to
         * arcgis.com or an on-premise portal.
         *
         * To load a WebMap from an on-premise portal, set the portal
         * url with esriConfig.portalUrl.
         ************************************************************/
        var webmap = new WebMap({
          portalItem: {
            // autocasts as new PortalItem()
            id: "12345678910"
          }
        });

        /************************************************************
         * Set the WebMap instance to the map property in a MapView.
         ************************************************************/
        var view = new MapView({
          map: webmap,
          container: "viewDiv"
        });
      });
    </script>
```

When the map is imported into the application, it will render the webmap that was created in Portal.

## Adding Layers to map

There are two ways to add a layer to the webmap. First, you can create the featureLayer or mapImageLayer and add it to the map manually as for the WaterBank map for the WaterBank FeatureLayer. Second and probably the most common, is to add the layer to the Portal map. This is the easiest method for adding a layer to the map.

<----------------------------------------------------------------------------------->

## Deployment

npm run deploy creates a build directory with a production or test build of your app. Set up your favourite HTTP server so that a visitor to your site is served index.html, and requests to static paths like /static/js/main.<hash>.js are served with the contents of the /static/js/main.<hash>.js file.

### `IIS`

Deploying a React Application to an IIS server is as simple as copying the contents of the build folder into the application folder on the IIS server. https://dev.to/sumitkharche/how-to-deploy-react-application-on-iis-server-1ied

The ADWR GIS React Application uses React Router to handle what map to load in the landing page. ADWR uses the base domain `gisweb3.azwater.gov` as the default website and the subfolders as the urlendpoint to determine what application to render. Because of this, the React application must follow a similar structure in when routing for a particular map.

For example...

IIS

```
   Default Web Site/ https://gisweb3.azwater.gov
       WaterBank/ https://gisweb3.azwater.gov/waterbank
       WellsHub/ https://gisweb3.azwater.gov/wellshub
       SWtopo2/ https://gisweb3.azwater.gov/swtopo2
```

ADWR GIS React App

```js
<script>
  import React from 'react'; import {(BrowserRouter, Route, Switch)} from
  'react-router-dom'; import WellsHub from
  './components/Pages/Wellshub/WellsHub'; import WaterBank from
  './components/Pages/WaterBank/WaterBank'; export default (props) =>{" "}
  {
    <BrowserRouter basename={"https://gisweb3.azwater.gov"}>
      <Switch>
        <Route exact path="/waterbank" component={WaterBank} /> /*
        https://gisweb3.azwater.gov/waterbank*/
        <Route exact path="/wellshub" component={WellsHub} /> /* https://gisweb3.azwater.gov/wellshub*/
      </Switch>
    </BrowserRouter>
  }
</script>
```
