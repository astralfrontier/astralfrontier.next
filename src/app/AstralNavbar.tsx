import Link from "next/link";

export default function AstralNavbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            <strong>Astral Frontier</strong>
          </Link>
        </li>
        <li>
          <details className="dropdown">
            <summary>Menu</summary>
            <ul>
              <li>
                <a href="#">Link 1</a>
              </li>
              <li>
                <a href="#">Link 2</a>
              </li>
              <li>
                <a href="#">Link 3</a>
              </li>
            </ul>
          </details>
        </li>
      </ul>
      <ul>
        <li>
          <a href="#" role="button" className="outline secondary">
            Link 1
          </a>
        </li>
        <li>
          <a href="#" role="button" className="outline secondary">
            Link 2
          </a>
        </li>
        <li>
          <a href="#" role="button" className="outline secondary">
            Link 3
          </a>
        </li>
      </ul>
    </nav>
  );
}
