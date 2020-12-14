import {render} from '@testing-library/react';
// eslint-disable-next-line no-unused-vars
import App from './App';

describe('App Component', () => (
  it('should render the MazeEditor component', () => {
    const component = render(<App />);
    expect(component).toMatchSnapshot();
  })

));
