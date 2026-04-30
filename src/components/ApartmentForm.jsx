import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';

const ApartmentForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    status: 'En attente',
    price: '',
    rooms: '',
    surface: '',
    neighborhood: '',
    address: '',
    contactName: '',
    contactNumber: '',
    url: '',
    description: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        status: initialData.status || 'En attente',
        price: initialData.price || '',
        rooms: initialData.rooms || '',
        surface: initialData.surface || '',
        neighborhood: initialData.neighborhood || '',
        address: initialData.address || '',
        contactName: initialData.contactName || '',
        contactNumber: initialData.contactNumber || '',
        url: initialData.url || '',
        description: initialData.description || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert empty strings to undefined or keep them, depending on backend logic. 
    // Here we let mongoose handle it, but we parse numbers.
    const cleanedData = { ...formData };
    if (cleanedData.price === '') delete cleanedData.price;
    if (cleanedData.rooms === '') delete cleanedData.rooms;
    if (cleanedData.surface === '') delete cleanedData.surface;
    
    onSave(cleanedData);
  };

  return (
    <div className="flex flex-col h-full max-h-[90vh]">
      <div className="flex justify-between items-center p-6 border-b border-slate-700">
        <h2 className="text-2xl font-bold text-white">
          {initialData ? 'Modifier l\'annonce' : 'Nouvelle annonce'}
        </h2>
        <button 
          onClick={onCancel}
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
        <form id="apartmentForm" onSubmit={handleSubmit} className="space-y-6">
          
          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Statut de la recherche</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="En attente">En attente</option>
              <option value="Visite prévue">Visite prévue</option>
              <option value="Dossier déposé">Dossier déposé</option>
              <option value="Refusé">Refusé</option>
              <option value="Accepté">Accepté</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Loyer (CC)</label>
              <div className="relative">
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="ex: 850"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <span className="absolute right-4 top-3 text-slate-400">€</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Pièces</label>
              <input
                type="number"
                name="rooms"
                value={formData.rooms}
                onChange={handleChange}
                placeholder="ex: 2"
                className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Surface</label>
              <div className="relative">
                <input
                  type="number"
                  name="surface"
                  value={formData.surface}
                  onChange={handleChange}
                  placeholder="ex: 45"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <span className="absolute right-4 top-3 text-slate-400">m²</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Quartier</label>
              <input
                type="text"
                name="neighborhood"
                value={formData.neighborhood}
                onChange={handleChange}
                placeholder="ex: Centre-ville"
                className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Adresse exacte</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="ex: 12 rue de la Paix"
                className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Nom du contact</label>
              <input
                type="text"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                placeholder="ex: Agence ORPI ou Jean Dupont"
                className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Numéro de téléphone</label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="ex: 06 12 34 56 78"
                className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Lien de l'annonce (URL)</label>
            <input
              type="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="ex: https://www.leboncoin.fr/..."
              className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Description / Notes</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Écrivez ce que vous souhaitez, sans limite de caractères..."
              rows="4"
              className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            ></textarea>
          </div>

        </form>
      </div>

      <div className="p-6 border-t border-slate-700 bg-slate-800 rounded-b-2xl flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 text-slate-300 hover:text-white font-medium rounded-xl hover:bg-slate-700 transition-colors"
        >
          Annuler
        </button>
        <button
          type="submit"
          form="apartmentForm"
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl shadow-lg shadow-blue-900/20 flex items-center gap-2 transition-all"
        >
          <Save className="w-5 h-5" />
          {initialData ? 'Enregistrer' : 'Créer la fiche'}
        </button>
      </div>
    </div>
  );
};

export default ApartmentForm;
