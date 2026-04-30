import { useState, useEffect } from 'react';
import { getApartments, deleteApartment, updateApartment, createApartment } from './services/api';
import ApartmentList from './components/ApartmentList';
import ApartmentForm from './components/ApartmentForm';
import Filters from './components/Filters';
import { Home, Plus, Search } from 'lucide-react';

function App() {
  const [apartments, setApartments] = useState([]);
  const [filteredApartments, setFilteredApartments] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [apartmentToEdit, setApartmentToEdit] = useState(null);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  
  // Filters
  const [statusFilter, setStatusFilter] = useState('');
  const [neighborhoodFilter, setNeighborhoodFilter] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    fetchApartments();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [apartments, statusFilter, neighborhoodFilter, sortBy, sortOrder]);

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder(field === 'price' ? 'asc' : 'desc');
    }
  };

  const fetchApartments = async () => {
    try {
      const data = await getApartments();
      setApartments(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des appartements", error);
    }
  };

  const applyFiltersAndSort = () => {
    let result = [...apartments];

    if (statusFilter) {
      result = result.filter(apt => apt.status === statusFilter);
    }
    
    if (neighborhoodFilter) {
      result = result.filter(apt => 
        apt.neighborhood && apt.neighborhood.toLowerCase().includes(neighborhoodFilter.toLowerCase())
      );
    }

    result.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'price') {
        comparison = (a.price || 0) - (b.price || 0);
      } else if (sortBy === 'surface') {
        comparison = (a.surface || 0) - (b.surface || 0);
      } else {
        comparison = new Date(a.createdAt) - new Date(b.createdAt);
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    setFilteredApartments(result);
  };

  const handleSave = async (apartmentData) => {
    try {
      if (apartmentToEdit) {
        await updateApartment(apartmentToEdit._id, apartmentData);
      } else {
        await createApartment(apartmentData);
      }
      fetchApartments();
      closeForm();
    } catch (error) {
      console.error("Erreur lors de la sauvegarde", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette annonce ?")) {
      try {
        await deleteApartment(id);
        fetchApartments();
      } catch (error) {
        console.error("Erreur lors de la suppression", error);
      }
    }
  };

  const openEditForm = (apartment) => {
    setApartmentToEdit(apartment);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setApartmentToEdit(null);
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 font-sans">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-10 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-500 p-2 rounded-lg">
              <Home className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
              SuiviLoc
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSearchVisible(!isSearchVisible)}
              className={`p-2 rounded-lg transition-colors border ${isSearchVisible ? 'bg-blue-600/20 text-blue-400 border-blue-500/30' : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'}`}
              title="Rechercher / Filtrer"
            >
              <Search className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsFormOpen(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 transition-colors text-white px-4 py-2 rounded-lg font-medium shadow-lg shadow-blue-900/20"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Nouvelle annonce</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <Filters 
          statusFilter={statusFilter} setStatusFilter={setStatusFilter}
          neighborhoodFilter={neighborhoodFilter} setNeighborhoodFilter={setNeighborhoodFilter}
          sortBy={sortBy} sortOrder={sortOrder} toggleSort={toggleSort}
          isSearchVisible={isSearchVisible}
        />

        <div className="mt-8">
          <ApartmentList 
            apartments={filteredApartments} 
            onEdit={openEditForm}
            onDelete={handleDelete}
          />
        </div>
      </main>

      {/* Modal Form */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex justify-center items-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-2xl my-auto animate-in fade-in zoom-in-95 duration-200">
            <ApartmentForm 
              initialData={apartmentToEdit} 
              onSave={handleSave} 
              onCancel={closeForm} 
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
