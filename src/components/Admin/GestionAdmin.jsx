// src/components/Admin/GestionAdmin.jsx
import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  FaPlus, FaEdit, FaTrashAlt, FaBan, 
  FaCheckCircle, FaInfoCircle, FaUserShield
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { PuffLoader } from 'react-spinners';

const Modal = ({ title, children, onClose, isDarkMode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
  >
    <div className={`relative rounded-xl shadow-2xl max-w-lg w-full mx-4 border ${
      isDarkMode 
        ? ' text-white' 
        : 'bg-white border-gray-200 text-gray-900'
    }`}>
      <div className="p-6 border-b border-gray-600 flex justify-between items-center">
        <h3 className="text-xl font-bold">{title}</h3>
        <button
          onClick={onClose}
          className="text-2xl hover:text-gray-400"
          aria-label="Fermer"
        >
          &times;
        </button>
      </div>
      <div className="p-6">{children}</div>
    </div>
  </motion.div>
);

const AdminForm = ({ admin, onSubmit, onCancel, isDarkMode, isEditing }) => {
  const [formData, setFormData] = useState(admin || { name: '', email: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Le nom est requis';
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Nom complet
        </label>
        <div className="mt-1 relative">
          <input
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`w-full px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-offset-2 ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-600 focus:ring-blue-500 text-white' 
                : 'border-gray-300 focus:ring-indigo-500 text-gray-900'
            } ${errors.name ? 'border-red-500' : ''}`}
            placeholder="Jean Dupont"
          />
          {errors.name && (
            <p className="absolute text-xs text-red-500 mt-1">{errors.name}</p>
          )}
        </div>
      </div>

      <div>
        <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Adresse email
        </label>
        <div className="mt-1 relative">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`w-full px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-offset-2 ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-600 focus:ring-blue-500 text-white' 
                : 'border-gray-300 focus:ring-indigo-500 text-gray-900'
            } ${errors.email ? 'border-red-500' : ''}`}
            placeholder="jean.dupont@example.com"
          />
          {errors.email && (
            <p className="absolute text-xs text-red-500 mt-1">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className={`px-5 py-2.5 rounded-lg font-medium transition-colors ${
            isDarkMode 
              ? 'text-gray-300 hover:bg-gray-700/50' 
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          Annuler
        </button>
        <button
          type="submit"
          className={`px-5 py-2.5 rounded-lg font-medium text-white transition-colors ${
            isDarkMode 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {isEditing ? 'Sauvegarder' : 'Ajouter'}
        </button>
      </div>
    </form>
  );
};

function GestionAdmin() {
  const { isDarkMode } = useOutletContext();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalState, setModalState] = useState({ 
    type: null, 
    data: null 
  });

  useEffect(() => {
    setTimeout(() => {
      setAdmins([
        { id: 1, name: 'Admin One', email: 'admin1@example.com', status: 'active' },
        { id: 2, name: 'Admin Two', email: 'admin2@example.com', status: 'suspended' },
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  const handleAdminAction = (action, admin = null) => {
    setModalState({ type: action, data: admin });
  };

  const handleCloseModal = () => {
    setModalState({ type: null, data: null });
  };

  const handleSaveAdmin = (adminData) => {
    if (modalState.type === 'add') {
      setAdmins(prev => [...prev, { ...adminData, id: Date.now(), status: 'active' }]);
    } else {
      setAdmins(prev => prev.map(a => a.id === adminData.id ? adminData : a));
    }
    handleCloseModal();
  };

  const handleDelete = () => {
    setAdmins(prev => prev.filter(a => a.id !== modalState.data?.id));
    handleCloseModal();
  };

  const toggleStatus = (admin) => {
    setAdmins(prev => prev.map(a => 
      a.id === admin.id 
        ? { ...a, status: a.status === 'active' ? 'suspended' : 'active' } 
        : a
    ));
  };

  return (
    <div className={`p-6 min-h-screen border-gray-600 ${
      isDarkMode 
        ? 'text-gray-200 border-none' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3 mb-4 sm:mb-0">
            <FaUserShield className={isDarkMode ? 'text-blue-400' : 'text-indigo-600'} />
            <span>Gestion des Administrateurs</span>
          </h1>
          <button
            onClick={() => handleAdminAction('add')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-transform hover:scale-105 ${
              isDarkMode 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            <FaPlus /> Nouvel Admin
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center mt-12">
            <PuffLoader 
              color={isDarkMode ? "#fff" : "#4F46E5"}
              size={50}
              loading={true}
              aria-label="Chargement en cours"
            />
          </div>
        ) : admins.length === 0 ? (
          <div className={`text-center p-12 rounded-xl border ${
            isDarkMode 
              ? 'bg-gray-800/50 border-gray-600 text-gray-400' 
              : 'bg-white border-gray-200 text-gray-500'
          }`}>
            <FaInfoCircle className="mx-auto text-4xl mb-4" />
            <p className="text-xl">Aucun administrateur trouvé</p>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl shadow-lg overflow-hidden border ${
              isDarkMode 
                ? 'bg-gradient-to-br from-black to-gray-900 border-gray-600' 
                : 'bg-white border-gray-200'
            }`}
          >
            <table className="w-full">
              <thead className={isDarkMode ? 'bg-gray-900/50' : 'bg-gray-50'}>
                <tr>
                  {['Nom', 'Email', 'Statut', 'Actions'].map((header) => (
                    <th
                      key={header}
                      className={`px-6 py-4 text-left text-sm font-semibold border-b ${
                        isDarkMode 
                          ? 'border-gray-600 text-gray-300' 
                          : 'border-gray-200 text-gray-700'
                      }`}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr
                    key={admin.id}
                    className={`group ${
                      isDarkMode 
                        ? 'hover:bg-gray-800/30 border-t border-gray-600' 
                        : 'hover:bg-gray-50 border-t border-gray-200'
                    }`}
                  >
                    <td className="px-6 py-4 font-medium">{admin.name}</td>
                    <td className={`px-6 py-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {admin.email}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                        admin.status === 'active'
                          ? isDarkMode
                            ? 'bg-green-800/30 text-green-400'
                            : 'bg-green-100 text-green-800'
                          : isDarkMode
                            ? 'bg-red-800/30 text-red-400'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {admin.status === 'active' ? 'Actif' : 'Suspendu'}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex items-center gap-3">
                      <button
                        onClick={() => handleAdminAction('edit', admin)}
                        className={`p-2 rounded-lg hover:bg-opacity-20 ${
                          isDarkMode 
                            ? 'text-blue-400 hover:bg-blue-400' 
                            : 'text-indigo-600 hover:bg-indigo-100'
                        }`}
                        title="Modifier"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => toggleStatus(admin)}
                        className={`p-2 rounded-lg hover:bg-opacity-20 ${
                          admin.status === 'active'
                            ? isDarkMode
                              ? 'text-yellow-400 hover:bg-yellow-400'
                              : 'text-yellow-600 hover:bg-yellow-100'
                            : isDarkMode
                              ? 'text-green-400 hover:bg-green-400'
                              : 'text-green-600 hover:bg-green-100'
                        }`}
                        title={admin.status === 'active' ? 'Suspendre' : 'Activer'}
                      >
                        {admin.status === 'active' ? <FaBan /> : <FaCheckCircle />}
                      </button>
                      <button
                        onClick={() => handleAdminAction('delete', admin)}
                        className={`p-2 rounded-lg hover:bg-opacity-20 ${
                          isDarkMode 
                            ? 'text-red-400 hover:bg-red-400' 
                            : 'text-red-600 hover:bg-red-100'
                        }`}
                        title="Supprimer"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {modalState.type === 'add' || modalState.type === 'edit' ? (
          <Modal
            title={modalState.type === 'add' ? 'Nouvel Administrateur' : 'Modifier Administrateur'}
            onClose={handleCloseModal}
            isDarkMode={isDarkMode}
          >
            <AdminForm
              admin={modalState.data}
              onSubmit={handleSaveAdmin}
              onCancel={handleCloseModal}
              isDarkMode={isDarkMode}
              isEditing={modalState.type === 'edit'}
            />
          </Modal>
        ) : null}

        {modalState.type === 'delete' && (
          <Modal title="Confirmer la suppression" onClose={handleCloseModal} isDarkMode={isDarkMode}>
            <div className="space-y-6">
              <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Êtes-vous sûr de vouloir supprimer définitivement l'administrateur{" "}
                <span className="font-semibold">{modalState.data?.name}</span> ?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleCloseModal}
                  className={`px-5 py-2.5 rounded-lg font-medium ${
                    isDarkMode 
                      ? 'text-gray-300 hover:bg-gray-700/50' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Annuler
                </button>
                <button
                  onClick={handleDelete}
                  className={`px-5 py-2.5 rounded-lg font-medium text-white ${
                    isDarkMode 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'bg-red-500 hover:bg-red-600'
                  }`}
                >
                  Supprimer
                </button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

export default GestionAdmin;