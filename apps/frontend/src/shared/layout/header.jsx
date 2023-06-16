import PropTypes from 'prop-types';
import cx from 'classnames';
import { Disclosure } from '@headlessui/react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { Link, NavLink } from 'react-router-dom';

const isCurrentPage = (categoryCode) => window.location.pathname === `/category/${categoryCode}`;

function NavigationItem(props) {
  return (
    <NavLink
      key={props.category.code}
      to={`/category/${props.category.code}`}
      className={({ isActive }) =>
        cx(
          { 'bg-gray-900 text-white': isActive },
          { 'text-gray-300 hover:bg-gray-700 hover:text-white': !isActive },
          'rounded-md px-3 py-2 text-sm font-medium'
        )
      }
      aria-current={isCurrentPage(props.category.code) ? 'page' : undefined}
    >
      {props.category.code}
    </NavLink>
  );
}
NavigationItem.propTypes = {
  category: PropTypes.shape({
    code: PropTypes.string.isRequired
  }).isRequired
}

function Header(props) {
  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-gray-800">
        {
          () => (
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <Link to='/'>
                      <img
                        className="h-8 w-8"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Fake Store"
                      />
                    </Link>
                  </div>

                  {/* Categories navigation */}
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {props.categories.map((category) => (
                        <NavigationItem key={category.code} category={category} />
                      ))}
                    </div>
                  </div>
                </div>
                <Link to="/cart" className="relative">
                  <ShoppingBagIcon className="h-10 w-10 text-white" />
                  {
                    Boolean(props.cartItemsCount) &&
                    <span
                      className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-gray absolute top-6 right-0"
                    >
                      {props.cartItemsCount}
                    </span>
                  }
                </Link>
              </div>
            </div>
          )
        }
      </Disclosure>
    </div>
  );
}
Header.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired
    })
  ).isRequired,
  cartItemsCount: PropTypes.number
};

export default Header;
