import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, Edit, Trash2, Eye, Save, X, FolderOpen } from 'lucide-react';
import AdminLayout from '../components/admin/AdminLayout';
import { clearSettingsCache } from '../services/siteSettingsService';
import { useSite } from '../context/SiteContext';

interface Project {
  id?: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  client: string;
  completion_date: string;
  technologies: string;
  project_url?: string;
  github_url?: string;
  is_featured: boolean;
  created_at?: string;
  updated_at?: string;
}

const AdminProjects: React.FC = () => {
  const { refreshSettings } = useSite();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Project>({
    title: '',
    description: '',
    image_url: '',
    category: '',
    client: '',
    completion_date: '',
    technologies: '',
    project_url: '',
    github_url: '',
    is_featured: false
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('❌ AdminProjects: Projeler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      let result;
      
      if (editingProject?.id) {
        // Güncelleme
        result = await supabase
          .from('projects')
          .update(formData)
          .eq('id', editingProject.id);
      } else {
        // Yeni proje
        result = await supabase
          .from('projects')
          .insert([formData]);
      }

      if (result.error) throw result.error;

      setMessage(editingProject ? 'Proje başarıyla güncellendi!' : 'Proje başarıyla eklendi!');
      
      // Cache'i temizle ve SiteContext'i yenile
      clearSettingsCache();
      await refreshSettings();
      
      // Form'u sıfırla
      resetForm();
      
      // Projeleri yeniden yükle
      await fetchProjects();
      
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('❌ AdminProjects: Proje kaydedilirken hata:', error);
      setMessage('Proje kaydedilirken bir hata oluştu.');
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData(project);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu projeyi silmek istediğinizden emin misiniz?')) return;

    try {
      const { data, error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)
        .select();

      if (error) {
        console.error('❌ AdminProjects: Silme hatası:', error);
        throw error;
      }
      setMessage('Proje başarıyla silindi!');
      
      // Cache'i temizle ve SiteContext'i yenile
      clearSettingsCache();
      await refreshSettings();
      
      // Projeleri yeniden yükle
      await fetchProjects();
      
      setTimeout(() => setMessage(''), 3000);
    } catch (error: any) {
      console.error('❌ AdminProjects: Proje silinirken hata:', error);
      setMessage(`Proje silinirken bir hata oluştu: ${error.message || 'Bilinmeyen hata'}`);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image_url: '',
      category: '',
      client: '',
      completion_date: '',
      technologies: '',
      project_url: '',
      github_url: '',
      is_featured: false
    });
    setEditingProject(null);
    setShowForm(false);
  };

  const handleChange = (field: keyof Project, value: string | boolean | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Proje Yönetimi</h1>
            <p className="text-gray-600">Portföy projelerini yönetin ve düzenleyin</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Yeni Proje
          </button>
        </div>

        {/* Message */}
        {message && (
          <div className={`p-4 rounded-lg ${
            message.includes('başarıyla') 
              ? 'bg-green-50 border border-green-200 text-green-700' 
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            {message}
          </div>
        )}

        {/* Projects Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <FolderOpen className="w-5 h-5 mr-2" />
              Projeler ({projects.length})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Proje
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kategori
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Müşteri
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tarih
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Öne Çıkan
                  </th>
                  
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img 
                            className="h-10 w-10 rounded-lg object-cover" 
                            src={project.image_url} 
                            alt={project.title}
                            onError={(e) => {
                              e.currentTarget.src = 'https://via.placeholder.com/40x40?text=P';
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {project.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {project.description.substring(0, 50)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {project.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {project.client}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(project.completion_date).toLocaleDateString('tr-TR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        project.is_featured 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {project.is_featured ? 'Evet' : 'Hayır'}
                      </span>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(project)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="Düzenle"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(project.id!)}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Sil"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Project Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {editingProject ? 'Proje Düzenle' : 'Yeni Proje Ekle'}
                  </h3>
                  <button
                    onClick={resetForm}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Proje Adı *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleChange('title', e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Kategori *
                    </label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => handleChange('category', e.target.value)}
                      required
                      placeholder="Web Tasarım, Mobil Uygulama, vb."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Müşteri *
                    </label>
                    <input
                      type="text"
                      value={formData.client}
                      onChange={(e) => handleChange('client', e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tamamlanma Tarihi *
                    </label>
                    <input
                      type="date"
                      value={formData.completion_date}
                      onChange={(e) => handleChange('completion_date', e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Teknolojiler *
                    </label>
                    <input
                      type="text"
                      value={formData.technologies}
                      onChange={(e) => handleChange('technologies', e.target.value)}
                      required
                      placeholder="React, Node.js, PostgreSQL, vb."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  

                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Proje URL
                    </label>
                    <input
                      type="url"
                      value={formData.project_url}
                      onChange={(e) => handleChange('project_url', e.target.value)}
                      placeholder="https://example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      value={formData.github_url}
                      onChange={(e) => handleChange('github_url', e.target.value)}
                      placeholder="https://github.com/username/project"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Görsel URL *
                    </label>
                    <input
                      type="url"
                      value={formData.image_url}
                      onChange={(e) => handleChange('image_url', e.target.value)}
                      required
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Açıklama *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_featured"
                    checked={formData.is_featured}
                    onChange={(e) => handleChange('is_featured', e.target.checked)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="is_featured" className="ml-2 block text-sm text-gray-900">
                    Öne çıkan proje olarak göster
                  </label>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {editingProject ? 'Güncelle' : 'Ekle'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminProjects; 