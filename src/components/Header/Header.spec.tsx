import React from 'react';
import renderer from 'react-test-renderer';
import Header from './Header';
import enzyme from 'enzyme';

it('renders correctly', () => {


    const component = renderer.create(<Header changeCity={() => {}} city={""} getForecast={() => {}} setError={() => {}} setErrorBoundaryKey={() => {}}/>).toJSON();
    expect(component).toMatchSnapshot();
});

it('Should  call on form submit the following functions getForecast, setError and setErrorBoundary', () => {
    const spyGetForecast = jest.fn();
    const spySetError = jest.fn();
    const spySetErrorBoundary = jest.fn();
    const component = enzyme.shallow(<Header changeCity={() => {}} city={""} getForecast={spyGetForecast} setError={spySetError} setErrorBoundaryKey={spySetErrorBoundary}/>);
    component.find('form').at(0).simulate('submit', {
        preventDefault: () => {
        },
        // below I am trying to set the value of the name field
        target: [
          {
            value: '',
          }
        ],
      });

    expect(spyGetForecast).toHaveBeenCalled();
    expect(spySetErrorBoundary).toHaveBeenCalled();
    expect(spySetError).toHaveBeenCalled();
})