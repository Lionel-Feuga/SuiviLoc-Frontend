import { Building, MapPin, Euro, Maximize, Phone, User, ExternalLink, Pencil, Trash2, AlignLeft } from 'lucide-react';

const getStatusColor = (status) => {
  switch (status) {
    case 'En attente': return 'bg-slate-700 text-slate-300 border-slate-600';
    case 'Visite prévue': return 'bg-blue-900/50 text-blue-300 border-blue-700/50';
    case 'Dossier déposé': return 'bg-purple-900/50 text-purple-300 border-purple-700/50';
    case 'Accepté': return 'bg-emerald-900/50 text-emerald-300 border-emerald-700/50';
    case 'Refusé': return 'bg-red-900/50 text-red-300 border-red-700/50';
    default: return 'bg-slate-700 text-slate-300 border-slate-600';
  }
};

const ApartmentCard = ({ apartment, onEdit, onDelete }) => {
  return (
    <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden hover:border-slate-500 transition-all group shadow-sm hover:shadow-xl hover:-translate-y-1 duration-300 flex flex-col h-full">
      
      {/* Card Header */}
      <div className="p-5 border-b border-slate-700/50 flex justify-between items-start">
        <div>
          <div className="flex flex-col gap-2 mb-3">
            <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(apartment.status)} w-fit`}>
              {apartment.status}
            </div>
            {apartment.createdAt && (
              <span className="text-xs text-slate-500">
                Ajouté le {new Date(apartment.createdAt).toLocaleString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Euro className="w-5 h-5 text-emerald-400" />
            {apartment.price ? `${apartment.price} € / mois` : 'Prix non renseigné'}
          </h3>
        </div>
        
        {/* Actions */}
        <div className="flex gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onEdit(apartment)}
            className="p-2 bg-slate-700 hover:bg-blue-600 text-slate-300 hover:text-white rounded-lg transition-colors"
            title="Modifier"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onDelete(apartment._id)}
            className="p-2 bg-slate-700 hover:bg-red-600 text-slate-300 hover:text-white rounded-lg transition-colors"
            title="Supprimer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 space-y-4 flex-grow">
        
        <div className="flex items-center gap-6 text-slate-300">
          <div className="flex items-center gap-2" title="Nombre de pièces">
            <Building className="w-4 h-4 text-slate-400" />
            <span>{apartment.rooms ? `${apartment.rooms} p.` : '-'}</span>
          </div>
          <div className="flex items-center gap-2" title="Surface">
            <Maximize className="w-4 h-4 text-slate-400" />
            <span>{apartment.surface ? `${apartment.surface} m²` : '-'}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-start gap-2 text-slate-300">
            <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
            <div className="flex flex-col">
              <span className="font-medium text-slate-200">{apartment.neighborhood || 'Quartier non renseigné'}</span>
              <span className="text-sm text-slate-400">{apartment.address || ''}</span>
            </div>
          </div>
        </div>

        {apartment.description && (
          <div className="pt-4 border-t border-slate-700/50">
            <div className="flex items-start gap-2 text-slate-300">
              <AlignLeft className="w-4 h-4 text-slate-500 mt-1 shrink-0" />
              <p className="text-sm text-slate-300 whitespace-pre-wrap">{apartment.description}</p>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-slate-700/50 space-y-2">
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <User className="w-4 h-4 text-slate-500" />
            {apartment.contactName || 'Contact inconnu'}
          </div>
          {apartment.contactNumber && (
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Phone className="w-4 h-4 text-slate-500" />
              <a href={`tel:${apartment.contactNumber}`} className="hover:text-blue-400 transition-colors">
                {apartment.contactNumber}
              </a>
            </div>
          )}
        </div>

      </div>

      {/* Card Footer */}
      {apartment.url && (
        <a 
          href={apartment.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-full p-4 bg-slate-900/50 hover:bg-blue-600/10 border-t border-slate-700 text-center text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors flex items-center justify-center gap-2"
        >
          Voir l'annonce originale
          <ExternalLink className="w-4 h-4" />
        </a>
      )}

    </div>
  );
};

export default ApartmentCard;
