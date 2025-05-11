import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom'; // << 1. Importer useOutletContext
import { FileText, File, Plus, X, Upload, Search, Filter, Trash2, Edit, Save } from 'lucide-react';

const GestionSujets = () => {
  const { isDarkMode } = useOutletContext(); // << 2. Récupérer isDarkMode

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

  const typesSujet = ["examen", "td", "tp", "devoir", "interrogation"];
  const niveaux = ["L1", "L2", "L3", "M1", "M2"];
  const filieres = ["Informatique", "Mathématiques", "Physique", "Chimie", "Biologie"];
  const annees = ["2023", "2024", "2025"];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    let result = [...sujets];
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      result = result.filter(sujet => 
        sujet.titre.toLowerCase().includes(searchLower) || 
        sujet.professeur.toLowerCase().includes(searchLower) ||
        sujet.description.toLowerCase().includes(searchLower)
      );
    }
    if (filters.type) result = result.filter(sujet => sujet.type === filters.type);
    if (filters.niveau) result = result.filter(sujet => sujet.niveau === filters.niveau);
    if (filters.filiere) result = result.filter(sujet => sujet.filiere === filters.filiere);
    if (filters.annee) result = result.filter(sujet => sujet.annee === filters.annee);
    setFilteredSujets(result);
  }, [filters, sujets]);

  const resetFilters = () => {
    setFilters({ searchTerm: '', type: '', niveau: '', filiere: '', annee: '' });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFormData(prev => ({ ...prev, fichier: file }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setSujets(prev => prev.map(sujet => 
        sujet.id === editId ? {
          ...sujet, ...formData,
          fichier: selectedFile ? selectedFile.name : sujet.fichier 
        } : sujet
      ));
      setIsEditing(false);
      setEditId(null);
      setShowEditModal(false);
    } else {
      const newSujet = {
        id: sujets.length + 1, ...formData,
        dateAjout: new Date().toISOString().split('T')[0],
        fichier: selectedFile ? selectedFile.name : null
      };
      setSujets(prev => [...prev, newSujet]);
      setShowModal(false);
    }
    setFormData({ titre: '', type: 'examen', niveau: '', filiere: '', annee: '', professeur: '', description: '', fichier: null });
    setSelectedFile(null);
  };
  
  const handleEdit = (sujet) => {
    setIsEditing(true);
    setEditId(sujet.id);
    setFormData({ ...sujet, description: sujet.description || ''});
    setShowEditModal(true);
  };

  const openModalWithType = (type) => {
    setFormData(prev => ({ ...prev, type, titre: '', niveau: '', filiere: '', annee: '', professeur: '', description: '', fichier: null }));
    setSelectedFile(null);
    setShowModal(true);
  };

  const formatType = (type) => {
    const types = { 'examen': 'Examen', 'td': 'TD', 'tp': 'TP', 'devoir': 'Devoir', 'interrogation': 'Interrogation' };
    return types[type] || type;
  };

  const getTypeIcon = (type) => {
    const commonProps = { size: 20 };
    switch (type) {
      case 'examen': return <FileText className="text-red-500" {...commonProps} />;
      case 'td': return <FileText className="text-blue-500" {...commonProps} />;
      case 'tp': return <FileText className="text-green-500" {...commonProps} />;
      case 'devoir': return <FileText className="text-purple-500" {...commonProps} />;
      case 'interrogation': return <FileText className="text-yellow-500" {...commonProps} />;
      default: return <File className="text-gray-500" {...commonProps} />;
    }
  };

  const handleDelete = (id) => {
    setSujets(prev => prev.filter(sujet => sujet.id !== id));
  };

  // Classes conditionnelles pour les inputs, selects, textareas
  const formElementClasses = `w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
    isDarkMode 
      ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400' 
      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
  }`;

  const modalBgClass = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const modalTextColorClass = isDarkMode ? 'text-white' : 'text-gray-900';
  const modalBorderClass = isDarkMode ? 'border-gray-700' : 'border-gray-200';
  const labelClass = `block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`;

  return (
    <div className={`flex flex-col h-full p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <h1 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Gestion des Sujets</h1>
      
      <div className={`flex flex-col lg:flex-row gap-4 mb-6 p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Rechercher par titre, professeur ou description..."
              name="searchTerm"
              value={filters.searchTerm}
              onChange={handleFilterChange}
              className={`pl-10 pr-4 py-2 w-full rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode 
                  ? 'border-gray-600 bg-gray-700 text-gray-200' 
                  : 'border-gray-300 bg-white text-gray-900'
              }`}
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {[
            { name: "type", value: filters.type, options: [{ value: "", label: "Type de sujet" }, ...typesSujet.map(type => ({ value: type, label: formatType(type)}))] },
            { name: "niveau", value: filters.niveau, options: [{ value: "", label: "Niveau" }, ...niveaux.map(n => ({ value: n, label: n}))] },
            { name: "filiere", value: filters.filiere, options: [{ value: "", label: "Filière" }, ...filieres.map(f => ({ value: f, label: f}))] },
            { name: "annee", value: filters.annee, options: [{ value: "", label: "Année" }, ...annees.map(a => ({ value: a, label: a}))] },
          ].map(filter => (
            <select
              key={filter.name}
              name={filter.name}
              value={filter.value}
              onChange={handleFilterChange}
              className={`px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode 
                  ? 'border-gray-600 bg-gray-700 text-gray-200' 
                  : 'border-gray-300 bg-white text-gray-900'
              }`}
            >
              {filter.options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          ))}
          
          <button
            onClick={resetFilters}
            className={`px-4 py-2 rounded-md flex items-center gap-2 ${
              isDarkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
          >
            <Filter size={18} />
            Réinitialiser
          </button>
        </div>
      </div>
      
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
      
      <div className={`overflow-x-auto flex-grow rounded-lg shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        {loading ? (
          <div className="flex justify-center items-center h-60">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredSujets.length === 0 ? (
          <div className={`flex justify-center items-center h-60 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Aucun sujet trouvé
          </div>
        ) : (
          <table className={`min-w-full divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
            <thead className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <tr>
                {["Type", "Titre", "Niveau", "Filière", "Année", "Professeur", "Date d'ajout", "Actions"].map(header => (
                  <th key={header} className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} ${header === "Actions" ? "text-right" : ""}`}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={`divide-y ${isDarkMode ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'}`}>
              {filteredSujets.map((sujet) => (
                <tr key={sujet.id} className={`${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getTypeIcon(sujet.type)}
                      <span className={`ml-2 text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                        {formatType(sujet.type)}
                      </span>
                    </div>
                  </td>
                  {['titre', 'niveau', 'filiere', 'annee', 'professeur', 'dateAjout'].map(field => (
                     <td key={field} className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>{sujet[field]}</td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button onClick={() => handleEdit(sujet)} className="p-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"><Edit size={16} /></button>
                      <button onClick={() => handleDelete(sujet.id)} className="p-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      
      <div className={`flex justify-between items-center mt-6 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        <div>
          Affichage de {filteredSujets.length} sujet(s) sur {sujets.length}
        </div>
        <div className="flex gap-2">
          <button className={`px-3 py-1 border rounded-md ${isDarkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-100'}`}>Précédent</button>
          <button className={`px-3 py-1 border rounded-md ${isDarkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-100'}`}>Suivant</button>
        </div>
      </div>
      
      {/* Modal d'ajout/modification (combiné pour simplifier, ajustez au besoin) */}
      {(showModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${modalBgClass} rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto`}>
            <div className={`flex justify-between items-center border-b p-4 ${modalBorderClass}`}>
              <h3 className={`text-xl font-semibold ${modalTextColorClass}`}>
                {isEditing ? `Modifier le ${formatType(formData.type)}` : `Ajouter un ${formatType(formData.type)}`}
              </h3>
              <button 
                onClick={() => { setShowModal(false); setShowEditModal(false); setIsEditing(false); }}
                className={`${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'}`}
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                {/* Champs du formulaire */}
                <div>
                  <label className={labelClass}>Titre du sujet*</label>
                  <input type="text" name="titre" value={formData.titre} onChange={handleFormChange} required className={formElementClasses}/>
                </div>
                <div>
                  <label className={labelClass}>Type de sujet*</label>
                  <select name="type" value={formData.type} onChange={handleFormChange} required className={formElementClasses}>
                    {typesSujet.map(type => <option key={type} value={type}>{formatType(type)}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Niveau*</label>
                  <select name="niveau" value={formData.niveau} onChange={handleFormChange} required className={formElementClasses}>
                    <option value="">Sélectionner un niveau</option>
                    {niveaux.map(niveau => <option key={niveau} value={niveau}>{niveau}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Filière*</label>
                  <select name="filiere" value={formData.filiere} onChange={handleFormChange} required className={formElementClasses}>
                    <option value="">Sélectionner une filière</option>
                    {filieres.map(filiere => <option key={filiere} value={filiere}>{filiere}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Année*</label>
                  <select name="annee" value={formData.annee} onChange={handleFormChange} required className={formElementClasses}>
                    <option value="">Sélectionner une année</option>
                    {annees.map(annee => <option key={annee} value={annee}>{annee}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Professeur*</label>
                  <input type="text" name="professeur" value={formData.professeur} onChange={handleFormChange} required placeholder="Dr. Nom du professeur" className={formElementClasses}/>
                </div>
                <div>
                  <label className={labelClass}>Description (optionnelle)</label>
                  <textarea name="description" value={formData.description} onChange={handleFormChange} rows={3} placeholder="Description du sujet..." className={formElementClasses}/>
                </div>
                
                <div>
                  <label className={labelClass}>Fichier du sujet{isEditing ? ' (Optionnel pour changer)' : '*'}</label>
                  <div className="flex items-center justify-center w-full">
                    <label className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer ${
                      isDarkMode 
                        ? 'border-gray-600 hover:border-gray-500 bg-gray-700 hover:bg-gray-800' 
                        : 'border-gray-300 hover:border-gray-200 bg-gray-50 hover:bg-gray-100'
                    }`}>
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {selectedFile ? (
                          <>
                            <FileText className="w-10 h-10 mb-3 text-gray-400" />
                            <p className={`mb-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}><span className="font-semibold">{selectedFile.name}</span></p>
                            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                          </>
                        ) : formData.fichier && isEditing && typeof formData.fichier === 'string' ? ( // Affiche le nom du fichier existant en mode édition
                           <>
                            <FileText className="w-10 h-10 mb-3 text-gray-400" />
                            <p className={`mb-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}><span className="font-semibold">{formData.fichier}</span></p>
                            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Fichier existant. Uploadez pour remplacer.</p>
                          </>
                        ) : (
                          <>
                            <Upload className="w-10 h-10 mb-3 text-gray-400" />
                            <p className={`mb-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}><span className="font-semibold">Cliquez pour uploader</span> ou glissez-déposez</p>
                            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>PDF, DOCX, etc. (MAX. 10MB)</p>
                          </>
                        )}
                      </div>
                      <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} required={!isEditing && !formData.fichier}/>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); setShowEditModal(false); setIsEditing(false);}}
                  className={`px-4 py-2 rounded-md ${
                    isDarkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                  }`}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                >
                  {isEditing ? <Save className="inline mr-2" size={18}/> : <Plus className="inline mr-2" size={18}/>}
                  {isEditing ? 'Enregistrer' : 'Ajouter'}
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