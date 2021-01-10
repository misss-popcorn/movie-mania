export default function Layout({ children }) {
  return (
    <>
      <header>
        <div className="header-items">
          <h3>Cinibuzz</h3>
          <span>
            <div>
              <a>Movies</a>
              <a>TV Shows</a>
              <a>Kids</a>
            </div>
          </span>
        </div>
      </header>
      <div className="container">{children}</div>
    </>
  );
}
