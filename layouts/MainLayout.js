import Header from '../components/Header';

const MainLayout = ({children}) => (
  <>
    <Header />
    {children}
  </>
);

export default MainLayout;
