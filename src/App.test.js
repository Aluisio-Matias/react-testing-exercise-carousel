import React from 'react';
import { render } from "@testing-library/react"
import App from './App';

//smoke test
test("Renders App without crashing", () => {
    render(<App />)
});

it("matches snapshot", () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
})

