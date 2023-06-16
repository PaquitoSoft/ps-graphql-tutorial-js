import { useCallback } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const shopCartQuery = gql/* GraphQL */`
  query ShopCartQuery {
    cart {
      id
      totalUnits
      totalAmount
      items {
        quantity
        product {
          id
          title
          price
          image
        }
      }
    }
  }
`;

const removeCartItemMutation = gql/* GraphQL */`
  mutation RemoveCartItem($productId: Int!) {
    removeProductFromCart(productId: $productId) {
      id
      totalUnits
      totalAmount
      items {
        quantity
        product {
          id
          title
          price
          image
        }
      }
    }
  }
`;

const checkoutMutation = gql/* GraphQL */`
  mutation CheckoutMutation {
    checkout
  }
`;

function useShopCart() {
  const navigate = useNavigate();

  const { data } = useQuery(shopCartQuery);

  const [removeCartItem, { loading: removeFromCartLoading }] = useMutation(removeCartItemMutation);
  const [checkout, { loading: checkoutLoading }] = useMutation(checkoutMutation, {
    refetchQueries: [
      'LayoutDataQuery'
    ]
  });

  const onRemoveCartItem = useCallback((productId) => {
    removeCartItem({
      variables: {
        productId
      }
    });
  }, [removeCartItem]);

  const onCheckout = useCallback(async () => {
    const { data } = await checkout();
    navigate(`/order-confirmation/${data?.checkout}`);
  }, [checkout, navigate]);

  return {
    shopCart: data?.cart,
    onRemoveCartItem,
    isRemovingItemFromCart: removeFromCartLoading,
    onCheckout,
    isCheckingOut: checkoutLoading
  }
};

export default useShopCart;

