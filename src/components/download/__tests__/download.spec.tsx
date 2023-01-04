import useChangesStore from '@/stores/changesStore';
import renderer from 'react-test-renderer';
import Download from '../download';

vi.mock('@/stores/changesStore', () => ({
  default: vi.fn(() => ({ changes: 0 }))
}));

describe('Download', () => {
  it('should not render when there are no changes', () => {
    const tree = renderer.create(<Download />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render when there are changes', () => {
    vi.mocked(useChangesStore).mockReturnValueOnce({ changes: 10 });
    const tree = renderer.create(<Download />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
