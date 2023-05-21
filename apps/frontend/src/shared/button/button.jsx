import PropTypes from 'prop-types';
import cx from 'classnames';

function Button({
  type = 'button',
  isDisabled = false,
  size = 'm',
  onClick,
  children
}) {
  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={
        cx(
          cx(
            'mt-10 flex items-center justify-center rounded-md border border-transparent  px-8 py-3 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2',
            { 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500': !isDisabled },
            { 'cursor-not-allowed bg-gray-500 hover:bg-gray-600 focus:ring-0': isDisabled },
            { 'w-32': size === 's' },
            { 'w-64': size === 'm' },
            { 'w-full': size === 'l' },
          )
        )
      }
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit']),
  isDisabled: PropTypes.bool,
  size: PropTypes.oneOf(['s', 'm', 'l']),
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default Button;
