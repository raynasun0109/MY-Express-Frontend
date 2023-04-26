import renderer from 'react-test-renderer';
import Footer from '../components/Footer/Footer.js';

it('Renders footer correctly', () => {
    const tree = renderer
      .create(<Footer />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });