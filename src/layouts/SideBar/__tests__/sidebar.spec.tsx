import { act, render } from "@testing-library/react";
import renderer from "react-test-renderer";
import { SideBar } from "../sidebar";

describe("Sidebar", () => {
  it("should render correctly", () => {
    const tree = renderer.create(<SideBar handleClick={() => ({})} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should handle tab click", () => {
    const handleClick = vi.fn();
    const { getByText } = render(<SideBar handleClick={handleClick} />);
    act(() => getByText("Season").click());

    expect(handleClick).toBeCalledWith("Season");
  });
});
