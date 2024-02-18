import { FaPlane } from 'react-icons/fa';
import { Button } from '../common/components';

describe('Test button component', () => {
  it('Should display button with functionality', () => {
    cy.mount(<Button label='My Button' icon={<FaPlane />} color='primary' isLoading={false} />);

    cy.get('button').should('exist');
    cy.contains('My Button');
  });
});
