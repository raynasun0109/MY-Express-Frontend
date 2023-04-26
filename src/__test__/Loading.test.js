import { render, fireEvent,waitFor, screen ,getByLabelText,toHaveTextContent,getByText,queryByLabelText} from '@testing-library/react';
import axios from '../../node_modules/axios';
import Loading from '../components/Loading/Loading.js';
import {cleanup} from '@testing-library/react';

const loading ={
    title:"testing title",
    content:"testing content",
    isLoading:true,
    isSetIcon:'error'
}

test("Render Loading Component", async () => {
 
    render(<Loading title={loading.title} content={loading.content} isLoading={loading.isLoading} isSetIcon={loading.isSetIcon}/>)
    const LoadingComponent = screen.getByTestId("loading");
    expect(LoadingComponent).toHaveTextContent(loading.title)
    expect(LoadingComponent).toHaveTextContent(loading.content)
});


it('Loading renders the close button', () => {
    const {queryByLabelText, getByLabelText} = render(
        <Loading title={loading.title} content={loading.content} isLoading={loading.isLoading} isSetIcon={loading.isSetIcon}/>,
      );
      
      expect(queryByLabelText(/close/i)).toBeTruthy();
    
      fireEvent.click(getByLabelText(/close/i));
})