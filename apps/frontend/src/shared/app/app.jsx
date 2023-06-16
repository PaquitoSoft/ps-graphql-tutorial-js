import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import HomePage from '../../pages/home/home';
import CategoryPage from '../../pages/category/category';
import ProductPage from '../../pages/product/product';
import ShopCartPage from '../../pages/shop-cart/shop-cart';
import OrderConfirmationPage from '../../pages/order-confirmation/order-confirmation';
import apolloClient from '../../apollo-client';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:categoryCode" element={<CategoryPage />} />
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/cart" element={<ShopCartPage />} />
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
          </Routes>
        </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
