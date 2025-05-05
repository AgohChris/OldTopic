import { useState, useEffect } from 'react';
import { 
  FileText, DownloadCloud, Clock, BookOpen, ChevronLeft, ChevronRight, 
  GraduationCap, Search, Filter, Grid, List, X, FileDown, Users, Info, Eye
} from 'lucide-react';

const DownloadList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' ou 'list'
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    type: null,
    faculty: null,
    level: null,
    year: null,
    subject: null
  });
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = viewMode === 'grid' ? 6 : 8;

  // Données fictives pour la démo
  const downloads = [
    {
      id: 1,
      title: 'Examen Final - Mathématiques Avancées avec des concepts très complexes et des applications poussées',
      subject: 'Mathématiques',
      year: '2023',
      faculty: 'IGL',
      type: 'Examen',
      size: '2.4 MB',
      level: 'Master 2',
      downloads: 245,
      rating: 4.8,
      date: '15/12/2023',
      author: 'Prof. Dupont',
      description: 'Ce document contient l\'examen final du cours de Mathématiques Avancées. Il couvre les concepts de calcul différentiel, d\'analyse vectorielle et de topologie.'
    },
    {
      id: 2,
      title: 'TD - Physique Quantique : Introduction aux principes fondamentaux et aux théories relativistes',
      subject: 'Physique',
      year: '2024',
      faculty: 'RIT',
      type: 'Travaux Dirigés',
      size: '1.8 MB',
      level: 'Licence 3',
      downloads: 128,
      rating: 4.2,
      date: '22/02/2024',
      author: 'Dr. Martin',
      description: 'Une série d\'exercices pratiques sur les bases de la physique quantique, avec un focus particulier sur l\'équation de Schrödinger et le principe d\'incertitude.'
    },
    {
      id: 3,
      title: 'Correction détaillée de l\'épreuve d\'Algorithmique et Structures de Données',
      subject: 'Informatique',
      year: '2022',
      faculty: 'IGL',
      type: 'Correction',
      size: '3.1 MB',
      level: 'Licence 2',
      downloads: 356,
      rating: 4.9,
      date: '03/06/2022',
      author: 'Prof. Bertrand',
      description: 'Corrections détaillées avec explications pas à pas des problèmes algorithmiques. Inclut des analyses de complexité et des alternatives optimisées.'
    },
    {
      id: 4,
      title: 'Examen Partiel - Thermodynamique : Principes, applications et exercices résolus',
      subject: 'Physique',
      year: '2023',
      faculty: 'RIT',
      type: 'Examen',
      size: '2.1 MB',
      level: 'Licence 1',
      downloads: 187,
      rating: 4.5,
      date: '28/04/2023',
      author: 'Dr. Lefevre',
      description: 'Examen portant sur les principes fondamentaux de la thermodynamique, avec une série d\'exercices pratiques sur l\'entropie et les cycles thermodynamiques.'
    },
    {
      id: 5,
      title: 'TD - Électromagnétisme Avancé : Ondes, propagation et interactions avec la matière',
      subject: 'Physique',
      year: '2024',
      faculty: 'RIT',
      type: 'Travaux Dirigés',
      size: '2.9 MB',
      level: 'Master 1',
      downloads: 103,
      rating: 4.1,
      date: '14/01/2024',
      author: 'Prof. Klein',
      description: 'Ce TD explore les concepts avancés de l\'électromagnétisme, avec un accent particulier sur les équations de Maxwell et les applications pratiques.'
    },
    {
      id: 6,
      title: 'Correction - Programmation Orientée Objet : Concepts avancés et design patterns',
      subject: 'Informatique',
      year: '2023',
      faculty: 'IGL',
      type: 'Correction',
      size: '3.4 MB',
      level: 'Licence 3',
      downloads: 271,
      rating: 4.7,
      date: '05/11/2023',
      author: 'Dr. Moreau',
      description: 'Correction détaillée des exercices de POO, couvrant l\'héritage, le polymorphisme, et l\'implémentation de patterns de conception avancés.'
    },
    {
      id: 7,
      title: 'Examen Final - Chimie Organique : Nomenclature, réactions et mécanismes réactionnels complexes',
      subject: 'Chimie',
      year: '2022',
      faculty: 'FBA',
      type: 'Examen',
      size: '2.7 MB',
      level: 'Master 2',
      downloads: 156,
      rating: 4.4,
      date: '18/12/2022',
      author: 'Prof. Dubois',
      description: 'Examen final couvrant les mécanismes réactionnels complexes en chimie organique, avec un focus sur la synthèse organique et la stéréochimie.'
    },
    {
      id: 8,
      title: 'Cours complet - Introduction à l\'Intelligence Artificielle et au Machine Learning',
      subject: 'Informatique',
      year: '2024',
      faculty: 'IGL',
      type: 'Cours',
      size: '5.2 MB',
      level: 'Master 1',
      downloads: 423,
      rating: 4.9,
      date: '10/03/2024',
      author: 'Dr. Lambert',
      description: 'Un cours complet couvrant les fondamentaux de l\'IA, les réseaux de neurones, l\'apprentissage supervisé et non supervisé, avec des exemples pratiques.'
    },
    {
      id: 9,
      title: 'TP - Biologie Moléculaire : Techniques d\'analyse ADN et séquençage',
      subject: 'Biologie',
      year: '2023',
      faculty: 'FBA',
      type: 'Travaux Pratiques',
      size: '3.8 MB',
      level: 'Licence 3',
      downloads: 132,
      rating: 4.3,
      date: '22/09/2023',
      author: 'Prof. Blanc',
      description: 'Instructions détaillées pour les travaux pratiques de biologie moléculaire, incluant des protocoles de PCR et d\'électrophorèse.'
    },
  ];

  // Extraction des options de filtrage uniques
  const filterOptions = {
    type: [...new Set(downloads.map(d => d.type))],
    faculty: [...new Set(downloads.map(d => d.faculty))],
    level: [...new Set(downloads.map(d => d.level))],
    year: [...new Set(downloads.map(d => d.year))],
    subject: [...new Set(downloads.map(d => d.subject))]
  };

  // Filtre les téléchargements en fonction de la recherche et des filtres actifs
  const filteredDownloads = downloads.filter(doc => {
    // Recherche textuelle
    const matchesSearch = searchTerm === '' || 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtres appliqués
    const matchesType = !activeFilters.type || doc.type === activeFilters.type;
    const matchesFaculty = !activeFilters.faculty || doc.faculty === activeFilters.faculty;
    const matchesLevel = !activeFilters.level || doc.level === activeFilters.level;
    const matchesYear = !activeFilters.year || doc.year === activeFilters.year;
    const matchesSubject = !activeFilters.subject || doc.subject === activeFilters.subject;
    
    return matchesSearch && matchesType && matchesFaculty && matchesLevel && matchesYear && matchesSubject;
  });

  // Pagination
  const totalPages = Math.ceil(filteredDownloads.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredDownloads.slice(startIndex, startIndex + itemsPerPage);

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

  // Rendu du mode de chargement
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-xl text-white">Chargement de la bibliothèque...</p>
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
                {doc.date}
              </div>
            </div>
            
            {/* Description */}
            <div className="bg-gray-700/30 rounded-lg p-4 mb-6">
              <h4 className="text-lg font-medium text-white mb-2">Description</h4>
              <p className="text-gray-300">{doc.description}</p>
            </div>
            
            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-700/20 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Téléchargements</span>
                  <FileDown className="w-5 h-5 text-teal-400" />
                </div>
                <p className="text-2xl font-bold text-white">{doc.downloads}</p>
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
                <button className="px-5 py-2.5 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center">
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
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-16 px-4 sm:px-6 lg:px-8">
      {/* Fond animé subtil */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute inset-0 bg-gradient-radial from-teal-500/10 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* En-tête avec titre et statistiques */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-4">
            Bibliothèque Académique
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-6">
            Découvrez et téléchargez les ressources pédagogiques de l'Université
          </p>
          
          {/* Statistiques générales */}
          <div className="inline-flex bg-white/5 backdrop-blur-sm rounded-xl p-1 border border-white/10">
            <div className="px-4 py-2 border-r border-white/10">
              <span className="text-sm text-gray-400">Documents</span>
              <p className="text-xl font-bold text-white">{downloads.length}</p>
            </div>
            <div className="px-4 py-2 border-r border-white/10">
              <span className="text-sm text-gray-400">Téléchargements</span>
              <p className="text-xl font-bold text-white">{downloads.reduce((sum, doc) => sum + doc.downloads, 0)}</p>
            </div>
            <div className="px-4 py-2">
              <span className="text-sm text-gray-400">Mise à jour</span>
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
              placeholder="Rechercher un document..."
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
                onClick={() => setActiveFilters({type: null, faculty: null, level: null, year: null, subject: null})}
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
        {filteredDownloads.length === 0 && (
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-12 text-center">
            <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">Aucun document trouvé</h3>
            <p className="text-gray-400 mb-6">Essayez de modifier vos critères de recherche ou vos filtres.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveFilters({type: null, faculty: null, level: null, year: null, subject: null});
              }}
              className="px-5 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-500"
            >
              Réinitialiser la recherche
            </button>
          </div>
        )}
        
        {/* Vue grille */}
        {viewMode === 'grid' && filteredDownloads.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map((item) => (
              <div
                key={item.id}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-teal-400/30 transition-all duration-300"
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
                    {item.year}
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <GraduationCap className="w-4 h-4 mr-1 text-teal-400" />
                    {item.level}
                  </div>
                </div>

                {/* Statistiques */}
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    <FileDown className="w-4 h-4 mr-1 text-gray-400" />
                    <span className="text-sm text-gray-400">{item.downloads} téléchargements</span>
                  </div>
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
        {viewMode === 'list' && filteredDownloads.length > 0 && (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-800/70">
                  <th className="text-left py-4 px-6 text-gray-300 font-medium">Document</th>
                  <th className="text-left py-4 px-4 text-gray-300 font-medium hidden md:table-cell">Matière</th>
                  <th className="text-left py-4 px-4 text-gray-300 font-medium hidden lg:table-cell">Niveau</th>
                  <th className="text-left py-4 px-4 text-gray-300 font-medium hidden xl:table-cell">Note</th>
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
                        <GraduationCap className="w-4 h-4 mr-2 text-teal-400" />
                        <span className="text-gray-300">{item.level}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 hidden xl:table-cell">
                      <RatingStars rating={item.rating} />
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end items-center space-x-2">
                        <button 
                          onClick={() => setSelectedDocument(item)}
                          className="p-2 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                        >
                          <Info className="w-4 h-4" />
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
        
        {/* Bannière statistiques */}
        {filteredDownloads.length > 0 && (
          <div className="mt-12 mb-8 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-xl p-6 border border-teal-500/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center">
                <div className="bg-teal-500/20 p-3 rounded-full mr-4">
                  <FileText className="w-6 h-6 text-teal-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total documents affichés</p>
                  <p className="text-2xl font-bold text-white">{filteredDownloads.length}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-teal-500/20 p-3 rounded-full mr-4">
                  <Users className="w-6 h-6 text-teal-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Professeurs contributeurs</p>
                  <p className="text-2xl font-bold text-white">{new Set(downloads.map(d => d.author)).size}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-teal-500/20 p-3 rounded-full mr-4">
                  <BookOpen className="w-6 h-6 text-teal-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Matières disponibles</p>
                  <p className="text-2xl font-bold text-white">{new Set(downloads.map(d => d.subject)).size}</p>
                </div>
              </div>
            </div>
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
        
       
      </div>
      
      {/* Modal détail du document */}
      {selectedDocument && <DocumentDetail />}
    </div>
  );
};

export default DownloadList;