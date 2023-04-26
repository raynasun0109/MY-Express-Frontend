import ScrollToTop from '../components/ScrollToTop/ScrollToTop.js';
import React from 'react';
import {mount} from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-15';
import { shallow, configure } from 'enzyme';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';

configure({adapter: new Adapter()});
global.scrollTo = jest.fn();
describe('ScrollToTop', () => {
  let wrapper;
//   let history;
  beforeEach(() => {
    wrapper = render(
      <MemoryRouter initialEntries={['/']}>
        <div>
            <ScrollToTop/>
            <p>Hi</p>
        </div>
      </MemoryRouter>
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('renders without crashing', () => {
    })

  it('it renders children', () => {
    expect(screen.getByText(/Hi/i)).toBeInTheDocument();
  });

});
