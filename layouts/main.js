import Header from '../components/header';

const MainLayout = ({children}) => (
  <>
    <Header />
    {children}
  </>
);

export default MainLayout;
