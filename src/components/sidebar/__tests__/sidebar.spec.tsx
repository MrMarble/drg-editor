import { act, render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import SideBar from '../sidebar';

describe('Sidebar', () => {
  const tabs = [{ name: 'Resources', icon: 'assets/resources.webp' }];

  it('should render correctly', () => {
    const onClick = vi.fn();

    const tree = renderer
      .create(<SideBar onClick={onClick} tabs={tabs} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should handle tab click', () => {
    const onClick = vi.fn();
    render(<SideBar onClick={onClick} tabs={tabs} />);

    act(() => screen.getByText('Resources').click());

    expect(onClick).toBeCalledWith('Resources');
  });
});
