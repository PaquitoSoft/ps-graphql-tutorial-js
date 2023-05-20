import { useCallback } from "react";
import PropTypes from 'prop-types';

function CartItem({ item, onRemoveClick }) {
  const removeItemHandler = useCallback(() => {
    onRemoveClick(item.product.id);
  }, [item.product.id, onRemoveClick]);

  return (
    <li className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={item.product.image}
          alt={item.product.title}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <a href={`/product/${item.product.id}`}>{item.product.title}</a>
            </h3>
            <p className="ml-4">{item.product.price}&nbsp;<span className="text-xs">EUR</span></p>
          </div>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">Qty {item.quantity}</p>

          <div className="flex">
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-400"
              onClick={removeItemHandler}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
CartItem.propTypes = {
  item: PropTypes.shape({
    product: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    }).isRequired,
    quantity: PropTypes.number.isRequired,
  }),
  onRemoveClick: PropTypes.func.isRequired,
};


export default CartItem;
