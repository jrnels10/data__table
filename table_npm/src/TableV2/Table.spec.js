import React from 'react';
import { mount } from 'cypress-react-unit-test';
import Table, { TableTab } from '../Table';
import WellsJson from './../data/wells55.json'
import GWSIJson from './../data/gwsi.json'
import { ESRITableObj, ESRITableObj_Edit } from './TableDataBuilder';
const data = new ESRITableObj('test', WellsJson, 'OBJECTID');
const data2 = new ESRITableObj('test2', GWSIJson, 'OBJECTID');

describe('Table Component', () => {
    it('if Table Object is passed to Table Component, the count of rows should appear in the tab', () => {
        mount(<Table
            data={[data]}
        >
            <TableTab name='test' />
        </Table>)
        cy.get('.table__tabs').should('be.visible');
        cy.get('.count').contains('1')
    });

    it(`If more than one set of data is added to the Table Component,
     then multiple tabs should appear with the count of rows in the tab`, () => {
        mount(<Table
            data={[data, data2]}
        >
            <TableTab name='test' />
            <TableTab name='test2' />
        </Table>)
        cy.get('.data-table').children().equal(2)
        cy.get('.count').contains('1')
    })
})