import { render, waitFor, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import AboutUs from '../pages/AboutUs/AboutUs.js';

// jest.mock('react-redux', () => ({
//     connect: () => (ReactComponent) => ReactComponent,
//   }));
const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as any),

    // 4- Mock the required hook
      useNavigate: () => mockedUsedNavigate
}));

describe("App", () => {
    it("renders", async () => {
      render(
        <AboutUs />
      );
  
      // expect(mockedUsedNavigate).toHaveBeenCalledWith('/post-1');
    });
  });

// test("Render About Us page ", () => {
 
//     render(<AboutUs />)
//     const AboutUsComponent = screen.getByTestId("about_us");
//     expect(AboutUsComponent).toHaveTextContent("About Us")
//     expect(AboutUsComponent).toHaveTextContent("Mingyang Sun")
// });