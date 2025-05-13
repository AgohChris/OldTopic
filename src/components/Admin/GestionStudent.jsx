import React, { useState, useEffect } from 'react';
import { Search, Filter, UserCheck, UserX, FileDown } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';

const GestionStudent = () => {
  // Récupérer isDarkMode depuis le contexte de l'Outlet
  const { isDarkMode } = useOutletContext();
  
  // État pour stocker la liste des étudiants
  const [students, setStudents] = useState([]);
  // État pour stocker les étudiants filtrés
  const [filteredStudents, setFilteredStudents] = useState([]);
  // État pour les filtres
  const [filters, setFilters] = useState({
    searchTerm: '',
    annee: '',
    niveau: '',
    filiere: ''
  });
  // État pour le chargement
  const [loading, setLoading] = useState(true);
  
  // États pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(5);
  
  // État pour le menu d'exportation
  const [showExportMenu, setShowExportMenu] = useState(false);

  // Données factices pour la démonstration
  useEffect(() => {
    // Simuler un appel API
    setTimeout(() => {
      const mockStudents = [
        { id: 1, nom: "Dupont", prenom: "Marie", email: "marie.dupont@example.com", annee: "2024", niveau: "L3", filiere: "Informatique", status: "actif" },
        { id: 2, nom: "Martin", prenom: "Jean", email: "jean.martin@example.com", annee: "2024", niveau: "M1", filiere: "Physique", status: "actif" },
        { id: 3, nom: "Bernard", prenom: "Sophie", email: "sophie.bernard@example.com", annee: "2023", niveau: "L2", filiere: "Chimie", status: "suspendu" },
        { id: 4, nom: "Petit", prenom: "Thomas", email: "thomas.petit@example.com", annee: "2024", niveau: "M2", filiere: "Informatique", status: "actif" },
        { id: 5, nom: "Robert", prenom: "Emma", email: "emma.robert@example.com", annee: "2023", niveau: "L1", filiere: "Mathématiques", status: "actif" },
        { id: 6, nom: "Richard", prenom: "Lucas", email: "lucas.richard@example.com", annee: "2024", niveau: "L3", filiere: "Biologie", status: "suspendu" },
        { id: 7, nom: "Moreau", prenom: "Léa", email: "lea.moreau@example.com", annee: "2023", niveau: "M1", filiere: "Physique", status: "actif" },
        { id: 8, nom: "Simon", prenom: "Hugo", email: "hugo.simon@example.com", annee: "2024", niveau: "L2", filiere: "Mathématiques", status: "actif" },
        { id: 9, nom: "Michel", prenom: "Camille", email: "camille.michel@example.com", annee: "2023", niveau: "L3", filiere: "Chimie", status: "suspendu" },
        { id: 10, nom: "Dubois", prenom: "Alexandre", email: "alexandre.dubois@example.com", annee: "2024", niveau: "M2", filiere: "Informatique", status: "actif" },
        { id: 11, nom: "Leroy", prenom: "Julie", email: "julie.leroy@example.com", annee: "2023", niveau: "L1", filiere: "Biologie", status: "actif" },
        { id: 12, nom: "Girard", prenom: "Maxime", email: "maxime.girard@example.com", annee: "2024", niveau: "M1", filiere: "Informatique", status: "suspendu" },
      ];
      setStudents(mockStudents);
      setFilteredStudents(mockStudents);
      setLoading(false);
    }, 1000);
  }, []);

  // Options pour les filtres
  const annees = ["2023", "2024"];
  const niveaux = ["L1", "L2", "L3", "M1", "M2"];
  const filieres = ["Informatique", "Mathématiques", "Physique", "Chimie", "Biologie"];

  // Gérer les changements de filtres
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1); // Réinitialiser à la première page lors du filtrage
  };

  // Appliquer les filtres
  useEffect(() => {
    let result = [...students];
    
    // Filtre par recherche (nom, prénom, email)
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      result = result.filter(student => 
        student.nom.toLowerCase().includes(searchLower) || 
        student.prenom.toLowerCase().includes(searchLower) || 
        student.email.toLowerCase().includes(searchLower)
      );
    }
    
    // Filtre par année
    if (filters.annee) {
      result = result.filter(student => student.annee === filters.annee);
    }
    
    // Filtre par niveau
    if (filters.niveau) {
      result = result.filter(student => student.niveau === filters.niveau);
    }
    
    // Filtre par filière
    if (filters.filiere) {
      result = result.filter(student => student.filiere === filters.filiere);
    }
    
    setFilteredStudents(result);
  }, [filters, students]);

  // Gérer la suspension/réactivation du compte
  const toggleStatus = (id) => {
    setStudents(prev => 
      prev.map(student => {
        if (student.id === id) {
          const newStatus = student.status === 'actif' ? 'suspendu' : 'actif';
          return { ...student, status: newStatus };
        }
        return student;
      })
    );
  };

  // Réinitialiser tous les filtres
  const resetFilters = () => {
    setFilters({
      searchTerm: '',
      annee: '',
      niveau: '',
      filiere: ''
    });
    setCurrentPage(1); // Réinitialiser à la première page
  };

  // Calculer les étudiants de la page courante
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  // Changer de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  // Fonction pour exporter en CSV
  const exportToCSV = () => {
    // Préparer les entêtes CSV
    const headers = ['ID', 'Nom', 'Prénom', 'Email', 'Année', 'Niveau', 'Filière', 'Statut'];
    
    // Transformer les données en format CSV
    const csvData = filteredStudents.map(student => [
      student.id,
      student.nom,
      student.prenom,
      student.email,
      student.annee,
      student.niveau,
      student.filiere,
      student.status
    ]);
    
    // Créer le contenu CSV
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');
    
    // Créer un blob et un lien de téléchargement
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'etudiants.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Fermer le menu d'exportation
    setShowExportMenu(false);
  };

  // Fonction pour exporter en PDF (simulée, nécessiterait une bibliothèque comme jsPDF)
  const exportToPDF = () => {
    alert('Exportation en PDF. Cette fonctionnalité nécessiterait une bibliothèque comme jsPDF.');
    // Dans un cas réel, vous utiliseriez une bibliothèque comme jsPDF pour générer le PDF
    
    // Fermer le menu d'exportation
    setShowExportMenu(false);
  };

  return (
    <div className={`flex flex-col h-full ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-black' : 'bg-white'} p-6 rounded-lg shadow-md`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Gestion des Étudiants</h1>
        
        {/* Bouton d'exportation avec menu déroulant */}
        <div className="relative">
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            className={`px-4 py-2 ${
              isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
            } text-white rounded-md flex items-center gap-2`}
          >
            <FileDown size={18} />
            Exporter
          </button>
          
          {showExportMenu && (
            <div className={`absolute right-0 mt-2 w-40 rounded-md shadow-lg z-10 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="py-1">
                <button
                  onClick={exportToCSV}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    isDarkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Exporter en CSV
                </button>
                <button
                  onClick={exportToPDF}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    isDarkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Exporter en PDF
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Section de filtres */}
      <div className={`flex flex-col lg:flex-row gap-4 mb-6 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-black' : 'bg-gray-50'} p-4 rounded-lg`}>
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Rechercher par nom, prénom ou email..."
              name="searchTerm"
              value={filters.searchTerm}
              onChange={handleFilterChange}
              className={`pl-10 pr-4 py-2 w-full rounded-md border ${
                isDarkMode ? 'border-gray-600 bg-gray-700 text-gray-200' : 'border-gray-300 bg-white text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <select
            name="annee"
            value={filters.annee}
            onChange={handleFilterChange}
            className={`px-4 py-2 rounded-md border ${
              isDarkMode ? 'border-gray-600 bg-gray-700 text-gray-200' : 'border-gray-300 bg-white text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="">Année</option>
            {annees.map(annee => (
              <option key={annee} value={annee}>{annee}</option>
            ))}
          </select>
          
          <select
            name="niveau"
            value={filters.niveau}
            onChange={handleFilterChange}
            className={`px-4 py-2 rounded-md border ${
              isDarkMode ? 'border-gray-600 bg-gray-700 text-gray-200' : 'border-gray-300 bg-white text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="">Niveau</option>
            {niveaux.map(niveau => (
              <option key={niveau} value={niveau}>{niveau}</option>
            ))}
          </select>
          
          <select
            name="filiere"
            value={filters.filiere}
            onChange={handleFilterChange}
            className={`px-4 py-2 rounded-md border ${
              isDarkMode ? 'border-gray-600 bg-gray-700 text-gray-200' : 'border-gray-300 bg-white text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="">Filière</option>
            {filieres.map(filiere => (
              <option key={filiere} value={filiere}>{filiere}</option>
            ))}
          </select>
          
          <button
            onClick={resetFilters}
            className={`px-4 py-2 ${
              isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            } rounded-md flex items-center gap-2`}
          >
            <Filter size={18} />
            Réinitialiser
          </button>
        </div>
      </div>
      
      {/* Tableau des étudiants */}
      <div className={`overflow-x-auto flex-grow ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-black' : 'bg-white'} rounded-lg shadow-sm`}>
        {loading ? (
          <div className="flex justify-center items-center h-60">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className={`flex justify-center items-center h-60 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Aucun étudiant trouvé
          </div>
        ) : (
          <table className={`min-w-full divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
            <thead className={isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>ID</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Nom</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Prénom</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Email</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Année</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Niveau</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Filière</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Statut</th>
                <th className={`px-6 py-3 text-right text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Actions</th>
              </tr>
            </thead>
            <tbody className={`${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-black' : 'bg-white'} divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {currentStudents.map((student) => (
                <tr key={student.id} className={isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>{student.id}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>{student.nom}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>{student.prenom}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>{student.email}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>{student.annee}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>{student.niveau}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>{student.filiere}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      student.status === 'actif' 
                        ? isDarkMode ? 'bg-green-800 text-green-100' : 'bg-green-100 text-green-800' 
                        : isDarkMode ? 'bg-red-800 text-red-100' : 'bg-red-100 text-red-800'
                    }`}>
                      {student.status === 'actif' ? 'Actif' : 'Suspendu'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => toggleStatus(student.id)}
                      className={`ml-3 flex items-center gap-1 px-3 py-1 rounded-md ${
                        student.status === 'actif'
                          ? 'bg-red-500 hover:bg-red-600 text-white'
                          : 'bg-green-500 hover:bg-green-600 text-white'
                      }`}
                    >
                      {student.status === 'actif' ? (
                        <>
                          <UserX size={16} />
                          <span>Suspendre</span>
                        </>
                      ) : (
                        <>
                          <UserCheck size={16} />
                          <span>Réactiver</span>
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      
      {/* Pagination fonctionnelle */}
      <div className={`flex justify-between items-center mt-6 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        <div>
          Affichage de {indexOfFirstStudent + 1}-{Math.min(indexOfLastStudent, filteredStudents.length)} sur {filteredStudents.length} étudiant(s)
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 border ${
              currentPage === 1 
                ? isDarkMode ? 'border-gray-700 bg-gray-800 text-gray-500 cursor-not-allowed' : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                : isDarkMode ? 'border-gray-600 hover:bg-gray-700 text-gray-300' : 'border-gray-300 hover:bg-gray-100 text-gray-700'
            } rounded-md`}
          >
            Précédent
          </button>
          
          {/* Affichage des numéros de page */}
          <div className="flex gap-1">
            {[...Array(totalPages).keys()].map(number => (
              <button
                key={number + 1}
                onClick={() => paginate(number + 1)}
                className={`px-3 py-1 border rounded-md ${
                  currentPage === number + 1
                    ? isDarkMode ? 'bg-blue-600 border-blue-700 text-white' : 'bg-blue-500 border-blue-600 text-white'
                    : isDarkMode ? 'border-gray-600 hover:bg-gray-700 text-gray-300' : 'border-gray-300 hover:bg-gray-100 text-gray-700'
                }`}
              >
                {number + 1}
              </button>
            ))}
          </div>
          
          <button 
            onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`px-3 py-1 border ${
              currentPage === totalPages || totalPages === 0
                ? isDarkMode ? 'border-gray-700 bg-gray-800 text-gray-500 cursor-not-allowed' : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                : isDarkMode ? 'border-gray-600 hover:bg-gray-700 text-gray-300' : 'border-gray-300 hover:bg-gray-100 text-gray-700'
            } rounded-md`}
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
};

export default GestionStudent;