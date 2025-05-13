import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Pencil, Trash2, Plus, Loader2, Search, RefreshCw, Download, Filter, ChevronLeft, ChevronRight, X, FileText, FileSpreadsheet } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';

const niveaux = ["L1", "L2", "L3", "M1", "M2"];
const filieres = ["Informatique", "Droit", "Mathématiques", "Physique", "Chimie"];
const ITEMS_PER_PAGE = 5; // Nombre d'étudiants par page

const AjoutMat = () => {
  const { isDarkMode } = useOutletContext();

  const [etudiants, setEtudiants] = useState([]);
  const [form, setForm] = useState({
    id: null,
    matricule: '',
    nom: '',
    email: '',
    etablissement: '',
    niveau: '',
    filiere: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterNiveau, setFilterNiveau] = useState('');
  const [filterFiliere, setFilterFiliere] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);

  // État pour la pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Simuler le chargement des données
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockData = [
        { id: 1, matricule: 'MAT001', nom: 'Jean Dupont', email: 'jean.dupont@example.com', etablissement: 'Université Paris 1', niveau: 'L3', filiere: 'Informatique' },
        { id: 2, matricule: 'MAT002', nom: 'Marie Martin', email: 'marie.martin@example.com', etablissement: 'Université Lyon 2', niveau: 'M1', filiere: 'Droit' },
        { id: 3, matricule: 'MAT003', nom: 'Pierre Durand', email: 'pierre.durand@example.com', etablissement: 'École Polytechnique', niveau: 'L2', filiere: 'Physique' },
        { id: 4, matricule: 'MAT004', nom: 'Sophie Leroy', email: 'sophie.leroy@example.com', etablissement: 'HEC Paris', niveau: 'M2', filiere: 'Informatique' },
        { id: 5, matricule: 'MAT005', nom: 'Lucas Bernard', email: 'lucas.bernard@example.com', etablissement: 'Université Bordeaux', niveau: 'L1', filiere: 'Chimie' },
        { id: 6, matricule: 'MAT006', nom: 'Camille Petit', email: 'camille.petit@example.com', etablissement: 'Sciences Po', niveau: 'M1', filiere: 'Droit' },
        { id: 7, matricule: 'MAT007', nom: 'Antoine Moreau', email: 'antoine.moreau@example.com', etablissement: 'Université de Lille', niveau: 'L3', filiere: 'Mathématiques' },
        { id: 8, matricule: 'MAT008', nom: 'Juliette Girard', email: 'juliette.girard@example.com', etablissement: 'Université de Strasbourg', niveau: 'L2', filiere: 'Informatique' },
        { id: 9, matricule: 'MAT009', nom: 'Thomas Roussel', email: 'thomas.roussel@example.com', etablissement: 'Université de Nantes', niveau: 'M2', filiere: 'Physique' },
        { id: 10, matricule: 'MAT010', nom: 'Manon Lefevre', email: 'manon.lefevre@example.com', etablissement: 'Université de Rennes', niveau: 'L1', filiere: 'Droit' },
      ];
      setEtudiants(mockData);
      setLoading(false);
    };
    loadData();
  }, []);

  // Filtrer les étudiants
  const filteredEtudiants = useMemo(() => {
    let result = [...etudiants];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(et =>
        et.matricule.toLowerCase().includes(term) ||
        et.nom.toLowerCase().includes(term) ||
        et.email.toLowerCase().includes(term)
      );
    }
    if (filterNiveau) {
      result = result.filter(et => et.niveau === filterNiveau);
    }
    if (filterFiliere) {
      result = result.filter(et => et.filiere === filterFiliere);
    }
    return result;
  }, [etudiants, searchTerm, filterNiveau, filterFiliere]);

  // Appliquer la pagination
  const paginatedEtudiants = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredEtudiants.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredEtudiants, currentPage]);

  const pageCount = Math.ceil(filteredEtudiants.length / ITEMS_PER_PAGE);

  // Réinitialiser la page actuelle lorsque les filtres changent
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterNiveau, filterFiliere]);

  const validateForm = () => {
    const newErrors = {};
    if (!form.matricule) newErrors.matricule = "Le matricule est requis";
    if (!form.nom) newErrors.nom = "Le nom est requis";
    if (!form.email) newErrors.email = "L'email est requis";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Format d'email invalide";
    if (!form.niveau) newErrors.niveau = "Le niveau est requis";
    if (!form.filiere) newErrors.filiere = "La filière est requise";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const resetForm = () => {
    setForm({
      id: null,
      matricule: '',
      nom: '',
      email: '',
      etablissement: '',
      niveau: '',
      filiere: ''
    });
    setEditMode(false);
    setErrors({});
    setShowModal(false);
  };

  const openAddModal = () => {
    resetForm();
    setEditMode(false);
    setShowModal(true);
  };

  const handleAdd = async () => {
    if (!validateForm()) return;
    setSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const newEtudiant = {
        ...form,
        id: Date.now()
      };
      setEtudiants(prev => [newEtudiant, ...prev]); // Ajoute en haut pour visibilité
      resetForm();
      setShowModal(false);
    } catch (error) {
      console.error("Erreur lors de l'ajout:", error);
      // Afficher une notification d'erreur à l'utilisateur ici
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (etudiant) => {
    setForm(etudiant);
    setEditMode(true);
    setErrors({});
    setShowModal(true);
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;
    setSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setEtudiants(prev =>
        prev.map(et => (et.id === form.id ? form : et))
      );
      resetForm();
      setShowModal(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      // Afficher une notification d'erreur à l'utilisateur ici
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet étudiant ?")) {
      await new Promise(resolve => setTimeout(resolve, 600)); // Simule délai API
      setEtudiants(prev => prev.filter(et => et.id !== id));
    }
  };

  const handleRefresh = useCallback(async () => {
    setLoading(true);
    setSearchTerm('');
    setFilterNiveau('');
    setFilterFiliere('');
    setCurrentPage(1);
    // Simulate refetching initial data or just reset view if mock data isn't reloaded
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
     const mockData = [ // Resetting to original mock data as an example
        { id: 1, matricule: 'MAT001', nom: 'Jean Dupont', email: 'jean.dupont@example.com', etablissement: 'Université Paris 1', niveau: 'L3', filiere: 'Informatique' },
        { id: 2, matricule: 'MAT002', nom: 'Marie Martin', email: 'marie.martin@example.com', etablissement: 'Université Lyon 2', niveau: 'M1', filiere: 'Droit' },
        { id: 3, matricule: 'MAT003', nom: 'Pierre Durand', email: 'pierre.durand@example.com', etablissement: 'École Polytechnique', niveau: 'L2', filiere: 'Physique' },
        { id: 4, matricule: 'MAT004', nom: 'Sophie Leroy', email: 'sophie.leroy@example.com', etablissement: 'HEC Paris', niveau: 'M2', filiere: 'Informatique' },
        { id: 5, matricule: 'MAT005', nom: 'Lucas Bernard', email: 'lucas.bernard@example.com', etablissement: 'Université Bordeaux', niveau: 'L1', filiere: 'Chimie' },
        { id: 6, matricule: 'MAT006', nom: 'Camille Petit', email: 'camille.petit@example.com', etablissement: 'Sciences Po', niveau: 'M1', filiere: 'Droit' },
        { id: 7, matricule: 'MAT007', nom: 'Antoine Moreau', email: 'antoine.moreau@example.com', etablissement: 'Université de Lille', niveau: 'L3', filiere: 'Mathématiques' },
        { id: 8, matricule: 'MAT008', nom: 'Juliette Girard', email: 'juliette.girard@example.com', etablissement: 'Université de Strasbourg', niveau: 'L2', filiere: 'Informatique' },
        { id: 9, matricule: 'MAT009', nom: 'Thomas Roussel', email: 'thomas.roussel@example.com', etablissement: 'Université de Nantes', niveau: 'M2', filiere: 'Physique' },
        { id: 10, matricule: 'MAT010', nom: 'Manon Lefevre', email: 'manon.lefevre@example.com', etablissement: 'Université de Rennes', niveau: 'L1', filiere: 'Droit' },
      ];
      setEtudiants(mockData);
    setLoading(false);
  }, []);

  const exportToCSV = () => {
    // Fonction simple d'export en CSV (simulation)
    const csvHeader = "Matricule,Nom,Email,Etablissement,Niveau,Filiere\n";
    const csvRows = filteredEtudiants.map(et =>
      `${et.matricule},"${et.nom.replace(/"/g, '""')}","${et.email.replace(/"/g, '""')}","${(et.etablissement || '').replace(/"/g, '""')}",${et.niveau || ''},${et.filiere || ''}`
    ).join("\n");
    const csvContent = csvHeader + csvRows;
    const blob = new Blob([`\uFEFF${csvContent}`], { type: 'text/csv;charset=utf-8;' }); // Added BOM for Excel
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "etudiants.csv");
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
    setShowExportOptions(false);
  };

  const exportToPDF = () => {
    // Simulation d'export en PDF (en production, utiliser jsPDF ou une API)
    alert("Export en PDF - Cette fonctionnalité nécessite une bibliothèque comme jsPDF ou une API dédiée");
    setShowExportOptions(false);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pageCount) {
      setCurrentPage(newPage);
      window.scrollTo({ top: document.getElementById('student-table-section')?.offsetTop || 0, behavior: 'smooth' });
    }
  };

  // Styles communs pour les inputs et selects
  const inputBaseClass = `w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500`;
  const inputDarkClass = `bg-gray-700 border-gray-600 text-white placeholder-gray-400`;
  const inputLightClass = `bg-white border-gray-300 text-gray-900 placeholder-gray-500`;
  const errorBorderClass = `border-red-500 focus:ring-red-500 focus:border-red-500`;

  const getInputClass = (hasError = false) => {
    return `${inputBaseClass} ${isDarkMode ? inputDarkClass : inputLightClass} ${hasError ? errorBorderClass : (isDarkMode ? 'border-gray-600' : 'border-gray-300')}`;
  };

  // Style du modal
  const modalOverlayClass = `fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${showModal ? '' : 'hidden'}`;
  const modalContentClass = `relative w-full max-w-2xl p-6 rounded-lg shadow-xl ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-black text-white' : 'bg-white text-gray-800'}`;

  // Style du menu d'export
  const exportMenuClass = `absolute right-0 top-full mt-1 w-48 rounded-md shadow-lg ${isDarkMode ? 'bg-gray-700' : 'bg-white'} ring-1 ring-black ring-opacity-5 z-10 ${showExportOptions ? '' : 'hidden'}`;

  return (
      <div className={`max-w-6xl mx-auto ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-black' : 'bg-white'} p-4 sm:p-6 rounded-lg shadow-xl`}>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center sm:text-left">Gestion des Étudiants</h2>

        {/* Modal pour ajouter/modifier un étudiant */}
        <div className={modalOverlayClass}>
          <div className={modalContentClass}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{editMode ? 'Modifier un étudiant' : 'Ajouter un nouvel étudiant'}</h3>
              <button onClick={resetForm} className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="matricule" className="block text-sm font-medium mb-1">Matricule*</label>
                <input id="matricule" type="text" name="matricule" placeholder="ex: MAT123" value={form.matricule} onChange={handleChange} disabled={submitting} className={getInputClass(!!errors.matricule)} />
                {errors.matricule && <p className="mt-1 text-xs text-red-500">{errors.matricule}</p>}
              </div>
              <div>
                <label htmlFor="nom" className="block text-sm font-medium mb-1">Nom complet*</label>
                <input id="nom" type="text" name="nom" placeholder="Prénom et nom" value={form.nom} onChange={handleChange} disabled={submitting} className={getInputClass(!!errors.nom)} />
                {errors.nom && <p className="mt-1 text-xs text-red-500">{errors.nom}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email*</label>
                <input id="email" type="email" name="email" placeholder="exemple@email.com" value={form.email} onChange={handleChange} disabled={submitting} className={getInputClass(!!errors.email)} />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="etablissement" className="block text-sm font-medium mb-1">Établissement</label>
                <input id="etablissement" type="text" name="etablissement" placeholder="Nom de l'établissement" value={form.etablissement} onChange={handleChange} disabled={submitting} className={getInputClass()} />
              </div>
              <div>
                <label htmlFor="niveau" className="block text-sm font-medium mb-1">Niveau*</label>
                <select id="niveau" name="niveau" value={form.niveau} onChange={handleChange} disabled={submitting} className={getInputClass(!!errors.niveau)}>
                  <option value="">Sélectionnez un niveau</option>
                  {niveaux.map(niv => (<option key={niv} value={niv} className={isDarkMode ? 'bg-gray-600 text-white' : 'bg-white text-black'}>{niv}</option>))}
                </select>
                {errors.niveau && <p className="mt-1 text-xs text-red-500">{errors.niveau}</p>}
              </div>
              <div>
                <label htmlFor="filiere" className="block text-sm font-medium mb-1">Filière*</label>
                <select id="filiere" name="filiere" value={form.filiere} onChange={handleChange} disabled={submitting} className={getInputClass(!!errors.filiere)}>
                  <option value="">Sélectionnez une filière</option>
                  {filieres.map(fil => (<option key={fil} value={fil} className={isDarkMode ? 'bg-gray-600 text-white' : 'bg-white text-black'}>{fil}</option>))}
                </select>
                {errors.filiere && <p className="mt-1 text-xs text-red-500">{errors.filiere}</p>}
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={resetForm} disabled={submitting} className={`px-4 py-2.5 rounded-md transition-colors duration-150 ease-in-out ${isDarkMode ? 'bg-gray-600 text-gray-200 hover:bg-gray-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                Annuler
              </button>
              <button onClick={editMode ? handleUpdate : handleAdd} disabled={submitting} className={`flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-150 ease-in-out ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
                {submitting ? <Loader2 size={18} className="animate-spin" /> : (editMode ? <Pencil size={18} /> : <Plus size={18} />)}
                {editMode ? 'Mettre à jour' : 'Ajouter étudiant'}
              </button>
            </div>
          </div>
        </div>

        {/* Bouton pour ajouter un étudiant */}
        <div className="mb-6">
          <button onClick={openAddModal} className="px-4 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus size={18} />
            Ajouter un étudiant
          </button>
        </div>

        {/* Filtres et barre de recherche */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6" id="student-table-section">
          <div className="relative w-full sm:max-w-xs">
            <input type="text" placeholder="Rechercher (matricule, nom, email)..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={`${getInputClass()} pl-10`} />
            <Search size={18} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          </div>
          <select value={filterNiveau} onChange={(e) => setFilterNiveau(e.target.value)} className={`${getInputClass()} text-sm sm:text-base`}>
            <option value="">Tous niveaux</option>
            {niveaux.map(niv => (<option key={niv} value={niv} className={isDarkMode ? 'bg-gray-700 text-white' : ''}>{niv}</option>))}
          </select>
          <select value={filterFiliere} onChange={(e) => setFilterFiliere(e.target.value)} className={`${getInputClass()} text-sm sm:text-base`}>
            <option value="">Toutes filières</option>
            {filieres.map(fil => (<option key={fil} value={fil} className={isDarkMode ? 'bg-gray-700 text-white' : ''}>{fil}</option>))}
          </select>
          <button onClick={handleRefresh} className={`p-2.5 rounded-md ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`} title="Réinitialiser filtres et données">
            <RefreshCw size={18} />
          </button>
          
          {/* Menu déroulant pour l'export */}
          <div className="relative">
            <button 
              onClick={() => setShowExportOptions(!showExportOptions)} 
              className={`p-2.5 rounded-md ${isDarkMode ? 'bg-green-700 hover:bg-green-600' : 'bg-green-500 hover:bg-green-600'} text-white transition-colors flex items-center gap-2`} 
              title="Exporter les données"
            >
              <Download size={18} />
              <span className="hidden sm:inline">Exporter</span>
            </button>
            
            <div className={exportMenuClass}>
              <div className="py-1">
                <button 
                  onClick={exportToCSV} 
                  className={`block w-full text-left px-4 py-2 text-sm ${isDarkMode ? 'hover:bg-gray-600 text-gray-200' : 'hover:bg-gray-100 text-gray-700'} flex items-center gap-2`}
                >
                  <FileSpreadsheet size={16} /> Exporter en CSV
                </button>
                <button 
                  onClick={exportToPDF} 
                  className={`block w-full text-left px-4 py-2 text-sm ${isDarkMode ? 'hover:bg-gray-600 text-gray-200' : 'hover:bg-gray-100 text-gray-700'} flex items-center gap-2`}
                >
                  <FileText size={16} /> Exporter en PDF
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tableau */}
      <div className={`overflow-x-auto flex-grow ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-black' : 'bg-white'} rounded-lg shadow-sm`}>
          <table className={`min-w-full divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
            <thead className={isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}>
              <tr>
                {['Matricule', 'Nom', 'Email', 'Établissement', 'Niveau', 'Filière'].map(header => (
                  <th key={header} className="px-4 py-3 text-left font-medium uppercase tracking-wider">{header}</th>
                ))}
                <th className="px-4 py-3 text-center font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className={`${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-black' : 'bg-white'} divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {loading ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>
                  </td>
                </tr>
              ) : paginatedEtudiants.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <Filter className={`h-10 w-10 mb-2 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                      <p className={`mt-2 text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {searchTerm || filterNiveau || filterFiliere ? "Aucun étudiant ne correspond à vos critères." : "Aucun étudiant enregistré pour le moment."}
                      </p>
                      {!editMode && !(searchTerm || filterNiveau || filterFiliere) && (
                        <button onClick={openAddModal} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                          Ajouter un étudiant
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedEtudiants.map(etudiant => (
                  <tr key={etudiant.id} className={`transition-colors duration-150 ${isDarkMode ? 'hover:bg-gray-700/[0.5]' : 'hover:bg-gray-50'}`}>
                    <td className="px-4 py-3 whitespace-nowrap">{etudiant.matricule}</td>
                    <td className="px-4 py-3 whitespace-nowrap font-medium">{etudiant.nom}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{etudiant.email}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{etudiant.etablissement || <span className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>N/A</span>}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{etudiant.niveau || <span className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>N/A</span>}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{etudiant.filiere || <span className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>N/A</span>}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2 sm:gap-3">
                        <button onClick={() => handleEdit(etudiant)} className={`p-1.5 rounded-full transition-colors ${isDarkMode ? 'text-blue-400 hover:bg-blue-600 hover:text-white' : 'text-blue-500 hover:bg-blue-100'}`} title="Modifier">
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => handleDelete(etudiant.id)} className={`p-1.5 rounded-full transition-colors ${isDarkMode ? 'text-red-400 hover:bg-red-600 hover:text-white' : 'text-red-500 hover:bg-red-100'}`} title="Supprimer">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Contrôles de Pagination et Informations */}
        {!loading && filteredEtudiants.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-sm">
            <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-3 sm:mb-0`}>
              Affichage de <span className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{paginatedEtudiants.length}</span> sur
              <span className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}> {filteredEtudiants.length}</span> étudiant{filteredEtudiants.length !== 1 ? 's' : ''}
              {(filteredEtudiants.length !== etudiants.length) && ` (sur ${etudiants.length} au total)`}
            </div>
            {pageCount > 1 && (
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1.5 border rounded-md flex items-center transition-colors text-xs sm:text-sm
                    ${currentPage === 1 ? (isDarkMode ? 'border-gray-700 text-gray-600 cursor-not-allowed' : 'border-gray-300 text-gray-400 cursor-not-allowed')
                      : (isDarkMode ? 'border-gray-600 hover:bg-gray-700 text-gray-300' : 'border-gray-300 hover:bg-gray-100 text-gray-700')}`}
                >
                  <ChevronLeft size={16} className="mr-1" /> Préc.
                </button>
                <span className={`px-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Page {currentPage} / {pageCount}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === pageCount}
                  className={`px-3 py-1.5 border rounded-md flex items-center transition-colors text-xs sm:text-sm
                    ${currentPage === pageCount ? (isDarkMode ? 'border-gray-700 text-gray-600 cursor-not-allowed' : 'border-gray-300 text-gray-400 cursor-not-allowed')
                    : (isDarkMode ? 'border-gray-600 hover:bg-gray-700 text-gray-300' : 'border-gray-300 hover:bg-gray-100 text-gray-700')}`}
                >
                  Suiv. <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
   
  );
};

export default AjoutMat;