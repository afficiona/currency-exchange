import React, { Component } from 'react';
import classnames from 'classnames';

/**
 * Component to display the list of customers who are invited to the party!
 * If no data in the props, there is nothing to show. Hence, returning null.
 */
class List extends Component {
  render() {
    
    const { data } = this.props;

    //Nothing to show!
    if (!data) {
      return null;
    }

    return (
      <div className="customers__list">
        <div className="customers__list__total">
          {`Total: ${data.size}`}
        </div>

        <div className="customers__list__header">
          <div className="customers__list__header__each">
            #S.No.
          </div>
          <div className="customers__list__header__each">
            Name
          </div>
          <div className="customers__list__header__each" id="customersFirstName">
            User Id
          </div>
        </div>

        <div className="customers__list__body">
          
          {data.map((customer, index) => {
            const rowClasses = classnames('list__row', {
              'list__row--highlighted': customer.get('isToBeInvited')
            });
            return (
              <div className={rowClasses} key={customer.get('user_id')}>
                {<div className="list__row--item">{index + 1}</div>}
                {
                  <div className="list__row--item">
                    {customer.get('name')}
                  </div>
                }
                {<div className="list__row--item">{customer.get('user_id')}</div>}
              </div>
            )
          })}

        </div>
      </div>
    );
  }
}

export default List;
