import React, { useState, useEffect } from 'react';
import { Search, Filter, UserCheck, UserX } from 'lucide-react';

const GestionStudent = () => {
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
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Gestion des Étudiants</h1>
      
      {/* Section de filtres */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Rechercher par nom, prénom ou email..."
              name="searchTerm"
              value={filters.searchTerm}
              onChange={handleFilterChange}
              className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <select
            name="annee"
            value={filters.annee}
            onChange={handleFilterChange}
            className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Filière</option>
            {filieres.map(filiere => (
              <option key={filiere} value={filiere}>{filiere}</option>
            ))}
          </select>
          
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md flex items-center gap-2"
          >
            <Filter size={18} />
            Réinitialiser
          </button>
        </div>
      </div>
      
      {/* Tableau des étudiants */}
      <div className="overflow-x-auto flex-grow bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        {loading ? (
          <div className="flex justify-center items-center h-60">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="flex justify-center items-center h-60 text-gray-500 dark:text-gray-400">
            Aucun étudiant trouvé
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Prénom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Année</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Niveau</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Filière</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{student.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{student.nom}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{student.prenom}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{student.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{student.annee}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{student.niveau}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{student.filiere}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      student.status === 'actif' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                        : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
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
      
      {/* Pagination (pour une future implémentation) */}
      <div className="flex justify-between items-center mt-6 text-sm text-gray-600 dark:text-gray-400">
        <div>
          Affichage de {filteredStudents.length} étudiant(s) sur {students.length}
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
            Précédent
          </button>
          <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
};

export default GestionStudent;