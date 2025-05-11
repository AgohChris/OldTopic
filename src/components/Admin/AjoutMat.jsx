import React, { useState } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';

const niveaux = ["L1", "L2", "L3", "M1", "M2"];
const filieres = ["Informatique", "Droit", "Mathématiques", "Physique", "Chimie"];

const AjoutMat = () => {
  // Récupérer isDarkMode depuis le contexte de l'Outlet
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
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
  };

  const handleAdd = () => {
    if (!form.matricule || !form.nom || !form.email) return alert("Tous les champs sont requis !");
    setEtudiants(prev => [...prev, { ...form, id: Date.now() }]);
    resetForm();
  };

  const handleEdit = (etudiant) => {
    setForm(etudiant);
    setEditMode(true);
  };

  const handleUpdate = () => {
    setEtudiants(prev =>
      prev.map(et => (et.id === form.id ? form : et))
    );
    resetForm();
  };

  const handleDelete = (id) => {
    if (window.confirm("Supprimer cet étudiant ?")) {
      setEtudiants(prev => prev.filter(et => et.id !== id));
    }
  };

  return (
    <div className={`p-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} rounded-lg shadow-lg`}>
      <h2 className="text-2xl font-semibold mb-4">Ajout des Étudiants</h2>

      {/* Formulaire */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          name="matricule"
          placeholder="Matricule"
          value={form.matricule}
          onChange={handleChange}
          className={`p-2 border rounded-md ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
        />
        <input
          type="text"
          name="nom"
          placeholder="Nom complet"
          value={form.nom}
          onChange={handleChange}
          className={`p-2 border rounded-md ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className={`p-2 border rounded-md ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
        />
        <input
          type="text"
          name="etablissement"
          placeholder="Établissement"
          value={form.etablissement}
          onChange={handleChange}
          className={`p-2 border rounded-md ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
        />
        <select
          name="niveau"
          value={form.niveau}
          onChange={handleChange}
          className={`p-2 border rounded-md ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
        >
          <option value="">Niveau</option>
          {niveaux.map(niv => (
            <option key={niv} value={niv} className={isDarkMode ? 'bg-gray-800' : 'bg-white'}>{niv}</option>
          ))}
        </select>
        <select
          name="filiere"
          value={form.filiere}
          onChange={handleChange}
          className={`p-2 border rounded-md ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
        >
          <option value="">Filière</option>
          {filieres.map(fil => (
            <option key={fil} value={fil} className={isDarkMode ? 'bg-gray-800' : 'bg-white'}>{fil}</option>
          ))}
        </select>
      </div>

      {/* Boutons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={editMode ? handleUpdate : handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <Plus size={18} />
          {editMode ? 'Modifier' : 'Ajouter'}
        </button>
        {editMode && (
          <button
            onClick={resetForm}
            className={`px-4 py-2 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-black'} rounded hover:${isDarkMode ? 'bg-gray-600' : 'bg-gray-400'}`}
          >
            Annuler
          </button>
        )}
      </div>

      {/* Tableau */}
      <table className={`min-w-full text-left text-sm border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
        <thead className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700'}`}>
          <tr>
            <th className="p-2">Matricule</th>
            <th className="p-2">Nom</th>
            <th className="p-2">Email</th>
            <th className="p-2">Établissement</th>
            <th className="p-2">Niveau</th>
            <th className="p-2">Filière</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {etudiants.map(et => (
            <tr key={et.id} className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
              <td className="p-2">{et.matricule}</td>
              <td className="p-2">{et.nom}</td>
              <td className="p-2">{et.email}</td>
              <td className="p-2">{et.etablissement}</td>
              <td className="p-2">{et.niveau}</td>
              <td className="p-2">{et.filiere}</td>
              <td className="p-2 flex gap-2">
                <button onClick={() => handleEdit(et)} className="text-blue-500 hover:text-blue-700">
                  <Pencil size={16} />
                </button>
                <button onClick={() => handleDelete(et.id)} className="text-red-500 hover:text-red-700">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
          {etudiants.length === 0 && (
            <tr>
              <td colSpan="7" className={`p-4 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Aucun étudiant ajouté
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AjoutMat;