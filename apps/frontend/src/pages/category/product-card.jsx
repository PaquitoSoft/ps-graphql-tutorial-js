import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="group relative">
      <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-xl bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link to={`/product/${product.id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.title}
            </Link>
          </h3>
        </div>
        <p className="text-sm font-medium text-gray-900">{product.price}</p>
      </div>
    </div>
  );
}
ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number,
  })
};

export default ProductCard;
