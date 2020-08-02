# adwr_table_data

> Data Table for ADWR and ESRI Portal data

[![NPM](https://img.shields.io/npm/v/adwr_table_data_.svg)](https://www.npmjs.com/package/adwr_table_data) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save adwr-data-table
```

## Usage

```jsx
import React, { Component } from "react";
import Table, { TableTab, ADWRTableObj } from "adwr-data-table";
import adwr from "./data/adwrData.json";

class Example extends Component {
  render() {
    const ADWR = new ADWRTableObj("ADWR", adwr);
    return (
      <Table data={[ADWR]}>
        <TableTab name="ADWR" sort={true} roundTo={2} />
      </Table>
    );
  }
}
```

# **Table of Contents**

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Table](#table)
- [TableTab](#tabletab)
  - [`config`](#config)
  - [`Custom Cell`](#custom-cell)
  - [`Actions`](#actions)
- [Data Table Constructor](#data-table-constructor)
- [Deployment](#deployment)

# **Overview**

The ADWR Data Table allows for data to be recieved from different sources and become formatted to fit the Data Table. It does this by creating a new [`DataTableConstructor`](#data-table-constructor) based on the data that is suitable for the table. Once this data has been formatted, it can then be passed in an array to the [`Table`](#table) component. The Table component then determines which [`TableTab`](#tabletab) the data needs to go into by matching the names specified in the [`DataTableConstructor`](#data-table-constructor) and the [`TableTab`](#tabletab).

# **Data Table Constructor**

## Purpose:

Formats the incoming data to fit the Table structure. It does this by declaring a new [`DataTableObject`], passing the data, name of TableTab and UniqueId, then the object that is returned will be structured to fit the [`TableTab`](#tabletab).

There currently are four different types of [`DataTableObjects`]. The first two are based on the [`TableTab`] being **read only**. If the table is going to have no [`Actions`](#actions), then use the DataTableObjects without `_Edit` at the end of the name. The two current **read only**, object constructors are **`ADWRTableObj`** & **`ESRITableObj`**.

If the table is supposed to have [`Action`](#actions) capabilities, then use the other two types of object constructors... **`ADWRTableObj_Edit`** & **`ESRITableObj_Edit`**.

## Props passed into constructor:

| Props    | Type   | Required | Description                                  |
| :------- | :----- | :------- | :------------------------------------------- |
| name     | string | true     | Matches the name of the data to the TableTab |
| data     | object | true     | Data to be formatted                         |
| UniqueId | string | false    | Used to match the data based on a unique id  |

### How to use...

```jsx
import Table, { TableTab, ADWRTableObj } from "adwr-data-table";
import adwr from "./data/adwrData.json";

class Example extends Component {
  render() {
    const ADWR = new ADWRTableObj("ADWR", adwr);
    const ADWR_Edit = new ADWRTableObj_Edit("ADWR Edit", adwr, "id");
    return (
      <Table showTabs={false} data={[ADWR, ADWR_Edit]}>
        <TableTab name="ADWR" sort={true} roundTo={2} />
        <TableTab name="ADWR_Edit" sort={true} roundTo={2} />
      </Table>
    );
  }
}
```

# **Table**

## Purpose:

The Table Component acts as a wrapper for the [`TableTabs`](#tabletab) within it. When multiple TableTabs are declared as children, the Table Component breaks the data from the array of data passed as a prop and assigns it to the specific TableTab. This is so that all data being used has one entry point in the Table Component and the component determines where the data needs to go.

The Table Component also handles, the tab count located at the top of each TableTab. When the data is filtered for its specific TableTab, the Table Component will count the amount of records in the array and display it in the Tab.

## Props passed into component:

| Props    | Type          | Required | Description                                                      |
| :------- | :------------ | :------- | :--------------------------------------------------------------- |
| data     | Array[Object] | true     | Passes the property data as an array of objects to the component |
| showTabs | boolean       | false    | Determines if tabs are visible                                   |
| children | component     | true     | Is the actual table that displays the data                       |

### How to use...

```jsx
import React, { Component } from "react";
import Table, { TableTab, ADWRTableObj } from "adwr-data-table";
import adwr from "./data/adwrData.json";

class Example extends Component {
  render() {
    const ADWR = new ADWRTableObj("ADWR", adwr);
    return (
      <Table showTabs={false} data={[ADWR]}>
        <TableTab name="ADWR" sort={true} roundTo={2} />
      </Table>
    );
  }
}
```

# **TableTab**

## Purpose:

The TableTab is the actual Table the renders the data. TableTab handles all the actions (passed as props) with the table. If no actions are passed as props to the TableTab, then no ActionButtons appear in the footer of the table.

The ActionButtons appear in the footer of the table depending on if the prop has been passed to it. For example, if no [`editAction`] prop has been passed to TableTab, then the ActionButton for editing will not appear in the footer.

## Props passed into component:

| Props        | Type     | Required | Description                                                          |
| :----------- | :------- | :------- | :------------------------------------------------------------------- |
| data         | Object   | true     | Is inherited from the Table Component                                |
| sort         | boolean  | false    | Adds sorting functionality to table                                  |
| name         | string   | true     | Name used to match the data from Table Component                     |
| config       | object   | false    | Used to configure cells to a certain format during editing or adding |
| selectAction | function | false    | Used to select rows from the table                                   |
| editAction   | function | false    | Used to edit rows from the table                                     |
| addAction    | function | false    | Used to add rows from the table                                      |
| deleteAction | function | false    | Used to delete rows from the table                                   |

### How to use...

```jsx
import React, { Component } from "react";
import Table, { TableTab, ADWRTableObj_Edit } from "adwr-data-table";
import adwr from "./data/adwrData.json";

class Example extends Component {
  render() {
    const ADWR = new ADWRTableObj_Edit("ADWR", adwr);
    return (
      <Table showTabs={false} data={[ADWR]}>
        <TableTab
          name="ADWR"
          sort={true}
          config={{
            RGR_PUMP_DATA: {
              type: "select",
              values: ["YES", "NO"],
              id: "id",
              multiple: false,
              required: true,
              size: 1,
            },
          }}
          selectAction={{
            selectCallBack: () => console.log("row was selected from table"),
          }}
          editAction={{
            editCallBack: () => console.log("row was edited in table"),
          }}
          addAction={{
            addCallBack: () => console.log("row was added to table"),
          }}
          deleteAction={{
            deleteCallBack: () => console.log("row was deleted from table"),
          }}
        />
      </Table>
    );
  }
}
```

### `config`

The config prop allows for the developer to pass a [`Custom Cell`](#custom-cell) to the table. Within the config prop, the array is structured with the key being the column name and the value being the custom component.

There are two different cells that can be customized. The first being the 'Options' cell. This is the cell that selects the specific row. So if the developer wanted to have a different cell than the default 'select' icon, they can create a new CustomOption component and pass it in the config prop. The Custom Option component returns the selected row via the 'selectRow' prop.

The other cell that can be customized is the edit cell. When the row is in edit mode or a new row is added to the table, the cells that will be displayed will be the custom edit cell. For example, if a row is selected for editing, then the cells in that row will be converted into the [`Custom Cells`](#custom-cell) specified in the config by the matching key name.

```jsx
const CustomInput = ({ customRef, value, handleChange }) => {
  return <input ref={customRef} value={value} onChange={handleChange} />;
};
const CustomSelect = ({ customRef, value, handleChange }) => {
  return (
    <select
      className="custom-select"
      ref={customRef}
      name="value"
      value={value}
      onChange={handleChange}
    >
      <option value="one">one</option>
      <option value="two">two</option>
      <option value="three">three</option>
    </select>
  );
};
const CustomOption = ({ selectRow }) => {
  return <button onClick={() => console.log(selectRow)}>Manage</button>;
};
const config = {
  Options: CustomOption,
  WELL_TYPE: CustomInput,
  RGR_PUMP_DATA: CustomSelect,
};
```

### `Custom Cell`

Cells `<td>` for the table can be customized by passing a custom component to the [`config`](#config) prop under the key... 'custom'. The custom component will be wrapped in a `<td>` cell. This prop allows for the developer to use their own custom cell instead of the built in cell that comes with the table. Then the developer can apply their own actions and restrictions on the cell.

### `Actions`

Actions are events that happen on the table, such as editing, selecting, deleting a row. When the row is deleted, or edited within the table, it does not actually change the actual data, just the data in the table. That is why there is a callback attached to the action. When the delete button is clicked in the footer of the table, then the deleteCallback is triggered and the row is deleted from the table and the row is returned to the parent component to do as the developer plans.

Same goes for editing. When a row is edited and saved, the TableTab creates a new object with the row changes and replaces the existing row with the updated row. Then it returns the new object to the parent component outside of the Table so the developer can send the update to the database or whatever they want to do with it.

## Props passed into component:

| Props        | Type     | Required | Description                                                          |
| :----------- | :------- | :------- | :------------------------------------------------------------------- |
| data         | Object   | true     | Is inherited from the Table Component                                |
| sort         | boolean  | false    | Adds sorting functionality to table                                  |
| name         | string   | true     | Name used to match the data from Table Component                     |
| config       | object   | false    | Used to configure cells to a certain format during editing or adding |
| selectAction | function | false    | Used to select rows from the table                                   |
| editAction   | function | false    | Used to edit rows from the table                                     |
| addAction    | function | false    | Used to add rows from the table                                      |
| deleteAction | function | false    | Used to delete rows from the table                                   |

### How to use...

```jsx
import React, { Component } from "react";
import Table, { TableTab, ADWRTableObj_Edit } from "adwr-data-table";
import adwr from "./data/adwrData.json";

class Example extends Component {
  render() {
    const ADWR = new ADWRTableObj_Edit("ADWR", adwr);
    return (
      <Table showTabs={false} data={[ADWR]}>
        <TableTab
          name="ADWR"
          sort={true}
          config={{
            RGR_PUMP_DATA: {
              type: "select",
              values: ["YES", "NO"],
              id: "id",
              multiple: false,
              required: true,
              size: 1,
            },
          }}
          selectAction={{
            selectCallBack: () => console.log("row was selected from table"),
          }}
          editAction={{
            editCallBack: () => console.log("row was edited in table"),
          }}
          addAction={{
            addCallBack: () => console.log("row was added to table"),
          }}
          deleteAction={{
            deleteCallBack: () => console.log("row was deleted from table"),
          }}
        />
      </Table>
    );
  }
}
```

![Alt text](./src/edits.PNG?raw=true "Optional Title")

## License

MIT © [jrnels10](https://github.com/jrnels10)
