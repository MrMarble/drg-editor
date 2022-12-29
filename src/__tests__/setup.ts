import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";

vi.mock("zustand");
vi.mock("react-dom");

afterEach(cleanup);
