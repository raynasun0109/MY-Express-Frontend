import renderer from 'react-test-renderer';
import Copyright from '../components/Copyright/Copyright.js';

it('Renders Copyright correctly', () => {
    const tree = renderer
      .create(<Copyright />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });