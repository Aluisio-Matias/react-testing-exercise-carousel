import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

//smoke test
test('Renders without crashing', () => {
  render(<Carousel />);
});

//snapshot
it("matches snapshot", () => {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
})


it("works when you click on the right arrow", () => {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("works when you click on the left arrow", () => {
  const { getByTestId, queryByAltText } = render(<Carousel />);
  const rightArrow = getByTestId("right-arrow");
  const leftArrow = getByTestId("left-arrow");

  //move to the right once first because the left arrow is initially hidden
  fireEvent.click(rightArrow)

  // move backward (to the left) in the carousel and expect the first image
  fireEvent.click(leftArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
});

test("hide and show the arrows appropriately", () => {
  const { getByTestId } = render(<Carousel />);
  const leftArrow = getByTestId("left-arrow");
  const rightArrow = getByTestId("right-arrow");

  //expect the left arrow to be missing, but the right arrow to be showing
  expect(leftArrow).toHaveClass("hidden");
  expect(rightArrow).not.toHaveClass("hidden");

  //move forward and expect both arrow to be present
  fireEvent.click(getByTestId("right-arrow"));
  expect(leftArrow).not.toHaveClass("hidden");
  expect(rightArrow).not.toHaveClass("hidden");

  //move forward again and expect only the right arrow to be missing
  fireEvent.click(rightArrow);
  expect(leftArrow).not.toHaveClass("hidden");
  expect(rightArrow).toHaveClass("hidden");
});

