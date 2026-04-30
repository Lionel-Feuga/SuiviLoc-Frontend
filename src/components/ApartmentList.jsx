import ApartmentCard from './ApartmentCard';

const ApartmentList = ({ apartments, onEdit, onDelete }) => {
  if (apartments.length === 0) {
    return (
      <div className="text-center py-20 bg-slate-800/50 rounded-2xl border border-slate-700/50 border-dashed">
        <h3 className="text-xl font-medium text-slate-300 mb-2">Aucune annonce trouvée</h3>
        <p className="text-slate-500">Essayez de modifier vos filtres ou ajoutez une nouvelle annonce.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {apartments.map((apartment) => (
        <ApartmentCard 
          key={apartment._id} 
          apartment={apartment} 
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ApartmentList;
