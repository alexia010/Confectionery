const PaginationInfo = ({ indexOfFirstItem, indexOfLastItem, totalItems }) => (
    <p className="text-sm text-gray-600">
      Afișare <span className="font-medium">{indexOfFirstItem + 1}</span>-
      <span className="font-medium">{Math.min(indexOfLastItem, totalItems)}</span> din{' '}
      <span className="font-medium">{totalItems}</span> comenzi
    </p>
  );
  
  export default PaginationInfo;