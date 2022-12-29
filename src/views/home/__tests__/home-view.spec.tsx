import renderer from "react-test-renderer";
import { HomeView } from "../home-view";

describe("HomeView", () => {
  it("should render", () => {
    const tree = renderer.create(<HomeView />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
