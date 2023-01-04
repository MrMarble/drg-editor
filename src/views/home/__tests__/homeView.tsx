import renderer from 'react-test-renderer';
import { HomeView } from '../homeView';

describe('HomeView', () => {
  it('should render', () => {
    const tree = renderer.create(<HomeView />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
