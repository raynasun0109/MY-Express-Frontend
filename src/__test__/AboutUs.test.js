import { render, waitFor, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import AboutUs from '../pages/AboutUs/AboutUs.js';
import * as router from 'react-router'
import { Provider } from 'react-redux'
import Navigation from '../components/Navigation/Navigation.js';
import store from "../redux/stores/index.js";
import { useStore } from 'react-redux';
import { renderWithProviders } from "../utils/utils-for-tests";

const initState={
    totalNumber:0,
    shoppingCart:[],
}
// const initialStoreState = useStore.getState()
     
//      beforeEach(() => {
//         useStore.setState(initialStoreState, true)
//       })

//     useStore.setState({ totalNumber:0,    shoppingCart:[]})

// jest.mock('react-redux', () => ({
//     connect: () => (ReactComponent) => ReactComponent,
//   }));
// const mockedUsedNavigate = jest.fn();

// jest.mock('react-router-dom', () => ({
//    ...jest.requireActual('react-router-dom') as any,
//   useNavigate: () => mockedUsedNavigate,
// }));
const navigate = jest.fn();

beforeEach(() => {
  jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
})
// describe("App", () => {
//     it("renders", async () => {
//       render(
//           <Provider>
//                 <AboutUs >
//                     {/* <Navigation/> */}
//                     </AboutUs>
//           </Provider>
        
//       );
  
//       expect(mockedUsedNavigate).toHaveBeenCalledWith('/post-1');
//     });
//   });

// test("Render About Us page ", () => {
 
//     render(<Provider store={store}><AboutUs /></Provider>)
//     const AboutUsComponent = screen.getByTestId("about_us");
//     expect(AboutUsComponent).toHaveTextContent("About Us")
//     expect(AboutUsComponent).toHaveTextContent("Mingyang Sun")
// });
// it('Renders footer correctly', () => {
//     const tree = renderer
//       .create(<renderWithProviders><AboutUs /></renderWithProviders>)
//       .toJSON();
//     expect(tree).toMatchSnapshot();
//   });
test('Uses preloaded state to render', () => {
    // const initialTodos = [{ id: 5, text: 'Buy Milk', completed: false }]
  
    const { getByText } = renderWithProviders(<AboutUs />, {
      preloadedState: {
        data: initState
      }
    })
  })