import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, Contact, BlogPost, Project } from '../lib/supabase';

interface AdminContextType {
  // Dashboard data
  dashboardStats: {
    totalContacts: number;
    newContacts: number;
    totalBlogPosts: number;
    totalProjects: number;
    totalViews: number;
    conversionRate: number;
  };
  recentContacts: Contact[];
  
  // Loading states
  loading: {
    dashboard: boolean;
    contacts: boolean;
    blog: boolean;
    projects: boolean;
  };
  
  // Data
  contacts: Contact[];
  blogPosts: BlogPost[];
  projects: Project[];
  
  // Actions
  fetchDashboardData: () => Promise<void>;
  fetchContacts: () => Promise<void>;
  fetchBlogPosts: () => Promise<void>;
  fetchProjects: () => Promise<void>;
  refreshAllData: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [dashboardStats, setDashboardStats] = useState({
    totalContacts: 0,
    newContacts: 0,
    totalBlogPosts: 0,
    totalProjects: 0,
    totalViews: 1250,
    conversionRate: 3.2
  });
  
  const [recentContacts, setRecentContacts] = useState<Contact[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  
  const [loading, setLoading] = useState({
    dashboard: false,
    contacts: false,
    blog: false,
    projects: false
  });

  const fetchDashboardData = async () => {
    if (loading.dashboard) return; // Prevent multiple calls
    
    setLoading(prev => ({ ...prev, dashboard: true }));
    
    try {
      // İletişim formları
      const { data: contactsData, error: contactsError } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (contactsError) throw contactsError;

      // Blog yazıları
      const { data: blogData, error: blogError } = await supabase
        .from('blog_posts')
        .select('*');

      if (blogError) throw blogError;

      // Projeler
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('*');

      if (projectsError) throw projectsError;

      // İstatistikleri hesapla
      const newContacts = contactsData?.filter(c => c.status === 'new').length || 0;
      
      setDashboardStats({
        totalContacts: contactsData?.length || 0,
        newContacts,
        totalBlogPosts: blogData?.length || 0,
        totalProjects: projectsData?.length || 0,
        totalViews: 1250,
        conversionRate: 3.2
      });

      setRecentContacts(contactsData?.slice(0, 5) || []);
      setContacts(contactsData || []);
      setBlogPosts(blogData || []);
      setProjects(projectsData || []);
      
    } catch (error) {
      console.error('Dashboard verisi yüklenirken hata:', error);
    } finally {
      setLoading(prev => ({ ...prev, dashboard: false }));
    }
  };

  const fetchContacts = async () => {
    if (loading.contacts) return;
    
    setLoading(prev => ({ ...prev, contacts: true }));
    
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContacts(data || []);
    } catch (error) {
      console.error('İletişim verileri yüklenirken hata:', error);
    } finally {
      setLoading(prev => ({ ...prev, contacts: false }));
    }
  };

  const fetchBlogPosts = async () => {
    if (loading.blog) return;
    
    setLoading(prev => ({ ...prev, blog: true }));
    
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogPosts(data || []);
    } catch (error) {
      console.error('Blog verileri yüklenirken hata:', error);
    } finally {
      setLoading(prev => ({ ...prev, blog: false }));
    }
  };

  const fetchProjects = async () => {
    if (loading.projects) return;
    
    setLoading(prev => ({ ...prev, projects: true }));
    
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Proje verileri yüklenirken hata:', error);
    } finally {
      setLoading(prev => ({ ...prev, projects: false }));
    }
  };

  const refreshAllData = async () => {
    await Promise.all([
      fetchDashboardData(),
      fetchContacts(),
      fetchBlogPosts(),
      fetchProjects()
    ]);
  };

  // Initial data load
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const value: AdminContextType = {
    dashboardStats,
    recentContacts,
    loading,
    contacts,
    blogPosts,
    projects,
    fetchDashboardData,
    fetchContacts,
    fetchBlogPosts,
    fetchProjects,
    refreshAllData
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}; 