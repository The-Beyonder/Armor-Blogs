import './App.scss';
import { Articles, Home, About, Contact, Search } from './pages';
import { Navbar, Footer, ScrollToTop } from '../src/components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SearchProvider } from "../src/context/Search";


function App() {
  return (
    <div  className='App'> 
    <Router>
      <SearchProvider>
      <Navbar />
      <Search title={'Search Results:'}/>
      <ScrollToTop>
      <Routes>
        <Route path='/blog/:slug' element={<Articles/>} />    
        <Route exact path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        {/* <Route path='/categories' element={<Categories/>} />     */}
        <Route path='/contact' element={<Contact/>} />    
      </Routes>
      </ScrollToTop>
      <Footer />
     </SearchProvider>
    </Router>
    </div>

  );
}

export default App;
