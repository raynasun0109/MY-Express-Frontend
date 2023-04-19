import renderer from 'react-test-renderer';
import LogoHeader from '../components/LogoHeader/LogoHeader.js';

it('Renders LogoHeader correctly', () => {
    const tree = renderer
      .create(<LogoHeader />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
