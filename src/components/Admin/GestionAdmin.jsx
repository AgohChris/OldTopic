import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Plus, Trash2, Edit, AlertCircle, Check, X, Search, Eye, EyeOff } from 'lucide-react';

const GestionAdmin = () => {
  // Récupération du contexte (mode sombre)
  const { isDarkMode } = useOutletContext() || { isDarkMode: false };
  
  // États
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
  });
  const [formErrors, setFormErrors] = useState({});

  // Données temporaires pour la démo (à remplacer par l'API Django)
  useEffect(() => {
    // Simulation d'un appel API
    setTimeout(() => {
      setAdmins([
        { id: 1, nom: 'Jean Dupont', email: 'jean.dupont@example.com', actif: true, dateCreation: '2023-10-15' },
        { id: 2, nom: 'Marie Lambert', email: 'marie.lambert@example.com', actif: true, dateCreation: '2023-11-20' },
        { id: 3, nom: 'Thomas Martin', email: 'thomas.martin@example.com', actif: false, dateCreation: '2024-01-05' }
      ]);
      setIsLoading(false);
    }, 800);
  }, []);

  // Filtrer les admins selon la recherche
  const filteredAdmins = admins.filter(admin => 
    admin.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Réinitialiser l'erreur pour ce champ
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.nom.trim()) errors.nom = "Le nom est requis";
    if (!formData.email.trim()) {
      errors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Format d'email invalide";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    // Simuler l'ajout (à remplacer par l'API)
    const newAdmin = {
      id: admins.length + 1,
      nom: formData.nom,
      email: formData.email,
      actif: true,
      dateCreation: new Date().toISOString().split('T')[0]
    };
    
    setAdmins([...admins, newAdmin]);
    setShowAddModal(false);
    setFormData({ nom: '', email: '' });
    
    // Notification de succès (à implémenter)
    alert(`Un email avec les identifiants a été envoyé à ${formData.email}`);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    // Simuler la modification (à remplacer par l'API)
    const updatedAdmins = admins.map(admin => 
      admin.id === currentAdmin.id ? 
      { ...admin, nom: formData.nom, email: formData.email } : 
      admin
    );
    
    setAdmins(updatedAdmins);
    setShowEditModal(false);
    setCurrentAdmin(null);
    setFormData({ nom: '', email: '' });
  };

  const handleDeleteConfirm = () => {
    // Simuler la suppression (à remplacer par l'API)
    setAdmins(admins.filter(admin => admin.id !== currentAdmin.id));
    setShowDeleteModal(false);
    setCurrentAdmin(null);
  };

  const handleToggleStatus = (admin) => {
    // Simuler la modification du statut (à remplacer par l'API)
    const updatedAdmins = admins.map(a => 
      a.id === admin.id ? { ...a, actif: !a.actif } : a
    );
    setAdmins(updatedAdmins);
  };

  const openEditModal = (admin) => {
    setCurrentAdmin(admin);
    setFormData({ nom: admin.nom, email: admin.email });
    setFormErrors({});
    setShowEditModal(true);
  };

  const openDeleteModal = (admin) => {
    setCurrentAdmin(admin);
    setShowDeleteModal(true);
  };

  // Classes conditionnelles
  const themeClasses = {
    card: isDarkMode 
      ? 'bg-gray-800 border-gray-700' 
      : 'bg-white border-gray-200',
    header: isDarkMode 
      ? 'bg-gray-900 text-white border-gray-700' 
      : 'bg-gray-100 text-gray-800 border-gray-200',
    button: {
      primary: isDarkMode 
        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
        : 'bg-blue-500 hover:bg-blue-600 text-white',
      danger: isDarkMode 
        ? 'bg-red-600 hover:bg-red-700 text-white' 
        : 'bg-red-500 hover:bg-red-600 text-white',
      success: isDarkMode 
        ? 'bg-green-600 hover:bg-green-700 text-white' 
        : 'bg-green-500 hover:bg-green-600 text-white',
      warning: isDarkMode 
        ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
        : 'bg-yellow-500 hover:bg-yellow-600 text-white',
      secondary: isDarkMode 
        ? 'bg-gray-600 hover:bg-gray-700 text-white' 
        : 'bg-gray-300 hover:bg-gray-400 text-gray-800',
    },
    input: isDarkMode 
      ? 'bg-gray-700 border-gray-600 text-white' 
      : 'bg-white border-gray-300 text-gray-900',
    modal: isDarkMode 
      ? 'bg-gray-800 border-gray-700 text-white' 
      : 'bg-white border-gray-200 text-gray-900',
  };

  // Rendu du Modal Ajout
  const AddModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className={`${themeClasses.modal} p-6 rounded-lg shadow-lg max-w-md w-full`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Ajouter un administrateur</h3>
          <button 
            onClick={() => setShowAddModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleAddSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">
              Nom complet
            </label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleInputChange}
              className={`${themeClasses.input} w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500`}
              placeholder="Nom de l'administrateur"
            />
            {formErrors.nom && (
              <p className="mt-1 text-sm text-red-500">{formErrors.nom}</p>
            )}
          </div>
          
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">
              Adresse email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`${themeClasses.input} w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500`}
              placeholder="email@exemple.com"
            />
            {formErrors.email && (
              <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
            )}
          </div>
          
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className={`${themeClasses.button.secondary} px-4 py-2 rounded-lg`}
            >
              Annuler
            </button>
            <button
              type="submit"
              className={`${themeClasses.button.primary} px-4 py-2 rounded-lg flex items-center`}
            >
              <Plus size={18} className="mr-1" />
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Rendu du Modal Modification
  const EditModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className={`${themeClasses.modal} p-6 rounded-lg shadow-lg max-w-md w-full`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Modifier un administrateur</h3>
          <button 
            onClick={() => setShowEditModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleEditSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">
              Nom complet
            </label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleInputChange}
              className={`${themeClasses.input} w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500`}
            />
            {formErrors.nom && (
              <p className="mt-1 text-sm text-red-500">{formErrors.nom}</p>
            )}
          </div>
          
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">
              Adresse email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`${themeClasses.input} w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500`}
            />
            {formErrors.email && (
              <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
            )}
          </div>
          
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowEditModal(false)}
              className={`${themeClasses.button.secondary} px-4 py-2 rounded-lg`}
            >
              Annuler
            </button>
            <button
              type="submit"
              className={`${themeClasses.button.primary} px-4 py-2 rounded-lg flex items-center`}
            >
              <Check size={18} className="mr-1" />
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Rendu du Modal Suppression
  const DeleteModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className={`${themeClasses.modal} p-6 rounded-lg shadow-lg max-w-md w-full`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Confirmer la suppression</h3>
          <button 
            onClick={() => setShowDeleteModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>
        
        <p className="mb-6">
          Êtes-vous sûr de vouloir supprimer l'administrateur <strong>{currentAdmin?.nom}</strong> ? 
          Cette action est irréversible.
        </p>
        
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setShowDeleteModal(false)}
            className={`${themeClasses.button.secondary} px-4 py-2 rounded-lg`}
          >
            Annuler
          </button>
          <button
            onClick={handleDeleteConfirm}
            className={`${themeClasses.button.danger} px-4 py-2 rounded-lg flex items-center`}
          >
            <Trash2 size={18} className="mr-1" />
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto">
      {/* Titre et bouton d'ajout */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Gestion des administrateurs</h1>
        <button 
          onClick={() => {
            setFormData({ nom: '', email: '' });
            setFormErrors({});
            setShowAddModal(true);
          }}
          className={`${themeClasses.button.primary} px-4 py-2 rounded-lg flex items-center`}
        >
          <Plus size={18} className="mr-2" />
          Ajouter un administrateur
        </button>
      </div>

      {/* Barre de recherche */}
      <div className={`${themeClasses.card} border rounded-lg p-4 mb-6`}>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={18} className="text-gray-500" />
          </div>
          <input 
            type="text" 
            className={`${themeClasses.input} w-full pl-10 pr-4 py-2 rounded-lg`}
            placeholder="Rechercher un administrateur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Tableau des administrateurs */}
      <div className={`${themeClasses.card} border rounded-lg overflow-hidden`}>
        <div className={`${themeClasses.header} px-6 py-4 border-b`}>
          <h2 className="font-semibold">Liste des administrateurs</h2>
        </div>
        
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2">Chargement des données...</p>
          </div>
        ) : (
          <>
            {filteredAdmins.length === 0 ? (
              <div className="p-8 text-center">
                <AlertCircle size={36} className="mx-auto mb-2 text-gray-400" />
                <p>Aucun administrateur trouvé</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Nom</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Statut</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date de création</th>
                      <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredAdmins.map((admin) => (
                      <tr key={admin.id} className={isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap">{admin.nom}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{admin.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            admin.actif 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}>
                            {admin.actif ? 'Actif' : 'Suspendu'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{admin.dateCreation}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleToggleStatus(admin)}
                              className={`${
                                admin.actif ? themeClasses.button.warning : themeClasses.button.success
                              } p-1 rounded-lg tooltip-container`}
                              title={admin.actif ? "Suspendre" : "Activer"}
                            >
                              {admin.actif ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                            <button
                              onClick={() => openEditModal(admin)}
                              className={`${themeClasses.button.secondary} p-1 rounded-lg`}
                              title="Modifier"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => openDeleteModal(admin)}
                              className={`${themeClasses.button.danger} p-1 rounded-lg`}
                              title="Supprimer"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modals */}
      {showAddModal && <AddModal />}
      {showEditModal && <EditModal />}
      {showDeleteModal && <DeleteModal />}
    </div>
  );
};

export default GestionAdmin;