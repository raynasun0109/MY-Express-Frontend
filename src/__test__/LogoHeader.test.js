import LogoHeader from '../components/LogoHeader/LogoHeader.js';
import {render, screen,waitFor,fireEvent} from '@testing-library/react';

describe("LogoHeader component ",()=>{
    test("Logo shows up",()=>{
        render(<LogoHeader/>);
        expect(screen.getByRole("img")).toBeInTheDocument();
    })
   
    test("Clicks Logo go to home page",()=>{
        const {getByTestId} = render(<LogoHeader/>);
        const button = getByTestId('logo-header-button');
        fireEvent.click(button);
        expect(window.location.pathname).toBe('/');
    })
   
})