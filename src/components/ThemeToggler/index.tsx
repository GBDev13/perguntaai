import { HiSun } from 'react-icons/hi';
import { BsMoon } from 'react-icons/bs';
import { Container } from './styles';
import { useTheme } from '../../hooks/useTheme';

function ThemeToggle() {
  const { currentTheme, setCurrentTheme } = useTheme();

  function toggleTheme() {
    setCurrentTheme(currentTheme === 'dark' ? 'light' : 'dark');
    localStorage.setItem('@perguntaai-theme', currentTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Container onClick={toggleTheme}>
      {currentTheme === 'light' ? <HiSun /> : <BsMoon />}
    </Container>
  );
}

export default ThemeToggle;