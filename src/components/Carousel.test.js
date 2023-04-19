/* eslint-disable testing-library/render-result-naming-convention */
import   '@testing-library/jest-dom/extend-expect';
import { fireEvent, render,} from '@testing-library/react';
import Carousel from './Carousel';


test('Carousel', () => {

  const component = render(<Carousel />);
  const conComponent= component.container;
  const elementoPadre = conComponent.querySelector('.CarouselItem');
  const button = conComponent.querySelector('.buttonVerMas');
  const buttonRegister = conComponent.querySelector('.buttonRegister');
  const image = conComponent.querySelector('img');
  const input = conComponent.querySelectorAll('input');


// comprobar  que funcionan los elementos del carousel
  expect(elementoPadre).toBeEnabled();
  expect(button).toHaveTextContent('Ver más');
  fireEvent.click(button);

  fireEvent.click(buttonRegister);
  expect(image).toBeEnabled();
  expect(input[0]).toHaveAttribute('placeholder', 'Usuario');
  expect(input[0]).toHaveProperty('type', 'text');
  expect(input[1]).toHaveAttribute('placeholder', 'Email');
  expect(input[1]).toHaveProperty('type', 'email');
  expect(input[2]).toHaveAttribute('placeholder', 'contraseña');
  expect(input[2]).toHaveProperty('type', 'password');
  expect(buttonRegister).toHaveProperty('type', 'submit');
  expect(buttonRegister).toHaveTextContent('Registrarse');
  expect(buttonRegister).toBeEnabled();
} 


);


