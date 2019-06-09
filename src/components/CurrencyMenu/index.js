import React, {Component} from 'react';
import classnames from 'classnames';

/**
 * Pocket component.
 */
class CurrencyMenu extends Component {
  constructor (props) {
    super (props);

    this.state = {
      isActive: false,
    };

    this.slideMenu = slideIn => {
      window.setTimeout (() => {
        if (!slideIn) {
          this.setState ({
            isActive: false,
          });
        } else {
          this.setState ({
            slideIn: true,
          });
        }
      }, 100);
    };
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.isActive) {
      this.setState ({
        isActive: true,
        toShowActiveList: nextProps.toShowActiveList,
      });
      this.slideMenu (true);
    } else {
      this.setState ({
        slideIn: false,
      });
      this.slideMenu ();
    }
  }

  render () {
    if (!this.props.items) {
      return null;
    }

    const wrapperClasses = classnames ('currency-menu__wrapper', {
      'currency-menu__wrapper--active': this.state.isActive,
    });
    const sectionClasses = classnames ('currency-menu__section', {
      'currency-menu__section--active': this.state.isActive,
      'currency-menu__section--slideIn': this.state.slideIn,
    });
    return (
      <div className={wrapperClasses}>
        <div className={sectionClasses}>
          <div className="currency-menu__section__list">
            {this.props.items.map (cur => (
              <div
                onClick={() =>
                  this.props.itemClickHandler (cur.id, this.props.isForSource)}
                key={cur.id}
                className="currency-menu__section__list__item"
              >
                <img
                  className="currency-menu__section__list__item__icon"
                  src={cur.icon}
                  alt=""
                />
                {cur.name}
              </div>
            ))}
          </div>
          

          <div
            onClick={this.props.close}
            className="currency-menu__section__action"
          >
            Close
          </div>
        </div>
      </div>
    );
  }
}

export default CurrencyMenu;
