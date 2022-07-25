import Link from 'next/link';
import { HeaderWrapper, Logo } from './styles';

interface currPage {
  index: number;
}

function Header({ index }: currPage) {
  return (
    <HeaderWrapper idx={index}>
      <Link href="/">
        <Logo
          src={'/logo153.png'}
          width={153}
          height={153}
          alt="palivendas logo"
        />
      </Link>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/produtos">
          <a>Produtos</a>
        </Link>
        <Link href="/contato">
          <a>Contato</a>
        </Link>
      </nav>
    </HeaderWrapper>
  );
}

export default Header;
