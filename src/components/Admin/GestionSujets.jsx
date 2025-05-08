import React, { useState, useEffect } from 'react';
import { FileText, File, Plus, X, Upload, Search, Filter, Trash2, Edit, Save } from 'lucide-react';

const GestionSujets = () => {
  // États pour les sujets et le filtrage
  const [sujets, setSujets] = useState([]);
  const [filteredSujets, setFilteredSujets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [filters, setFilters] = useState({
    searchTerm: '',
    type: '',
    niveau: '',
    filiere: '',
    annee: ''
  });

  // État pour le formulaire
  const [formData, setFormData] = useState({
    titre: '',
    type: 'examen', // Par défaut
    niveau: '',
    filiere: '',
    annee: '',
    professeur: '',
    description: '',
    fichier: null
  });

  // Données factices pour la démonstration
  useEffect(() => {
    setTimeout(() => {
      const mockSujets = [
        { id: 1, titre: "Examen final Algorithmique", type: "examen", niveau: "L2", filiere: "Informatique", annee: "2024", professeur: "Dr. Martin", description: "Examen portant sur les structures de données avancées", dateAjout: "2024-05-01" },
        { id: 2, titre: "TD3 Mathématiques discrètes", type: "td", niveau: "L1", filiere: "Mathématiques", annee: "2024", professeur: "Dr. Bernard", description: "Exercices sur la théorie des graphes", dateAjout: "2024-04-20" },
        { id: 3, titre: "TP Réseaux informatiques", type: "tp", niveau: "L3", filiere: "Informatique", annee: "2023", professeur: "Dr. Dubois", description: "Configuration d'un réseau local", dateAjout: "2023-11-15" },
        { id: 4, titre: "Devoir maison Analyse", type: "devoir", niveau: "M1", filiere: "Mathématiques", annee: "2024", professeur: "Dr. Petit", description: "Problèmes d'optimisation", dateAjout: "2024-03-10" },
        { id: 5, titre: "Interrogation surprise Physique", type: "interrogation", niveau: "L2", filiere: "Physique", annee: "2023", professeur: "Dr. Lambert", description: "Questions sur les lois de Newton", dateAjout: "2023-12-05" },
      ];
      setSujets(mockSujets);
      setFilteredSujets(mockSujets);
      setLoading(false);
    }, 1000);
  }, []);

  // Options pour les filtres et le formulaire
  const typesSujet = ["examen", "td", "tp", "devoir", "interrogation"];
  const niveaux = ["L1", "L2", "L3", "M1", "M2"];
  const filieres = ["Informatique", "Mathématiques", "Physique", "Chimie", "Biologie"];
  const annees = ["2023", "2024", "2025"];

  // Gérer les changements de filtres
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Appliquer les filtres
  useEffect(() => {
    let result = [...sujets];
    
    // Filtre par recherche (titre, professeur)
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      result = result.filter(sujet => 
        sujet.titre.toLowerCase().includes(searchLower) || 
        sujet.professeur.toLowerCase().includes(searchLower) ||
        sujet.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Filtre par type
    if (filters.type) {
      result = result.filter(sujet => sujet.type === filters.type);
    }
    
    // Filtre par niveau
    if (filters.niveau) {
      result = result.filter(sujet => sujet.niveau === filters.niveau);
    }
    
    // Filtre par filière
    if (filters.filiere) {
      result = result.filter(sujet => sujet.filiere === filters.filiere);
    }
    
    // Filtre par année
    if (filters.annee) {
      result = result.filter(sujet => sujet.annee === filters.annee);
    }
    
    setFilteredSujets(result);
  }, [filters, sujets]);

  // Réinitialiser tous les filtres
  const resetFilters = () => {
    setFilters({
      searchTerm: '',
      type: '',
      niveau: '',
      filiere: '',
      annee: ''
    });
  };

  // Gérer les changements dans le formulaire
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Gérer l'upload de fichier
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFormData(prev => ({ ...prev, fichier: file }));
    }
  };

  // Soumettre le formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      // Mise à jour d'un sujet existant
      setSujets(prev => prev.map(sujet => {
        if (sujet.id === editId) {
          return {
            ...sujet,
            titre: formData.titre,
            type: formData.type,
            niveau: formData.niveau,
            filiere: formData.filiere,
            annee: formData.annee,
            professeur: formData.professeur,
            description: formData.description,
            fichier: selectedFile ? selectedFile.name : sujet.fichier
          };
        }
        return sujet;
      }));
      
      setIsEditing(false);
      setEditId(null);
      setShowEditModal(false);
    } else {
      // Ajout d'un nouveau sujet
      const newSujet = {
        id: sujets.length + 1,
        titre: formData.titre,
        type: formData.type,
        niveau: formData.niveau,
        filiere: formData.filiere,
        annee: formData.annee,
        professeur: formData.professeur,
        description: formData.description,
        dateAjout: new Date().toISOString().split('T')[0],
        fichier: selectedFile ? selectedFile.name : null
      };

      setSujets(prev => [...prev, newSujet]);
      setShowModal(false);
    }
    
    // Réinitialiser le formulaire 
    setFormData({
      titre: '',
      type: 'examen',
      niveau: '',
      filiere: '',
      annee: '',
      professeur: '',
      description: '',
      fichier: null
    });
    setSelectedFile(null);
  };
  
  // Gérer la modification d'un sujet
  const handleEdit = (sujet) => {
    setIsEditing(true);
    setEditId(sujet.id);
    setFormData({
      titre: sujet.titre,
      type: sujet.type,
      niveau: sujet.niveau,
      filiere: sujet.filiere,
      annee: sujet.annee,
      professeur: sujet.professeur,
      description: sujet.description || '',
      fichier: sujet.fichier
    });
    // On ne modifie pas setSelectedFile car on ne peut pas récupérer le fichier réel
    setShowEditModal(true);
  };

  // Ouvrir le modal avec un type de sujet spécifique
  const openModalWithType = (type) => {
    setFormData(prev => ({ ...prev, type }));
    setShowModal(true);
  };

  // Formater le libellé du type de document
  const formatType = (type) => {
    const types = {
      'examen': 'Examen',
      'td': 'TD',
      'tp': 'TP',
      'devoir': 'Devoir',
      'interrogation': 'Interrogation'
    };
    return types[type] || type;
  };

  // Icône en fonction du type de document
  const getTypeIcon = (type) => {
    switch (type) {
      case 'examen':
        return <FileText className="text-red-500" size={20} />;
      case 'td':
        return <FileText className="text-blue-500" size={20} />;
      case 'tp':
        return <FileText className="text-green-500" size={20} />;
      case 'devoir':
        return <FileText className="text-purple-500" size={20} />;
      case 'interrogation':
        return <FileText className="text-yellow-500" size={20} />;
      default:
        return <File className="text-gray-500" size={20} />;
    }
  };

  // Simuler la suppression d'un sujet
  const handleDelete = (id) => {
    setSujets(prev => prev.filter(sujet => sujet.id !== id));
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Gestion des Sujets</h1>
      
      {/* Section de filtres */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Rechercher par titre, professeur ou description..."
              name="searchTerm"
              value={filters.searchTerm}
              onChange={handleFilterChange}
              className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Type de sujet</option>
            {typesSujet.map(type => (
              <option key={type} value={type}>{formatType(type)}</option>
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
          
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md flex items-center gap-2"
          >
            <Filter size={18} />
            Réinitialiser
          </button>
        </div>
      </div>
      
      {/* Boutons d'ajout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
        {typesSujet.map(type => (
          <button
            key={type}
            onClick={() => openModalWithType(type)}
            className="flex items-center justify-center gap-2 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
          >
            <Plus size={18} />
            Ajouter {formatType(type)}
          </button>
        ))}
      </div>
      
      {/* Liste des sujets */}
      <div className="overflow-x-auto flex-grow bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        {loading ? (
          <div className="flex justify-center items-center h-60">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredSujets.length === 0 ? (
          <div className="flex justify-center items-center h-60 text-gray-500 dark:text-gray-400">
            Aucun sujet trouvé
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Titre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Niveau</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Filière</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Année</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Professeur</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date d'ajout</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredSujets.map((sujet) => (
                <tr key={sujet.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getTypeIcon(sujet.type)}
                      <span className="ml-2 text-sm text-gray-900 dark:text-gray-200">
                        {formatType(sujet.type)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{sujet.titre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{sujet.niveau}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{sujet.filiere}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{sujet.annee}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{sujet.professeur}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{sujet.dateAjout}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={() => handleEdit(sujet)}
                        className="p-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(sujet.id)}
                        className="p-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
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
          Affichage de {filteredSujets.length} sujet(s) sur {sujets.length}
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
      
      {/* Modal d'ajout de sujet */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 p-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Ajouter un {formatType(formData.type)}
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                {/* Titre */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Titre du sujet*
                  </label>
                  <input
                    type="text"
                    name="titre"
                    value={formData.titre}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                {/* Type de sujet */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Type de sujet*
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {typesSujet.map(type => (
                      <option key={type} value={type}>{formatType(type)}</option>
                    ))}
                  </select>
                </div>
                
                {/* Niveau */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Niveau*
                  </label>
                  <select
                    name="niveau"
                    value={formData.niveau}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Sélectionner un niveau</option>
                    {niveaux.map(niveau => (
                      <option key={niveau} value={niveau}>{niveau}</option>
                    ))}
                  </select>
                </div>
                
                {/* Filière */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Filière*
                  </label>
                  <select
                    name="filiere"
                    value={formData.filiere}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Sélectionner une filière</option>
                    {filieres.map(filiere => (
                      <option key={filiere} value={filiere}>{filiere}</option>
                    ))}
                  </select>
                </div>
                
                {/* Année */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Année*
                  </label>
                  <select
                    name="annee"
                    value={formData.annee}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Sélectionner une année</option>
                    {annees.map(annee => (
                      <option key={annee} value={annee}>{annee}</option>
                    ))}
                  </select>
                </div>
                
                {/* Professeur */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Professeur*
                  </label>
                  <input
                    type="text"
                    name="professeur"
                    value={formData.professeur}
                    onChange={handleFormChange}
                    required
                    placeholder="Dr. Nom du professeur"
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description (optionnelle)
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    rows={3}
                    placeholder="Description du sujet..."
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                {/* Upload de fichier */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Fichier du sujet*
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {selectedFile ? (
                          <>
                            <FileText className="w-10 h-10 mb-3 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">{selectedFile.name}</span>
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </>
                        ) : (
                          <>
                            <Upload className="w-10 h-10 mb-3 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">Cliquez pour uploader</span> ou glissez-déposez
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              PDF, DOCX, ou autres formats (MAX. 10 MB)
                            </p>
                          </>
                        )}
                      </div>
                      <input 
                        id="dropzone-file" 
                        type="file" 
                        className="hidden" 
                        onChange={handleFileChange}
                        required
                      />
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
    {/* Modal de modification de sujet */}
{showEditModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Modifier le {formatType(formData.type)}
        </h3>
        <button 
          onClick={() => setShowEditModal(false)}
          className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
        >
          <X size={24} />
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6">
        <div className="space-y-4">
          {/* Titre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Titre du sujet*
            </label>
            <input
              type="text"
              name="titre"
              value={formData.titre}
              onChange={handleFormChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Type de sujet */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Type de sujet*
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleFormChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {typesSujet.map(type => (
                <option key={type} value={type}>{formatType(type)}</option>
              ))}
            </select>
          </div>

          {/* Niveau */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Niveau*
            </label>
            <select
              name="niveau"
              value={formData.niveau}
              onChange={handleFormChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sélectionner un niveau</option>
              {niveaux.map(niveau => (
                <option key={niveau} value={niveau}>{niveau}</option>
              ))}
            </select>
          </div>

          {/* Filière */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Filière*
            </label>
            <select
              name="filiere"
              value={formData.filiere}
              onChange={handleFormChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sélectionner une filière</option>
              {filieres.map(filiere => (
                <option key={filiere} value={filiere}>{filiere}</option>
              ))}
            </select>
          </div>

          {/* Année */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Année*
            </label>
            <select
              name="annee"
              value={formData.annee}
              onChange={handleFormChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sélectionner une année</option>
              {annees.map(annee => (
                <option key={annee} value={annee}>{annee}</option>
              ))}
            </select>
          </div>

          {/* Professeur */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Professeur*
            </label>
            <input
              type="text"
              name="professeur"
              value={formData.professeur}
              onChange={handleFormChange}
              required
              placeholder="Dr. Nom du professeur"
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description (optionnelle)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleFormChange}
              rows={3}
              placeholder="Description du sujet..."
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Upload de fichier */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Fichier du sujet (optionnel)
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {selectedFile ? (
                    <>
                      <FileText className="w-10 h-10 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">{selectedFile.name}</span>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </>
                  ) : formData.fichier ? (
                    <>
                      <FileText className="w-10 h-10 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">{formData.fichier}</span>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Fichier existant
                      </p>
                    </>
                  ) : (
                    <>
                      <Upload className="w-10 h-10 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Cliquez pour uploader</span> ou glissez-déposez
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PDF, DOCX, ou autres formats (MAX. 10 MB)
                      </p>
                    </>
                  )}
                </div>
                <input 
                  id="dropzone-file" 
                  type="file" 
                  className="hidden" 
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => setShowEditModal(false)}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  </div>
)}
    </div>
  );
};

export default GestionSujets;