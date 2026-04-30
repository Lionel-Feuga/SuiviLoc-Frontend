import { useState, useEffect } from 'react';
import { X, Save, Wand2, Loader2, Image as ImageIcon } from 'lucide-react';
import { scrapeUrl } from '../services/api';

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
    imageUrl: '',
    imageUrls: [],
    description: ''
  });

  const [isScraping, setIsScraping] = useState(false);

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
        imageUrl: initialData.imageUrl || '',
        imageUrls: initialData.imageUrls || (initialData.imageUrl ? [initialData.imageUrl] : []),
        description: initialData.description || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleScrape = async () => {
    if (!formData.url) return;
    setIsScraping(true);
    try {
      const data = await scrapeUrl(formData.url);
      setFormData(prev => ({
        ...prev,
        imageUrl: data.imageUrl || prev.imageUrl,
        price: data.price || prev.price,
        rooms: data.rooms || prev.rooms,
        surface: data.surface || prev.surface,
        neighborhood: data.neighborhood || prev.neighborhood,
        contactName: data.contactName || prev.contactName,
        imageUrls: data.imageUrls && data.imageUrls.length > 0 ? data.imageUrls : prev.imageUrls
      }));
    } catch (error) {
      alert("Impossible de récupérer les infos de ce lien.");
    } finally {
      setIsScraping(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanedData = { ...formData };
    if (cleanedData.price === '') delete cleanedData.price;
    if (cleanedData.rooms === '') delete cleanedData.rooms;
    if (cleanedData.surface === '') delete cleanedData.surface;
    
    // Assurer la rétrocompatibilité
    if (cleanedData.imageUrls && cleanedData.imageUrls.length > 0) {
      cleanedData.imageUrl = cleanedData.imageUrls[0];
    }
    
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
              <option value="À contacter">À contacter</option>
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
            <div className="flex gap-2">
              <input
                type="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                placeholder="ex: https://www.leboncoin.fr/..."
                className="flex-1 px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={handleScrape}
                disabled={!formData.url || isScraping}
                className="px-4 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-xl transition-colors flex items-center gap-2 font-medium"
                title="Extraire les informations depuis l'URL"
              >
                {isScraping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
                <span className="hidden sm:inline">Extraire</span>
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-700/50">
            <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
              <ImageIcon className="w-4 h-4" /> Photos de l'appartement ({formData.imageUrls?.length || 0})
            </label>
            <div className="flex gap-2 mb-4">
              <input
                type="url"
                id="newImageUrlInput"
                placeholder="Ajouter manuellement un lien d'image..."
                className="flex-1 px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (e.target.value) {
                      setFormData(prev => ({ ...prev, imageUrls: [...(prev.imageUrls || []), e.target.value] }));
                      e.target.value = '';
                    }
                  }
                }}
              />
              <button
                type="button"
                onClick={() => {
                  const input = document.getElementById('newImageUrlInput');
                  if (input && input.value) {
                    setFormData(prev => ({ ...prev, imageUrls: [...(prev.imageUrls || []), input.value] }));
                    input.value = '';
                  }
                }}
                className="px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors font-medium"
              >
                Ajouter
              </button>
            </div>
            
            {/* Thumbnails */}
            {formData.imageUrls && formData.imageUrls.length > 0 && (
              <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
                {formData.imageUrls.map((url, idx) => (
                  <div key={idx} className="relative w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden border border-slate-600 bg-slate-900 shadow-sm group">
                    <img src={url} alt={`Aperçu ${idx+1}`} className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                    <button 
                      type="button" 
                      onClick={() => setFormData(prev => ({ ...prev, imageUrls: prev.imageUrls.filter((_, i) => i !== idx) }))}
                      className="absolute top-1 right-1 p-1 bg-black/60 hover:bg-red-500 text-white rounded-full transition-colors backdrop-blur-sm opacity-0 group-hover:opacity-100"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
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
