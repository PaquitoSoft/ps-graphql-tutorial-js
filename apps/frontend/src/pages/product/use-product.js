import { useCallback } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";

const productDetailQuery = gql/* GraphQL */`
  query ProductDetailQuery($productId: Int!) {
    product(productId: $productId) {
      id
      title
      price
      description
      image
    }
  }
`;

const addToCartMutation = gql/* GraphQL */`
  mutation AddProductToCart($productId: Int!) {
    addProductToCart(cartItem: {
      productId: $productId,
      quantity: 1
    }) {
      id
      userId
      items {
      quantity
        product {
          title
          price
        }
      }
    }
  }
`;

function useProduct(productId) {
  const { data } = useQuery(productDetailQuery, {
    variables: {
      productId
    }
  });

  const [addToCart, { loading }] = useMutation(addToCartMutation);

  const onAddToCart = useCallback(() => {
    addToCart({
      variables: {
        productId
      },
      refetchQueries: [
        'LayoutDataQuery'
      ]
    });
  }, [addToCart, productId]);

  return {
    product: data?.product,
    onAddToCart,
    isAddingProductToCart: loading
  };
}

export default useProduct;
