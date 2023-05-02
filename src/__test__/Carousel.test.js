import renderer from 'react-test-renderer';
import Carousel from '../components/Carousel/Carousel.js';

it('Renders Carousel correctly', () => {
    const tree = renderer
      .create(<Carousel />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });