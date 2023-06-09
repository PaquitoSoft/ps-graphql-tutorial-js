import PropTypes from 'prop-types';
import { useQuery, gql } from '@apollo/client';

import Header from "./header";

const layoutDataQuery = gql`
  query LayoutDataQuery {
    categories {
      code
    }
    cart {
      totalUnits
    }
  }
`;

function Layout(props) {
  const { data } = useQuery(layoutDataQuery);

  return (
    <>
      <Header
        categories={data?.categories || []}
        cartItemsCount={data?.cart?.totalUnits || 0}
      />

      {
        Boolean(props.pageTitle) &&
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{props.pageTitle}</h1>
          </div>
        </header>
      }

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {props.children}
      </main>
    </>
  )
}
Layout.propTypes = {
  pageTitle: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Layout;
