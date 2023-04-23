import   '@testing-library/jest-dom/extend-expect';
import { fireEvent, render,} from '@testing-library/react';
import HomePage from './HomePage';


test('HomePage', () => {


    const component = render(<HomePage />);
    const conComponent= component.container;


});
