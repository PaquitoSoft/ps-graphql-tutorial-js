import { useParams } from "react-router-dom";
import { useQuery, gql } from '@apollo/client';

import Layout from "../../shared/layout/layout";
import Loading from "../../shared/loading/loading";

import ProductCard from "./product-card";

const categoryDetailQuery = gql`
  query CategoryDetailQuery($categoryCode: String!) {
    category(categoryCode: $categoryCode) {
      code
      products {
        id
        title
        price
        image
      }
    }
  }
`;

function CategoryPage() {
  const { categoryCode } = useParams();

  const { data, loading } = useQuery(categoryDetailQuery, {
    variables: {
      categoryCode: categoryCode
    }
  });

  if (loading) {
    return (
      <Layout pageTitle="">
        <Loading />
      </Layout>
    );
  }

  return (
    <Layout pageTitle={categoryCode}>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {
          data?.category.products?.map(product =>
            <ProductCard
              key={product.id}
              product={product}
            />
          )
        }
      </div>
    </Layout>
  );
}

export default CategoryPage;
