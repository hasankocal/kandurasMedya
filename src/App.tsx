import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Admin from './pages/Admin';
import AdminContacts from './pages/AdminContacts';
import AdminLogin from './pages/AdminLogin';
import AdminBlog from './pages/AdminBlog';
import AdminProjects from './pages/AdminProjects';
import AdminSettings from './pages/AdminSettings';
import ScrollToTopButton from './components/ui/ScrollToTopButton';
import { AdminProvider } from './context/AdminContext';
import { SiteProvider } from './context/SiteContext';

function ScrollToTop() {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <SiteProvider>
        <ScrollToTop />
        <Routes>
          {/* Admin routes - Layout olmadan */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <AdminProvider>
              <Admin key="admin-dashboard" />
            </AdminProvider>
          } />
          <Route path="/admin/contacts" element={
            <AdminProvider>
              <AdminContacts key="admin-contacts" />
            </AdminProvider>
          } />
          <Route path="/admin/blog" element={
            <AdminProvider>
              <AdminBlog key="admin-blog" />
            </AdminProvider>
          } />
          <Route path="/admin/projects" element={
            <AdminProvider>
              <AdminProjects key="admin-projects" />
            </AdminProvider>
          } />
          <Route path="/admin/settings" element={
            <AdminProvider>
              <AdminSettings key="admin-settings" />
            </AdminProvider>
          } />
          
                    {/* Normal routes - Layout ile */}
          <Route path="/" element={
            <Layout>
              <Home />
              <ScrollToTopButton />
            </Layout>
          } />
          <Route path="/about" element={
            <Layout>
              <About />
              <ScrollToTopButton />
            </Layout>
          } />
          <Route path="/services" element={
            <Layout>
              <Services />
              <ScrollToTopButton />
            </Layout>
          } />
          <Route path="/portfolio" element={
            <Layout>
              <Portfolio />
              <ScrollToTopButton />
            </Layout>
          } />
          <Route path="/blog" element={
            <Layout>
              <Blog />
              <ScrollToTopButton />
            </Layout>
          } />
          <Route path="/blog/:id" element={
            <Layout>
              <BlogDetail />
              <ScrollToTopButton />
            </Layout>
          } />
          <Route path="/contact" element={
            <Layout>
              <Contact />
              <ScrollToTopButton />
            </Layout>
          } />
          <Route path="*" element={
            <Layout>
              <NotFound />
              <ScrollToTopButton />
            </Layout>
          } />
        </Routes>
      </SiteProvider>
    </Router>
  );
}

export default App;
