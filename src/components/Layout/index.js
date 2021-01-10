import Header from "./Header";
import Wrapper from "./Wrapper";

export default function Layout({ children }) {
  return (
    <>
      <Header></Header>
      <Wrapper>{children}</Wrapper>
    </>
  );
}
