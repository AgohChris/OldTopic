import { useState, useEffect } from 'react';
import { 
  FileText, DownloadCloud, Clock, BookOpen, ChevronLeft, ChevronRight, 
  GraduationCap, Search, Filter, Grid, List, X, FileDown, Users, Eye
} from 'lucide-react';

const Historique = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' ou 'list'
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    type: null,
    faculty: null,
    level: null,
    date: null,
    subject: null
  });
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = viewMode === 'grid' ? 6 : 8;

  // Données fictives pour la démo
  const historyItems = [
    {
      id: 1,
      title: 'Examen Final - Mathématiques Avancées avec des concepts très complexes et des applications poussées',
      subject: 'Mathématiques',
      year: '2023',
      faculty: 'IGL',
      type: 'Examen',
      size: '2.4 MB',
      level: 'Master 2',
      viewCount: 14,
      lastViewed: '25/04/2025',
      date: '15/12/2023',
      author: 'Prof. Dupont',
      description: 'Ce document contient l\'examen final du cours de Mathématiques Avancées. Il couvre les concepts de calcul différentiel, d\'analyse vectorielle et de topologie.',
      accessType: 'Téléchargé'
    },
    {
      id: 2,
      title: 'Examen Final - Mathématiques Avancées avec des concepts très complexes et des applications poussées',
      subject: 'Mathématiques',
      year: '2023',
      faculty: 'IGL',
      type: 'Examen',
      size: '2.4 MB',
      level: 'Master 2',
      viewCount: 14,
      lastViewed: '25/04/2025',
      date: '15/12/2023',
      author: 'Prof. Dupont',
      description: 'Ce document contient l\'examen final du cours de Mathématiques Avancées. Il couvre les concepts de calcul différentiel, d\'analyse vectorielle et de topologie.',
      accessType: 'Téléchargé'
    },
    {
      id: 3,
      title: 'Examen Final - Mathématiques Avancées avec des concepts très complexes et des applications poussées',
      subject: 'Mathématiques',
      year: '2023',
      faculty: 'IGL',
      type: 'Examen',
      size: '2.4 MB',
      level: 'Master 2',
      viewCount: 14,
      lastViewed: '25/04/2025',
      date: '15/12/2023',
      author: 'Prof. Dupont',
      description: 'Ce document contient l\'examen final du cours de Mathématiques Avancées. Il couvre les concepts de calcul différentiel, d\'analyse vectorielle et de topologie.',
      accessType: 'Téléchargé'
    },
    {
      id: 4,
      title: 'Examen Final - Mathématiques Avancées avec des concepts très complexes et des applications poussées',
      subject: 'Mathématiques',
      year: '2023',
      faculty: 'IGL',
      type: 'Examen',
      size: '2.4 MB',
      level: 'Master 2',
      viewCount: 14,
      lastViewed: '25/04/2025',
      date: '15/12/2023',
      author: 'Prof. Dupont',
      description: 'Ce document contient l\'examen final du cours de Mathématiques Avancées. Il couvre les concepts de calcul différentiel, d\'analyse vectorielle et de topologie.',
      accessType: 'Téléchargé'
    },
    {
      id: 5,
      title: 'Examen Final - Mathématiques Avancées avec des concepts très complexes et des applications poussées',
      subject: 'Mathématiques',
      year: '2023',
      faculty: 'IGL',
      type: 'Examen',
      size: '2.4 MB',
      level: 'Master 2',
      viewCount: 14,
      lastViewed: '25/04/2025',
      date: '15/12/2023',
      author: 'Prof. Dupont',
      description: 'Ce document contient l\'examen final du cours de Mathématiques Avancées. Il couvre les concepts de calcul différentiel, d\'analyse vectorielle et de topologie.',
      accessType: 'Téléchargé'
    },
    {
      id: 6,
      title: 'Examen Final - Mathématiques Avancées avec des concepts très complexes et des applications poussées',
      subject: 'Mathématiques',
      year: '2023',
      faculty: 'IGL',
      type: 'Examen',
      size: '2.4 MB',
      level: 'Master 2',
      viewCount: 14,
      lastViewed: '25/04/2025',
      date: '15/12/2023',
      author: 'Prof. Dupont',
      description: 'Ce document contient l\'examen final du cours de Mathématiques Avancées. Il couvre les concepts de calcul différentiel, d\'analyse vectorielle et de topologie.',
      accessType: 'Téléchargé'
    },
    {
      id: 7,
      title: 'Examen Final - Mathématiques Avancées avec des concepts très complexes et des applications poussées',
      subject: 'Mathématiques',
      year: '2023',
      faculty: 'IGL',
      type: 'Examen',
      size: '2.4 MB',
      level: 'Master 2',
      viewCount: 14,
      lastViewed: '25/04/2025',
      date: '15/12/2023',
      author: 'Prof. Dupont',
      description: 'Ce document contient l\'examen final du cours de Mathématiques Avancées. Il couvre les concepts de calcul différentiel, d\'analyse vectorielle et de topologie.',
      accessType: 'Téléchargé'
    },
    {
      id: 8,
      title: 'Examen Final - Mathématiques Avancées avec des concepts très complexes et des applications poussées',
      subject: 'Mathématiques',
      year: '2023',
      faculty: 'IGL',
      type: 'Examen',
      size: '2.4 MB',
      level: 'Master 2',
      viewCount: 14,
      lastViewed: '25/04/2025',
      date: '15/12/2023',
      author: 'Prof. Dupont',
      description: 'Ce document contient l\'examen final du cours de Mathématiques Avancées. Il couvre les concepts de calcul différentiel, d\'analyse vectorielle et de topologie.',
      accessType: 'Téléchargé'
    },
    {
      id: 9,
      title: 'Examen Final - Mathématiques Avancées avec des concepts très complexes et des applications poussées',
      subject: 'Mathématiques',
      year: '2023',
      faculty: 'IGL',
      type: 'Examen',
      size: '2.4 MB',
      level: 'Master 2',
      viewCount: 14,
      lastViewed: '25/04/2025',
      date: '15/12/2023',
      author: 'Prof. Dupont',
      description: 'Ce document contient l\'examen final du cours de Mathématiques Avancées. Il couvre les concepts de calcul différentiel, d\'analyse vectorielle et de topologie.',
      accessType: 'Téléchargé'
    },
    {
      id: 10,
      title: 'Examen Final - Mathématiques Avancées avec des concepts très complexes et des applications poussées',
      subject: 'Mathématiques',
      year: '2023',
      faculty: 'IGL',
      type: 'Examen',
      size: '2.4 MB',
      level: 'Master 2',
      viewCount: 14,
      lastViewed: '25/04/2025',
      date: '15/12/2023',
      author: 'Prof. Dupont',
      description: 'Ce document contient l\'examen final du cours de Mathématiques Avancées. Il couvre les concepts de calcul différentiel, d\'analyse vectorielle et de topologie.',
      accessType: 'Téléchargé'
    },
    {
      id: 11,
      title: 'Examen Final - Mathématiques Avancées avec des concepts très complexes et des applications poussées',
      subject: 'Mathématiques',
      year: '2023',
      faculty: 'IGL',
      type: 'Examen',
      size: '2.4 MB',
      level: 'Master 2',
      viewCount: 14,
      lastViewed: '25/04/2025',
      date: '15/12/2023',
      author: 'Prof. Dupont',
      description: 'Ce document contient l\'examen final du cours de Mathématiques Avancées. Il couvre les concepts de calcul différentiel, d\'analyse vectorielle et de topologie.',
      accessType: 'Téléchargé'
    },
    {
      id: 12,
      title: 'Examen Final - Mathématiques Avancées avec des concepts très complexes et des applications poussées',
      subject: 'Mathématiques',
      year: '2023',
      faculty: 'IGL',
      type: 'Examen',
      size: '2.4 MB',
      level: 'Master 2',
      viewCount: 14,
      lastViewed: '25/04/2025',
      date: '15/12/2023',
      author: 'Prof. Dupont',
      description: 'Ce document contient l\'examen final du cours de Mathématiques Avancées. Il couvre les concepts de calcul différentiel, d\'analyse vectorielle et de topologie.',
      accessType: 'Téléchargé'
    },
    {
      id: 14,
      title: 'Examen Final - Mathématiques Avancées avec des concepts très complexes et des applications poussées',
      subject: 'Mathématiques',
      year: '2023',
      faculty: 'IGL',
      type: 'Examen',
      size: '2.4 MB',
      level: 'Master 2',
      viewCount: 14,
      lastViewed: '25/04/2025',
      date: '15/12/2023',
      author: 'Prof. Dupont',
      description: 'Ce document contient l\'examen final du cours de Mathématiques Avancées. Il couvre les concepts de calcul différentiel, d\'analyse vectorielle et de topologie.',
      accessType: 'Téléchargé'
    },
  ];

  // Extraction des options de filtrage uniques
  const filterOptions = {
    type: [...new Set(historyItems.map(d => d.type))],
    faculty: [...new Set(historyItems.map(d => d.faculty))],
    level: [...new Set(historyItems.map(d => d.level))],
    date: [...new Set(historyItems.map(d => d.date))],
    subject: [...new Set(historyItems.map(d => d.subject))]
  };

  // Filtre les historiques en fonction de la recherche et des filtres actifs
  const filteredHistory = historyItems.filter(doc => {
    // Recherche textuelle
    const matchesSearch = searchTerm === '' || 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtres appliqués
    const matchesType = !activeFilters.type || doc.type === activeFilters.type;
    const matchesFaculty = !activeFilters.faculty || doc.faculty === activeFilters.faculty;
    const matchesLevel = !activeFilters.level || doc.level === activeFilters.level;
    const matchesDate = !activeFilters.date || doc.date === activeFilters.date;
    const matchesSubject = !activeFilters.subject || doc.subject === activeFilters.subject;
    
    return matchesSearch && matchesType && matchesFaculty && matchesLevel && matchesDate && matchesSubject;
  });

  // Pagination
  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredHistory.slice(startIndex, startIndex + itemsPerPage);

  // Réinitialiser la page quand les filtres ou la recherche changent
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeFilters, viewMode]);

  // Simulation de chargement
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Badge pour le type de document
  const TypeBadge = ({ type }) => {
    const colors = {
      'Examen': 'bg-red-500/20 text-red-400',
      'Travaux Dirigés': 'bg-blue-500/20 text-blue-400',
      'Correction': 'bg-green-500/20 text-green-400',
      'Cours': 'bg-purple-500/20 text-purple-400',
      'Travaux Pratiques': 'bg-yellow-500/20 text-yellow-400'
    };
    
    return (
      <span className={`text-xs px-2 py-1 rounded-full ${colors[type] || 'bg-gray-500/20 text-gray-400'}`}>
        {type}
      </span>
    );
  };

  // Badge pour le type d'accès
  const AccessBadge = ({ accessType }) => {
    const colors = {
      'Téléchargé': 'bg-green-500/20 text-green-400',
      'Consulté': 'bg-blue-500/20 text-blue-400',
      'Favoris': 'bg-yellow-500/20 text-yellow-400'
    };
    
    return (
      <span className={`text-xs px-2 py-1 rounded-full ${colors[accessType] || 'bg-gray-500/20 text-gray-400'}`}>
        {accessType}
      </span>
    );
  };

  // Rendu du mode de chargement
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-xl text-white">Chargement de l'historique...</p>
        </div>
      </div>
    );
  }

  // Vue détaillée d'un document
  const DocumentDetail = () => {
    if (!selectedDocument) return null;
    
    const doc = selectedDocument;
    
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          {/* Header avec bouton de fermeture */}
          <div className="flex justify-between items-center p-6 border-b border-gray-700">
            <h3 className="text-2xl font-bold text-white">{doc.title}</h3>
            <button 
              onClick={() => setSelectedDocument(null)}
              className="p-2 rounded-full hover:bg-gray-700 transition-colors"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>
          
          {/* Contenu */}
          <div className="p-6">
            {/* Métadonnées principales */}
            <div className="flex flex-wrap gap-4 mb-6">
              <TypeBadge type={doc.type} />
              <AccessBadge accessType={doc.accessType} />
              <div className="flex items-center text-gray-300">
                <BookOpen className="w-4 h-4 mr-2 text-teal-400" />
                {doc.faculty} • {doc.subject}
              </div>
              <div className="flex items-center text-gray-300">
                <GraduationCap className="w-4 h-4 mr-2 text-teal-400" />
                {doc.level}
              </div>
              <div className="flex items-center text-gray-300">
                <Clock className="w-4 h-4 mr-2 text-teal-400" />
                Consulté le: {doc.lastViewed}
              </div>
            </div>
            
            {/* Description */}
            <div className="bg-gray-700/30 rounded-lg p-4 mb-6">
              <h4 className="text-lg font-medium text-white mb-2">Description</h4>
              <p className="text-gray-300">{doc.description}</p>
            </div>
            
            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-700/20 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Consultations</span>
                  <Eye className="w-5 h-5 text-teal-400" />
                </div>
                <p className="text-2xl font-bold text-white">{doc.viewCount}</p>
              </div>
              
              <div className="bg-gray-700/20 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Date du document</span>
                  <Clock className="w-5 h-5 text-teal-400" />
                </div>
                <p className="text-xl font-bold text-white">{doc.date}</p>
              </div>
              
              <div className="bg-gray-700/20 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Auteur</span>
                  <Users className="w-5 h-5 text-teal-400" />
                </div>
                <p className="text-lg font-medium text-white">{doc.author}</p>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex justify-between items-center">
              <div>
                <span className="text-sm text-gray-400">{doc.size}</span>
              </div>
              <div className="flex gap-3">
                <button className="px-5 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-500 transition-colors flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  Visualiser
                </button>
                <button className="px-5 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-500 transition-colors flex items-center">
                  <DownloadCloud className="w-5 h-5 mr-2" />
                  Télécharger
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-30 px-4 sm:px-6 lg:px-8">
      {/* Fond animé subtil */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute inset-0 bg-gradient-radial from-teal-500/10 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* En-tête avec titre et statistiques */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-4">
            Historique des Documents
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-6">
            Retrouvez tous les documents que vous avez consultés ou téléchargés
          </p>
          
          {/* Statistiques générales */}
          <div className="inline-flex bg-white/5 backdrop-blur-sm rounded-xl p-1 border border-white/10">
            <div className="px-4 py-2 border-r border-white/10">
              <span className="text-sm text-gray-400">Documents consultés</span>
              <p className="text-xl font-bold text-white">{historyItems.length}</p>
            </div>
            <div className="px-4 py-2 border-r border-white/10">
              <span className="text-sm text-gray-400">Téléchargements</span>
              <p className="text-xl font-bold text-white">{historyItems.filter(item => item.accessType === 'Téléchargé').length}</p>
            </div>
            <div className="px-4 py-2">
              <span className="text-sm text-gray-400">Dernière activité</span>
              <p className="text-xl font-bold text-white">05/05/25</p>
            </div>
          </div>
        </div>
        
        {/* Barre de recherche et filtres */}
        <div className="mb-8 flex flex-col lg:flex-row gap-4 items-center">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher dans l'historique..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-800/50 border border-gray-700 w-full pl-12 pr-4 py-3 rounded-xl text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-3 items-center">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center px-4 py-3 rounded-xl ${showFilters ? 'bg-teal-600 text-white' : 'bg-gray-800/50 border border-gray-700 text-gray-300'}`}
            >
              <Filter className="w-5 h-5 mr-2" />
              Filtres
            </button>
            
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-1 flex">
              <button 
                onClick={() => setViewMode('grid')} 
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-gray-700 text-white' : 'text-gray-400'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setViewMode('list')} 
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-gray-700 text-white' : 'text-gray-400'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Panneau de filtres */}
        {showFilters && (
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {Object.entries(filterOptions).map(([filterType, options]) => (
                <div key={filterType}>
                  <label className="block text-sm font-medium text-gray-300 mb-2 capitalize">
                    {filterType === 'faculty' ? 'Faculté' : filterType === 'level' ? 'Niveau' : filterType === 'type' ? 'Type' : filterType === 'subject' ? 'Matière' : filterType}
                  </label>
                  <select
                    value={activeFilters[filterType] || ''}
                    onChange={(e) => setActiveFilters({...activeFilters, [filterType]: e.target.value || null})}
                    className="bg-gray-700 border border-gray-600 text-white rounded-lg block w-full p-2.5"
                  >
                    <option value="">Tous</option>
                    {options.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setActiveFilters({type: null, faculty: null, level: null, date: null, subject: null})}
                className="px-4 py-2 text-gray-300 hover:text-white mr-4"
              >
                Réinitialiser
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-500"
              >
                Appliquer
              </button>
            </div>
          </div>
        )}
        
        {/* Message si aucun résultat */}
        {filteredHistory.length === 0 && (
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-12 text-center">
            <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">Aucun document dans l'historique</h3>
            <p className="text-gray-400 mb-6">Essayez de modifier vos critères de recherche ou vos filtres.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveFilters({type: null, faculty: null, level: null, date: null, subject: null});
              }}
              className="px-5 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-500"
            >
              Réinitialiser la recherche
            </button>
          </div>
        )}
        
        {/* Vue grille */}
        {viewMode === 'grid' && filteredHistory.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map((item) => (
              <div
                key={item.id}
                className="group  bg-gradient-to-br from-green-500/10 to-black/40 border border-green-500/20 rounded-3xl p-10 backdrop-blur-sm"
              >
                <div className="flex items-start mb-4">
                  <div className="bg-teal-500/10 p-3 rounded-lg mr-4 flex-shrink-0">
                    <FileText className="w-6 h-6 text-teal-400" />
                  </div>
                  <div className="min-w-0">
                    <h3 
                      className="text-lg font-semibold text-white truncate group-hover:text-teal-400 transition-colors duration-300 cursor-pointer"
                      onClick={() => setSelectedDocument(item)}
                    >
                      {item.title}
                    </h3>
                    <div className="flex items-center mt-1">
                      <TypeBadge type={item.type} />
                      <span className="ml-2 text-sm text-gray-400">{item.subject}</span>
                    </div>
                  </div>
                </div>

                {/* Métadonnées */}
                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="flex items-center text-sm text-gray-300">
                    <BookOpen className="w-4 h-4 mr-1 text-teal-400" />
                    {item.faculty}
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <Clock className="w-4 h-4 mr-1 text-teal-400" />
                    {item.lastViewed}
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <GraduationCap className="w-4 h-4 mr-1 text-teal-400" />
                    {item.level}
                  </div>
                </div>

                {/* Statistiques */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1 text-gray-400" />
                    <span className="text-sm text-gray-400">{item.viewCount} consultations</span>
                  </div>
                  <AccessBadge accessType={item.accessType} />
                </div>

                {/* Barre de séparation */}
                <div className="border-t border-white/10 my-4"></div>

                {/* Footer du document */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">{item.size}</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setSelectedDocument(item)}
                      className="flex items-center px-3 py-2 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="flex items-center px-4 py-2 bg-teal-600/20 text-teal-400 rounded-lg hover:bg-teal-500/30 transition-colors">
                      <DownloadCloud className="w-5 h-5 mr-2" />
                      <span>Télécharger</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Vue liste */}
        {viewMode === 'list' && filteredHistory.length > 0 && (
          <div className=" bg-gradient-to-br from-green-500/10 to-black/40 border border-green-500/20 rounded-3xl p-10 backdrop-blur-sm">
            <table className="w-full">
              <thead>
                <tr className="bg-green-500/10">
                  <th className="text-left py-4 px-6 text-gray-300 font-medium">Document</th>
                  <th className="text-left py-4 px-4 text-gray-300 font-medium hidden md:table-cell">Matière</th>
                  <th className="text-left py-4 px-4 text-gray-300 font-medium hidden lg:table-cell">Date consultée</th>
                  <th className="text-left py-4 px-4 text-gray-300 font-medium hidden xl:table-cell">Statut</th>
                  <th className="text-right py-4 px-6 text-gray-300 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr 
                    key={item.id} 
                    className={`border-t border-white/5 hover:bg-white/5 transition-colors ${index % 2 === 0 ? 'bg-white/[0.01]' : ''}`}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="bg-teal-500/10 p-2 rounded-lg mr-3 flex-shrink-0">
                          <FileText className="w-5 h-5 text-teal-400" />
                        </div>
                        <div>
                          <h4 
                            className="font-medium text-white hover:text-teal-400 transition-colors cursor-pointer truncate max-w-xs"
                            onClick={() => setSelectedDocument(item)}
                          >
                            {item.title}
                          </h4>
                          <div className="flex items-center mt-1">
                            <TypeBadge type={item.type} />
                            <span className="ml-2 text-xs text-gray-400">{item.date}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 hidden md:table-cell">
                      <div className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-2 text-teal-400" />
                        <span className="text-gray-300">{item.subject}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 hidden lg:table-cell">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-teal-400" />
                        <span className="text-gray-300">{item.lastViewed}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 hidden xl:table-cell">
                      <AccessBadge accessType={item.accessType} />
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end items-center space-x-2">
                        <button 
                          onClick={() => setSelectedDocument(item)}
                          className="p-2 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="flex items-center px-4 py-2 bg-teal-600/20 text-teal-400 rounded-lg hover:bg-teal-500/30 transition-colors">
                          <DownloadCloud className="w-4 h-4 mr-2" />
                          <span>Télécharger</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

                       {/* Pagination améliorée */}
                       {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2 items-center">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-300" />
            </button>

            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg ${
                    page === currentPage
                      ? 'bg-teal-500 text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  } transition-colors`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-300" />
            </button>
          </div>
        )}
        
        {/* Bannière statistiques */}
        {filteredHistory.length > 0 && (
          <div className="mt-12 mb-8 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-xl p-6 border border-teal-500/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center">
                <div className="bg-teal-500/20 p-3 rounded-full mr-4">
                  <FileText className="w-6 h-6 text-teal-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total documents consultés</p>
                  <p className="text-2xl font-bold text-white">{filteredHistory.length}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-teal-500/20 p-3 rounded-full mr-4">
                  <DownloadCloud className="w-6 h-6 text-teal-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Documents téléchargés</p>
                  <p className="text-2xl font-bold text-white">{historyItems.filter(d => d.accessType === 'Téléchargé').length}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-teal-500/20 p-3 rounded-full mr-4">
                  <Clock className="w-6 h-6 text-teal-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Dernière consultation</p>
                  <p className="text-2xl font-bold text-white">25/04/25</p>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>   
              {/* Modal détail du document */}
      {selectedDocument && <DocumentDetail />}   
    </div>
  );
};

export default Historique;