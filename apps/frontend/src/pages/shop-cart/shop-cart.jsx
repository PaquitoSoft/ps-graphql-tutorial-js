import Button from "../../shared/button/button";
import Layout from "../../shared/layout/layout";
import Loading from "../../shared/loading/loading";
import CartItem from "./cart-item";
import useShopCart from './use-shop-cart';

function ShopCartPage() {
  const {
    shopCart,
    onRemoveCartItem,
    onCheckout,
    isCheckingOut
  } = useShopCart();

  if (!shopCart) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

  return (
    <Layout pageTitle="Shop Cart">
      <>
        <div className="mt-8">
          <div className="flow-root">
            <ul className="-my-6 divide-y divide-gray-200">
              {shopCart.items.map(cartItem => (
                <CartItem
                  key={cartItem?.product.id}
                  item={cartItem}
                  onRemoveClick={onRemoveCartItem}
                />
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-6 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Total</p>
            <p className="text-right">
              <span className="font-bold text-xl">{shopCart.totalAmount}</span>&nbsp;EUR
              <span className="block mt-0.5 font-normal text-sm text-gray-500">
                <span>{shopCart.totalUnits}</span>&nbsp;units
              </span>
            </p>
          </div>
          <div className="flex justify-end">
            <Button isDisabled={isCheckingOut} onClick={onCheckout}>
              Checkout
            </Button>
          </div>
        </div>
      </>
    </Layout>
  );
}

export default ShopCartPage;
