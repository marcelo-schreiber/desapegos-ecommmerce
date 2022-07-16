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
          alt="palishop vendas logo"
        />
      </Link>
      <nav>
        <Link href="/">
          <h2>Home</h2>
        </Link>
        <Link href="/produtos">
          <h2>Produtos</h2>
        </Link>
        <Link href="/contato">
          <h2>Contato</h2>
        </Link>
      </nav>
    </HeaderWrapper>
  );
}

export default Header;
