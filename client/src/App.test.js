import { render, screen } from "@testing-library/react";
import App from "./App";

/** irrelevant test -- will implement my own */
test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
