// import React from 'react';
// import {
//   renderIntoDocument,
//   scryRenderedDOMComponentsWithClass,
//   scryRenderedDOMComponentsWithId,
//   scryRenderedDOMComponentsWithTag,
//   Simulate,
//   shallowRender
// } from 'react-dom/test-utils';
// import { expect } from 'chai';
// import { fromJS } from 'immutable';
// import List from '../../src/components/List';

// describe('Component: List', () => {
//   let customersWhileFetching;
//   let customersNotFound;
//   let customersOnFetchingError;
//   let customersWhenSuccessfullyFetched;

//   beforeEach(() => {
//     customersWhileFetching = fromJS({
//       data: null,
//       error: null,
//       isLoading: true
//     });

//     customersWhenSuccessfullyFetched = fromJS({
//       data: [{
//         user_id: 1,
//         name: 'Aman Pandey',
//         latitude: '53.55',
//         longitude: '-100.34'
//       }],
//       isLoading: false,
//       error: null
//     });

//     customersOnFetchingError = fromJS({
//       data: null,
//       isLoading: false,
//       error: 'Something went wrong!'
//     });

//     customersNotFound = fromJS({
//       data: [],
//       isLoading: false,
//       error: null
//     });
    
//   });

//   it('Shows loading screen when component mounts', () => {
//     const component = renderIntoDocument(
//       <List Customers={customersWhileFetching} />
//     );
//     const loading = scryRenderedDOMComponentsWithClass(
//       component,
//       'loading loading-circle'
//     );
//     const listRow = scryRenderedDOMComponentsWithClass(component, 'list__row');

//     // loader should be shown while fetching the customers
//     expect(loading).to.have.lengthOf(1);
//     // customers list should have no customers to show.
//     expect(listRow).to.have.lengthOf(0);
//   });

//   it('Shows customer list with at least one customer on successful fetching', () => {
//     const component = renderIntoDocument(
//       <List Customers={customersWhenSuccessfullyFetched} />
//     );
//     const loading = scryRenderedDOMComponentsWithClass(
//       component,
//       'loading loading-circle'
//     );
//     const listRow = scryRenderedDOMComponentsWithClass(component, 'list__row');

//     // loader should be hidden once fetching is complete
//     expect(loading).to.have.lengthOf(0);
//     // customers list should have at least one customer item to show
//     expect(listRow).to.have.lengthOf.above(0);
//   });

//   it('Shows customer list with empty screen message when no customers found', () => {
//     const component = renderIntoDocument(
//       <List Customers={customersNotFound} />
//     );
//     const loading = scryRenderedDOMComponentsWithClass(
//       component,
//       'loading loading-circle'
//     );
//     const listRow = scryRenderedDOMComponentsWithClass(component, 'list__row');
//     const customersListBodyEmpty = scryRenderedDOMComponentsWithClass(
//       component,
//       'customers__list__body--empty'
//     );

//     // loader should be hidden once fetching is complete
//     expect(loading).to.have.lengthOf(0);
//     // customers list should have no customers to show
//     expect(listRow).to.have.lengthOf(0);
//     // customers list should show an empty-customers screen
//     expect(customersListBodyEmpty).to.have.lengthOf(1);
//   });

//   it('On error in fetching customers', () => {
//     const component = renderIntoDocument(
//       <List Customers={customersOnFetchingError} />
//     );
//     const loading = scryRenderedDOMComponentsWithClass(
//       component,
//       'loading loading-circle'
//     );
//     const listRow = scryRenderedDOMComponentsWithClass(component, 'list__row');
//     const customersListBodyError = scryRenderedDOMComponentsWithClass(
//       component,
//       'customers__list__body--error'
//     );

//     // loader should be hidden once fetching is complete
//     expect(loading).to.have.lengthOf(0);
//     // customers list should have no customers to show
//     expect(listRow).to.have.lengthOf(0);
//     // customers list should show an error screen
//     expect(customersListBodyError).to.have.lengthOf(1);
//   });
  
// });
