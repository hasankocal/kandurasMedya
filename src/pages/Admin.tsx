import React from 'react';
import { BarChart3, Users, FileText, FolderOpen, Mail, TrendingUp } from 'lucide-react';
import AdminLayout from '../components/admin/AdminLayout';
import { useAdmin } from '../context/AdminContext';

const Admin: React.FC = () => {
  const { dashboardStats, recentContacts, loading } = useAdmin();

  const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; color: string }> = ({ 
    title, value, icon, color 
  }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );

  if (loading.dashboard) {
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Kanduras Medya yönetim paneli</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <StatCard
            title="Toplam İletişim"
            value={dashboardStats.totalContacts}
            icon={<Mail className="w-6 h-6 text-white" />}
            color="bg-blue-500"
          />
          <StatCard
            title="Yeni Mesajlar"
            value={dashboardStats.newContacts}
            icon={<Users className="w-6 h-6 text-white" />}
            color="bg-green-500"
          />
          <StatCard
            title="Blog Yazıları"
            value={dashboardStats.totalBlogPosts}
            icon={<FileText className="w-6 h-6 text-white" />}
            color="bg-purple-500"
          />
          <StatCard
            title="Projeler"
            value={dashboardStats.totalProjects}
            icon={<FolderOpen className="w-6 h-6 text-white" />}
            color="bg-orange-500"
          />
          <StatCard
            title="Sayfa Görüntüleme"
            value={dashboardStats.totalViews.toLocaleString()}
            icon={<BarChart3 className="w-6 h-6 text-white" />}
            color="bg-indigo-500"
          />
          <StatCard
            title="Dönüşüm Oranı"
            value={`${dashboardStats.conversionRate}%`}
            icon={<TrendingUp className="w-6 h-6 text-white" />}
            color="bg-red-500"
          />
        </div>

        {/* Recent Contacts */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Son İletişim Mesajları</h2>
            <a
              href="/admin/contacts"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Tümünü Gör →
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İsim
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    E-posta
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Konu
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durum
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tarih
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {contact.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {contact.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {contact.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        contact.status === 'new' ? 'bg-green-100 text-green-800' :
                        contact.status === 'read' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {contact.status === 'new' ? 'Yeni' :
                         contact.status === 'read' ? 'Okundu' : 'Yanıtlandı'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(contact.created_at).toLocaleDateString('tr-TR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Admin; 