import React, { useState } from 'react';

const Hero = () => {
  const [filiere, setFiliere] = useState('');
  const [niveau, setNiveau] = useState('');
  const [matiere, setMatiere] = useState('');

  const handleSearch = () => {
    console.log('Recherche lancée pour :', { filiere, niveau, matiere });
    // Ici, tu peux implémenter la logique de ta recherche en utilisant les états filiere, niveau et matiere
  };

  return (
    <div className="flex flex-col items-center justify-center py-36 px-4 bg-white text-gray-800">
      <h1 className="text-5xl font-bold text-center mb-4 text-green-800 bg-gradient-to-r from-green-300 to-green-900 bg-clip-text text-transparent">
        Recherche approfondie en quelques minutes
      </h1>
      <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl">
        Recherche à l'apparence humaine propulsée par l'IA : Points forts intelligents,
        Notes instantanées, Rapports visualisés
      </p>

      {/* Section de recherche unifiée */}
      <div className="flex w-full max-w-3xl rounded-full bg-gray-100 shadow-sm overflow-hidden">
        <select
          value={filiere}
          onChange={(e) => setFiliere(e.target.value)}
          className="w-1/3 p-4 text-gray-700 bg-transparent focus:outline-none mr-2 "
        >
          <option value="">Filière</option>
          <option value="IGL">IGL</option>
          <option value="RIT">RIT</option>
          <option value="Économie">Économie</option>
          <option value="FBA">FBA</option>
        </select>

        <select
          value={niveau}
          onChange={(e) => setNiveau(e.target.value)}
          className="w-1/3 p-4 text-gray-700 bg-transparent focus:outline-none mr-2"
        >
          <option value="">Niveau</option>
          <option value="Licence 1">Licence 1</option>
          <option value="Licence 2">Licence 2</option>
          <option value="Licence 3">Licence 3</option>
        </select>

        <select
          value={matiere}
          onChange={(e) => setMatiere(e.target.value)}
          className="w-1/3 p-4 text-gray-700 bg-transparent focus:outline-none"
        >
          <option value="">Matière</option>
          <option value="Maths">Maths</option>
          <option value="Physique">Physique</option>
          <option value="Info">Info</option>
          <option value="Statistique">Statistique</option>
        </select>
        <a href='#'
          onClick={handleSearch}
          className="bg-green-800 text-white p-5 font-semibold cursor-pointer ml-9 my-1 mx-1 rounded-full px-5 py-2 text-xl
                    bg-gradient-to-r from-green-300 to-green-900
                    transition-all duration-300
                    hover:from-green-400 hover:to-green-800
                    hover:scale-105" // Ajout des classes pour le hover
        >
          Search
        </a>
      </div>
    </div>
  );
};

export default Hero;
