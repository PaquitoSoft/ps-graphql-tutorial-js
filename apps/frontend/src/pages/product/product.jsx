import { useParams } from "react-router-dom";

import Layout from "../../shared/layout/layout";
import Loading from "../../shared/loading/loading";
import Button from "../../shared/button/button";
import useProduct from './use-product';

function ProductPage() {
  const { productId } = useParams();

  const {
    product,
    onAddToCart,
    isAddingProductToCart
  } = useProduct(parseInt(productId, 10));

  if (!product) {
    return (
      <Layout pageTitle="">
        <Loading />
      </Layout>
    );
  }


  if (!product) {
    return (
      <Layout pageTitle="">
        <Loading />
      </Layout>
    );
  }

  return (
    <Layout pageTitle={product.title}>
      <div className="bg-white">
        <div className="pt-6">
          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-6">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>

            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900"><span className="font-bold">{product.price}</span>&nbsp;EUR</p>

              <div className="pt-4">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>

              <Button
                size="l"
                isDisabled={isAddingProductToCart}
                onClick={onAddToCart}
              >
                Add to cart
              </Button>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductPage;
