import { renderWithProviders } from '../../utils/test-utils';
import Layout from './layout';
describe('Layout', () => {
  it('should render children', () => {
    const container = renderWithProviders(
      <Layout>
        <p>Hello Hackaboss</p>
      </Layout>
    );

    expect(container.getByText('Hello Hackaboss')).toBeInTheDocument();
  });

  it('should render page title when provided', () => {
    const container = renderWithProviders(
      <Layout pageTitle="Test title">
        <p>Hello Hackaboss</p>
      </Layout>
    );

    expect(container.getByText('Test title')).toBeInTheDocument();
    expect(container.getByText('Hello Hackaboss')).toBeInTheDocument();
  });

  it('should render header with data', async () => {
    const container = renderWithProviders(
      <Layout>
        <p>Hello Hackaboss</p>
      </Layout>
    );

    await container.findByText('electronics');
    await container.findByText('3');
  });
})
