// eslint-disable-next-line
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import LandingPage from './pages/LandingPage';
import Navbar from './components/Nav/Nav';
import Articles from './pages/Articles';
import { ProtectedRoute } from './routes/ProtectedRoute';
import ArticlesPlan from './pages/ArticlesPlan';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/articles" element={<ProtectedRoute />}>
          <Route path="/articles" element={<Articles />} />
        </Route>
        <Route path="/article-plans" element={<ProtectedRoute />}>
          <Route path="/article-plans" element={<ArticlesPlan />} />
        </Route>
      </Routes>
      {/* <Hero /> */}
    </BrowserRouter>
  );
}

export default App;
