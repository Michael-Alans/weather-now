export default function NoResultsView() {
  return (
    <div className="w-full flex justify-center py-12 animate-in fade-in slide-in-from-top-4 duration-500">
      <p className="text-white text-xl md:text-2xl font-display font-bold">
        No search result found!
      </p>
    </div>
  );
}