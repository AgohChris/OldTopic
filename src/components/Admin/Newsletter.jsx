import React, { useState, useEffect } from 'react';
import { Mail, Search, Edit, Trash2, Send, Filter, Info, CheckCircle, XCircle } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';

const Newsletter = () => {
  // Retrieve isDarkMode from the Outlet context
  const { isDarkMode } = useOutletContext();

  // États pour stocker les abonnés et contrôler l'interface
  const [subscribers, setSubscribers] = useState([]);
  const [filteredSubscribers, setFilteredSubscribers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubscribers, setSelectedSubscribers] = useState([]);
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [newsletterContent, setNewsletterContent] = useState({
    subject: '',
    content: ''
  });
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [subscribersPerPage] = useState(10);
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // État pour gérer le chargement

  // State for Edit Modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingSubscriber, setEditingSubscriber] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', email: '', status: '' });


  // Charger les données factices au chargement du composant
  useEffect(() => {
    // Simulation d'un appel API avec un délai pour montrer le chargement
    const fetchData = async () => {
      setIsLoading(true);

      // Simuler un délai de chargement des données
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockSubscribers = [
        { id: 1, email: 'johndoe@example.com', name: 'John Doe', subscribed_date: '2025-04-15', status: 'active', opens: 12, clicks: 5 },
        { id: 2, email: 'alice@example.com', name: 'Alice Smith', subscribed_date: '2025-04-10', status: 'active', opens: 8, clicks: 3 },
        { id: 3, email: 'robert@example.com', name: 'Robert Johnson', subscribed_date: '2025-04-05', status: 'inactive', opens: 0, clicks: 0 },
        { id: 4, email: 'maria@example.com', name: 'Maria Garcia', subscribed_date: '2025-04-02', status: 'active', opens: 15, clicks: 7 },
        { id: 5, email: 'david@example.com', name: 'David Brown', subscribed_date: '2025-03-28', status: 'active', opens: 6, clicks: 2 },
        { id: 6, email: 'sophie@example.com', name: 'Sophie Wilson', subscribed_date: '2025-03-25', status: 'inactive', opens: 1, clicks: 0 },
        { id: 7, email: 'michael@example.com', name: 'Michael Chen', subscribed_date: '2025-03-20', status: 'active', opens: 10, clicks: 4 },
        { id: 8, email: 'emma@example.com', name: 'Emma Taylor', subscribed_date: '2025-03-18', status: 'active', opens: 7, clicks: 3 },
        { id: 9, email: 'james@example.com', name: 'James Lee', subscribed_date: '2025-03-15', status: 'active', opens: 9, clicks: 5 },
        { id: 10, email: 'olivia@example.com', name: 'Olivia Moore', subscribed_date: '2025-03-10', status: 'inactive', opens: 2, clicks: 0 },
        { id: 11, email: 'william@example.com', name: 'William Davis', subscribed_date: '2025-03-08', status: 'active', opens: 11, clicks: 6 },
        { id: 12, email: 'natalie@example.com', name: 'Natalie Wright', subscribed_date: '2025-03-05', status: 'active', opens: 5, clicks: 2 },
        { id: 13, email: 'thomas@example.com', name: 'Thomas Martin', subscribed_date: '2025-03-01', status: 'inactive', opens: 0, clicks: 0 },
        { id: 14, email: 'sarah@example.com', name: 'Sarah Johnson', subscribed_date: '2025-02-25', status: 'active', opens: 8, clicks: 4 },
        { id: 15, email: 'daniel@example.com', name: 'Daniel White', subscribed_date: '2025-02-20', status: 'active', opens: 14, clicks: 9 }
      ];

      setSubscribers(mockSubscribers);
      setFilteredSubscribers(mockSubscribers);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  // Filtrer les abonnés selon le terme de recherche et le statut
  useEffect(() => {
    let results = subscribers;

    // Filtrer par statut
    if (filterStatus !== 'all') {
      results = results.filter(subscriber => subscriber.status === filterStatus);
    }

    // Filtrer par terme de recherche
    if (searchTerm) {
      results = results.filter(subscriber =>
        subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subscriber.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredSubscribers(results);
    setCurrentPage(1); // Réinitialiser à la première page lors d'un nouveau filtrage
  }, [searchTerm, subscribers, filterStatus]);

  // Logique de pagination
  const indexOfLastSubscriber = currentPage * subscribersPerPage;
  const indexOfFirstSubscriber = indexOfLastSubscriber - subscribersPerPage;
  const currentSubscribers = filteredSubscribers.slice(indexOfFirstSubscriber, indexOfLastSubscriber);
  const totalPages = Math.ceil(filteredSubscribers.length / subscribersPerPage);

  // Gestion des notifications
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Fonction pour gérer la sélection/désélection de tous les abonnés
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedSubscribers(currentSubscribers.map(subscriber => subscriber.id));
    } else {
      setSelectedSubscribers([]);
    }
  };

  // Fonction pour gérer la sélection/désélection d'un abonné
  const handleSelectSubscriber = (id) => {
    if (selectedSubscribers.includes(id)) {
      setSelectedSubscribers(selectedSubscribers.filter(sid => sid !== id));
    } else {
      setSelectedSubscribers([...selectedSubscribers, id]);
    }
  };

  // Fonction pour envoyer une newsletter (simulation)
  const handleSendNewsletter = () => {
    // Simulation d'envoi de newsletter
    if (newsletterContent.subject && newsletterContent.content) {
      showNotification(`Newsletter envoyée à ${selectedSubscribers.length} abonnés avec succès!`);
      setShowComposeModal(false);
      setNewsletterContent({ subject: '', content: '' });
      setSelectedSubscribers([]);
    } else {
      showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
    }
  };

  // Fonction pour supprimer les abonnés sélectionnés
  const handleDeleteSelected = () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${selectedSubscribers.length} abonné(s)?`)) {
      // Filtrer les abonnés pour retirer ceux qui sont sélectionnés
      const updatedSubscribers = subscribers.filter(
        subscriber => !selectedSubscribers.includes(subscriber.id)
      );
      setSubscribers(updatedSubscribers);
      setSelectedSubscribers([]);
      showNotification(`${selectedSubscribers.length} abonné(s) supprimé(s) avec succès.`);
    }
  };

  // --- Modifier l'abonné ---

  // Ouvre le modal de modification avec les données de l'abonné
  const openEditModal = (subscriber) => {
    setEditingSubscriber(subscriber);
    setEditFormData({ name: subscriber.name, email: subscriber.email, status: subscriber.status });
    setShowEditModal(true);
  };

  // Gère les changements dans le formulaire de modification
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  // Gère la sauvegarde des modifications
  const handleUpdateSubscriber = () => {
    if (!editFormData.name || !editFormData.email || !editFormData.status) {
      showNotification('Veuillez remplir tous les champs du formulaire de modification.', 'error');
      return;
    }

    // Mettre à jour la liste des abonnés avec les nouvelles données
    const updatedSubscribers = subscribers.map(sub =>
      sub.id === editingSubscriber.id ? { ...sub, ...editFormData } : sub
    );
    setSubscribers(updatedSubscribers);

    showNotification(`Abonné ${editFormData.name} mis à jour avec succès!`);
    setShowEditModal(false);
    setEditingSubscriber(null);
    setEditFormData({ name: '', email: '', status: '' });
  };

  // Ferme le modal de modification
  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingSubscriber(null);
    setEditFormData({ name: '', email: '', status: '' });
  };


  // Définir la hauteur minimale pour le conteneur du tableau
  const tableMinHeight = '400px'; // Hauteur fixe pour le tableau

  return (
    // Apply base background and text color based on isDarkMode
    <div className={`p-6 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-black' : 'bg-gray-50 text-gray-800'}`}>
      {/* En-tête de la page */}
      <div className="mb-8">
        <h1 className={`text-3xl font-bold flex items-center gap-3 mb-2 ${isDarkMode ? 'text-gray-50' : 'text-gray-800'}`}>
          <Mail className="text-green-500" />
          Gestion de Newsletter
        </h1>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Gérez vos abonnés et envoyez des newsletters
        </p>
      </div>

      {/* Notifications */}
      {notification && (
        <div
          className={`mb-4 p-4 rounded-lg flex items-center justify-between ${
            notification.type === 'error'
              ? 'bg-red-100 text-red-700 border-l-4 border-red-500'
              : 'bg-green-100 text-green-700 border-l-4 border-green-500'
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === 'error' ? <XCircle size={20} /> : <CheckCircle size={20} />}
            <span>{notification.message}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-gray-500 hover:text-gray-700">
            <XCircle size={16} />
          </button>
        </div>
      )}

      {/* Barre d'actions */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowComposeModal(true)}
            disabled={selectedSubscribers.length === 0}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              selectedSubscribers.length === 0
                ? 'bg-gradient-to-br from-black to-gray-900 bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            <Send size={16} />
            Envoyer Newsletter ({selectedSubscribers.length})
          </button>

          <button
            onClick={handleDeleteSelected}
            disabled={selectedSubscribers.length === 0}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              selectedSubscribers.length === 0
                ? ' bg-gradient-to-br from-black to-gray-900 bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            <Trash2 size={16} />
            Supprimer ({selectedSubscribers.length})
          </button>

          {/* Removed the Export button */}
          {/* <button
            onClick={handleExportSubscribers}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center gap-2"
          >
            <Download size={16} />
            Exporter
          </button> */}
        </div>

        <div className="flex gap-3 flex-wrap ">
          <div className={`relative rounded-lg overflow-hidden flex items-center ${isDarkMode ? 'bg-gray-800' : 'bg-white border border-gray-300'}`}>
            <Search size={18} className="absolute left-3 text-gray-400 " />
            <input
              type="text"
              placeholder="Rechercher un abonné..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 pr-4 py-2 w-64 focus:outline-none ${isDarkMode ? 'bg-gradient-to-br from-black to-gray-900text-gray-200' : 'bg-white text-gray-700'}`}
            />
          </div>

          <div className={`relative ${isDarkMode ? 'bg-gray-800 ' : 'bg-white border border-gray-300'} rounded-lg overflow-hidden flex items-center`}>
            <Filter size={18} className="absolute left-3 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={`pl-10 pr-4 py-2 focus:outline-none ${isDarkMode ? 'bg-gray-800 text-gray-200 bg-gradient-to-br from-black to-gray-900' : 'bg-white text-gray-700'}`}
            >
              <option value="all">Tous les statuts</option>
              <option value="active">Actifs</option>
              <option value="inactive">Inactifs</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tableau des abonnés - Avec hauteur fixe et état de chargement */}
      <div
        className={`overflow-hidden rounded-xl shadow mb-6 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-black' : 'bg-white'}`}
        style={{ minHeight: tableMinHeight }}
      >
        <table className="w-full">
          <thead className={`${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-50 text-gray-600'}`}>
            <tr>
              <th className="py-4 px-4 text-left">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={currentSubscribers.length > 0 && selectedSubscribers.length === currentSubscribers.length && currentSubscribers.every(sub => selectedSubscribers.includes(sub.id))}
                    onChange={handleSelectAll}
                    className="rounded text-green-500 focus:ring-green-500"
                    disabled={isLoading || currentSubscribers.length === 0}
                  />
                </div>
              </th>
              <th className={`py-4 px-4 text-left`}>Nom</th>
              <th className={`py-4 px-4 text-left`}>Email</th>
              <th className={`py-4 px-4 text-left`}>Date d'inscription</th>
              <th className={`py-4 px-4 text-left`}>Statut</th>
              <th className={`py-4 px-4 text-left`}>Activité</th>
              <th className={`py-4 px-4 text-left`}>Actions</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {isLoading ? (
              // État de chargement
              <tr>
                <td colSpan="7" className="py-32">
                  <div className="flex flex-col items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                </td>
              </tr>
            ) : currentSubscribers.length > 0 ? (
              // Données des abonnés
              currentSubscribers.map(subscriber => (
                <tr key={subscriber.id} className={`${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedSubscribers.includes(subscriber.id)}
                      onChange={() => handleSelectSubscriber(subscriber.id)}
                      className="rounded text-green-500 focus:ring-green-500"
                    />
                  </td>
                  <td className={`py-3 px-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{subscriber.name}</td>
                  <td className={`py-3 px-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{subscriber.email}</td>
                  <td className={`py-3 px-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{subscriber.subscribed_date}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      subscriber.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {subscriber.status === 'active' ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td className={`py-3 px-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <div className="flex items-center gap-2">
                      <span title="Ouvertures" className="flex items-center gap-1">
                        <Mail size={14} /> {subscriber.opens}
                      </span>
                      <span>•</span>
                      <span title="Clics" className="flex items-center gap-1">
                        <Info size={14} /> {subscriber.clicks}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button
                        className={`p-1 rounded-full ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
                        title="Modifier"
                        onClick={() => openEditModal(subscriber)} // Open edit modal on click
                      >
                        <Edit size={16} className="text-blue-500" />
                      </button>
                      <button
                        className={`p-1 rounded-full ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
                        title="Supprimer"
                        onClick={() => {
                          if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'abonné ${subscriber.email}?`)) {
                            const updatedSubscribers = subscribers.filter(s => s.id !== subscriber.id);
                            setSubscribers(updatedSubscribers);
                            setSelectedSubscribers(selectedSubscribers.filter(id => id !== subscriber.id)); // Remove from selection too
                            showNotification('Abonné supprimé avec succès!');
                          }
                        }}
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              // Aucun abonné trouvé
              <tr>
                <td colSpan="7" className="py-32 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <Info size={36} className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    <p className={`mt-4 text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Aucun abonné trouvé
                    </p>
                    {searchTerm && (
                      <p className={`mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                        Essayez de modifier vos critères de recherche
                      </p>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredSubscribers.length > subscribersPerPage && !isLoading && (
        <div className="flex justify-between items-center">
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Affichage de {indexOfFirstSubscriber + 1} à {Math.min(indexOfLastSubscriber, filteredSubscribers.length)} sur {filteredSubscribers.length} abonnés
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-2 rounded-md ${
                currentPage === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : isDarkMode
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Précédent
            </button>

            {/* Dynamic pagination buttons */}
            {Array.from({ length: Math.min(totalPages, 5) }).map((_, index) => {
              let pageNumber;
              if (totalPages <= 5) {
                pageNumber = index + 1;
              } else if (currentPage <= 3) {
                pageNumber = index + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + index;
              } else {
                pageNumber = currentPage - 2 + index;
              }

              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`px-3 py-2 rounded-md ${
                    currentPage === pageNumber
                      ? 'bg-green-500 text-white'
                      : isDarkMode
                        ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-3 py-2 rounded-md ${
                currentPage === totalPages
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : isDarkMode
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Suivant
            </button>
          </div>
        </div>
      )}

      {/* Modal de composition de newsletter */}
      {showComposeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-3xl ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-black' : 'bg-white'} rounded-xl shadow-xl overflow-hidden`}>
            <div className={`p-6 ${isDarkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'}`}>
              <div className="flex justify-between items-center">
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Composer une Newsletter</h3>
                <button onClick={() => setShowComposeModal(false)} className="text-gray-500 hover:text-gray-700">
                  <XCircle size={24} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <label className={`block mb-2 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Destinataires
                </label>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                  {selectedSubscribers.length} abonnés sélectionnés
                </div>
              </div>

              <div className="mb-6">
                <label className={`block mb-2 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Sujet <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newsletterContent.subject}
                  onChange={(e) => setNewsletterContent({...newsletterContent, subject: e.target.value})}
                  placeholder="Entrez le sujet de la newsletter"
                  className={`w-full px-4 py-2 rounded-lg ${
                    isDarkMode
                      ? 'bg-gray-700 text-gray-200 border border-gray-600'
                      : 'border border-gray-300 text-gray-800'
                  } focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
              </div>

              <div className="mb-6">
                <label className={`block mb-2 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Contenu <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={newsletterContent.content}
                  onChange={(e) => setNewsletterContent({...newsletterContent, content: e.target.value})}
                  placeholder="Composez votre newsletter..."
                  rows={10}
                  className={`w-full px-4 py-2 rounded-lg ${
                    isDarkMode
                      ? 'bg-gray-700 text-gray-200 border border-gray-600'
                      : 'border border-gray-300 text-gray-800'
                  } focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
              </div>
            </div>

            <div className={`p-6 flex justify-end gap-3 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-black' : 'bg-gray-50'}`}>
              <button
                onClick={() => setShowComposeModal(false)}
                className={`px-4 py-2 rounded-lg ${
                  isDarkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Annuler
              </button>
              <button
                onClick={handleSendNewsletter}
                disabled={!newsletterContent.subject || !newsletterContent.content}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  !newsletterContent.subject || !newsletterContent.content
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                <Send size={16} />
                Envoyer Newsletter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de modification d'abonné */}
      {showEditModal && editingSubscriber && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-md ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-black' : 'bg-white'} rounded-xl shadow-xl overflow-hidden`}>
            <div className={`p-6 ${isDarkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'}`}>
              <div className="flex justify-between items-center">
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Modifier l'abonné</h3>
                <button onClick={closeEditModal} className="text-gray-500 hover:text-gray-700">
                  <XCircle size={24} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <label className={`block mb-2 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Nom <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={editFormData.name}
                  onChange={handleEditInputChange}
                  className={`w-full px-4 py-2 rounded-lg ${
                    isDarkMode
                      ? 'bg-gray-700 text-gray-200 border border-gray-600'
                      : 'border border-gray-300 text-gray-800'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              <div className="mb-4">
                <label className={`block mb-2 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleEditInputChange}
                  className={`w-full px-4 py-2 rounded-lg ${
                    isDarkMode
                      ? 'bg-gray-700 text-gray-200 border border-gray-600'
                      : 'border border-gray-300 text-gray-800'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
               <div className="mb-4">
                <label className={`block mb-2 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Statut <span className="text-red-500">*</span>
                </label>
                <select
                  name="status"
                  value={editFormData.status}
                  onChange={handleEditInputChange}
                  className={`w-full px-4 py-2 rounded-lg ${
                    isDarkMode
                      ? 'bg-gray-700 text-gray-200 border border-gray-600'
                      : 'border border-gray-300 text-gray-800'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="active">Actif</option>
                  <option value="inactive">Inactif</option>
                </select>
              </div>
            </div>

            <div className={`p-6 flex justify-end gap-3 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-black' : 'bg-gray-50'}`}>
              <button
                onClick={closeEditModal}
                className={`px-4 py-2 rounded-lg ${
                  isDarkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Annuler
              </button>
              <button
                onClick={handleUpdateSubscriber}
                disabled={!editFormData.name || !editFormData.email || !editFormData.status}
                 className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  !editFormData.name || !editFormData.email || !editFormData.status
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                 <Edit size={16} />
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Newsletter;