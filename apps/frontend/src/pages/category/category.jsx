import { useParams } from "react-router-dom";
import Layout from "../../shared/layout/layout";

import ProductCard from "./product-card";

function CategoryPage() {
  const { categoryCode } = useParams();

  // TODO: To be implemented
  const data = {
    category: {
      products: []
    }
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
