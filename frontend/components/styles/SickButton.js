import styled from 'styled-components';

const SickButton = styled.button`
  background: red;
  color: white;
  font-weight: 500;
  border: 0;
  border-radius: 0;
  text-transform: uppercase;
  font-size: 2rem;
  padding: 0.8rem 1.5rem;
  transform: skew(-2deg);
  cursor: pointer;
  display: inline-block;
  transition: all 0.5s;
  :hover {
    transform: translate(2px, 0px);
  }
  &[disabled] {
    opacity: 0.5;
  }
`;

export default SickButton;
