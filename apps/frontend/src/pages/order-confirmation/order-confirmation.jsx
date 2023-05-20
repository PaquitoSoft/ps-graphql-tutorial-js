import { Link, useParams } from 'react-router-dom';

import Layout from "../../shared/layout/layout";

function OrderConfirmationPage() {
  const { orderId } = useParams();
  return (
    <Layout>
      <div className="text-center pt-8">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Order successfully created!</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            <span>This is your order ID:</span>
            <span className="font-bold pl-2">{orderId}</span>
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
          </div>
        </div>
    </Layout>
  );
}

export default OrderConfirmationPage;
