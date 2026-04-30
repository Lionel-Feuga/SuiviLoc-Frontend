import { MapPin, Search } from 'lucide-react';

const Filters = ({ 
  statusFilter, setStatusFilter, 
  neighborhoodFilter, setNeighborhoodFilter, 
  sortBy, setSortBy,
  isSearchVisible
}) => {
  return (
    <div className="flex flex-col gap-4 mb-6">
      
      {/* Search */}
      {isSearchVisible && (
        <div className="bg-slate-800 p-4 sm:p-5 rounded-2xl border border-slate-700 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300 flex flex-col sm:flex-row gap-4">
          
          {/* Neighborhood */}
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher un quartier..."
              value={neighborhoodFilter}
              onChange={(e) => setNeighborhoodFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-600 rounded-xl text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Status */}
          <div className="w-full sm:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer transition-all"
            >
              <option value="">Tous les statuts</option>
              <option value="En attente">En attente</option>
              <option value="Visite prévue">Visite prévue</option>
              <option value="Dossier déposé">Dossier déposé</option>
              <option value="Refusé">Refusé</option>
              <option value="Accepté">Accepté</option>
            </select>
          </div>
        </div>
      )}

      {/* Sorting */}
      <div className="flex justify-start items-center w-full">
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-400 font-medium">Trier par:</span>
          <div className="bg-slate-800/80 rounded-xl p-1 border border-slate-700 flex text-sm shadow-sm backdrop-blur-sm">
            <button
              onClick={() => setSortBy('date')}
              className={`px-3 py-1.5 rounded-lg transition-all ${sortBy === 'date' ? 'bg-slate-600 text-white shadow' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'}`}
            >
              Récent
            </button>
            <button
              onClick={() => setSortBy('price')}
              className={`px-3 py-1.5 rounded-lg transition-all ${sortBy === 'price' ? 'bg-slate-600 text-white shadow' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'}`}
            >
              Prix
            </button>
            <button
              onClick={() => setSortBy('surface')}
              className={`px-3 py-1.5 rounded-lg transition-all ${sortBy === 'surface' ? 'bg-slate-600 text-white shadow' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'}`}
            >
              Surface
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Filters;
