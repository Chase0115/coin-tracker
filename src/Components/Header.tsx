import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { isDarkAtom } from '../atoms';

const HeaderTag = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid ${(props) => props.theme.accentColor}
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 3rem;
`;

const Button = styled.button`
  border: 0;
  background-color: transparent;
  font-size: 2rem;
  cursor: pointer;
`

const Header = () => {
  const [darkAtom, setDarkAtom] = useRecoilState(isDarkAtom);
  const toggleDarkMode = () => setDarkAtom((prev) => !prev);
  return (
    <HeaderTag>
      <Title>Coin Tracker</Title>
      <Button onClick={toggleDarkMode}>{darkAtom ? "🌙" : "☀️"}</Button>
    </HeaderTag>
  );
};

export default Header;
