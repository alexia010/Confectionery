import React, { useState, useEffect } from 'react';
import { PlusCircle, Search, LayoutGrid, List } from 'lucide-react';
import AdminLayout from '../layouts/AdminLayout';
import { Button } from '../components/ui/Button';
import UserTable from '../components/AdminUserTable';
import UserList from '../components/AdminUserList';
import UserModal from '../components/ui/UserModal';
import { userService } from '../services/userService';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add', 'edit', 'delete'
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'descending' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isCompactView, setIsCompactView] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // Formular inițial adaptat la schema mongoose
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    adress: '',
    role: 'user'
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const fetchedUsers = await userService.getAllUsers();
        setUsers(fetchedUsers);
      } catch (err) {
        setError('Eroare la încărcarea utilizatorilor: ' + (err.message || 'Eroare necunoscută'));
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
    
    // Verifică dimensiunea ecranului pentru vizualizarea responsivă
    const handleResize = () => {
      setIsCompactView(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [refreshTrigger]);

  const sortedUsers = React.useMemo(() => {
    return [...users].sort((a, b) => {
      // Tratează datele special
      if (sortConfig.key === 'createdAt' || sortConfig.key === 'lastLogin') {
        const dateA = new Date(a[sortConfig.key]);
        const dateB = new Date(b[sortConfig.key]);
        return sortConfig.direction === 'ascending' 
          ? dateA - dateB 
          : dateB - dateA;
      }
      
      // Gestionează șiruri de caractere și alte tipuri
      const valueA = a[sortConfig.key] || '';
      const valueB = b[sortConfig.key] || '';
      
      if (valueA < valueB) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [users, sortConfig.key, sortConfig.direction]);

  const filteredUsers = React.useMemo(() => {
    const filtered = sortedUsers.filter((user) =>
      (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.phone && user.phone.includes(searchTerm)) ||
      (user.role && user.role.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    // Calculează numărul total de pagini pe baza utilizatorilor filtrați
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    return filtered;
  }, [sortedUsers, searchTerm, itemsPerPage]);

  // Obține utilizatorii curenți pentru pagină
  const currentUsers = React.useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredUsers, currentPage, itemsPerPage]);

  // Calculează indexurile pentru afișare
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = currentPage > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;

  // Resetează la pagina 1 când se schimbă căutarea
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const openAddModal = () => {
    setModalMode('add');
    setFormValues({
      name: '',
      email: '',
      password: '',
      phone: '',
      adress: '',
      role: 'user'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setModalMode('edit');
    setFormValues({
      name: user.name || '',
      email: user.email || '',
      password: '', // Nu afișăm parola existentă
      phone: user.phone || '',
      adress: user.adress || '',
      role: user.role || 'user'
    });
    setIsModalOpen(true);
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setModalMode('delete');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormValues({ ...formValues, [name]: checked });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };



    const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {
          const updateData = { ...formValues };
          
          // Tratează câmpul de telefon
          if (updateData.phone) {
              // Elimină spațiile
              updateData.phone = updateData.phone.trim();
              
              // Șterge câmpul dacă este gol
              if (updateData.phone === '') {
                  delete updateData.phone;
              }
          }

          if (modalMode === 'add') {
              // Când adăugăm un utilizator nou
              await userService.addUser(updateData);
              setRefreshTrigger((prev) => prev + 1);
          } else if (modalMode === 'edit' && selectedUser) {
              // Când edităm un utilizator existent
              // Verificăm dacă parola a fost modificată
              if (!updateData.password) {
                  delete updateData.password; // Nu trimitem parola dacă nu a fost modificată
              }

              await userService.updateUserProfile(
                  selectedUser._id, 
                  {
                      name: updateData.name,
                      email: updateData.email,
                      phone: updateData.phone, // Acum va fi undefined dacă a fost gol
                      adress: updateData.adress,
                      role: updateData.role,
                      ...(updateData.password && { password: updateData.password })
                  }
              );
              
              setRefreshTrigger((prev) => prev + 1);
          }
          closeModal();
      } catch (err) {
          setError('Eroare la salvarea utilizatorului: ' + (err.message || err.toString()));
          console.error('Eroare în handleSubmit:', err);
      }
  };

  const handleDelete = async () => {
    if (selectedUser) {
      try {
        await userService.deleteUser(selectedUser._id);
        setRefreshTrigger((prev) => prev + 1);
        closeModal();
      } catch (err) {
        setError('Eroare la ștergerea utilizatorului: ' + (err.message || err.toString()));
      }
    }
  };

  const getModalTitle = () => {
    if (modalMode === 'add') return 'Adaugă utilizator nou';
    if (modalMode === 'edit') return 'Editează utilizator';
    if (modalMode === 'delete') return 'Șterge utilizator';
    return '';
  };

  // Funcție pentru a obține pictograma de sortare în funcție de starea curentă de sortare
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    return sortConfig.direction === 'ascending' ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  // Randarea paginării - îmbunătățită pentru mobile
  const renderPagination = () => (
    <div className="flex flex-wrap items-center justify-between gap-2 mt-4 px-2">
      <div className="flex items-center space-x-1 text-sm text-gray-700">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className={`p-1 rounded ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-100'}`}
          aria-label="Prima pagină"
        >
          «
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-1 rounded ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-100'}`}
          aria-label="Pagina anterioară"
        >
          ‹
        </button>

        <div className="hidden sm:flex">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-2 py-1 rounded ${
                  currentPage === pageNum 
                    ? 'bg-indigo-100 text-indigo-700 font-medium' 
                    : 'hover:bg-gray-100'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* Mobile Page Indicator */}
        <span className="sm:hidden px-2 py-1">
          {currentPage} / {totalPages}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-1 rounded ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-100'}`}
          aria-label="Pagina următoare"
        >
          ›
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={`p-1 rounded ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-100'}`}
          aria-label="Ultima pagină"
        >
          »
        </button>
      </div>
      <div className="text-sm text-gray-500 hidden sm:block">
        Pagina {currentPage} din {totalPages}
      </div>
    </div>
  );

  // Randarea mesajului "Nu există utilizatori"
  const renderNoUsers = () => (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-8 border border-gray-100 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-3 sm:mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 className="text-base sm:text-lg font-medium text-gray-700 mb-2">Nu au fost găsiți utilizatori</h3>
      <p className="text-sm text-gray-500 mb-4">Încercați să modificați criteriile de căutare pentru a găsi rezultate.</p>
      <button 
        onClick={() => setSearchTerm('')}
        className="px-3 py-1.5 sm:px-4 sm:py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 inline-flex items-center text-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Resetează căutarea
      </button>
    </div>
  );

  // Loader îmbunătățit
  if (loading) return (
    <AdminLayout>
      <div className="flex justify-center items-center p-8 h-screen">
        <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-indigo-500"></div>
      </div>
    </AdminLayout>
  );
  
  // Afișarea erorilor îmbunătățită
  if (error) return (
    <AdminLayout>
      <div className="p-4 sm:p-6 m-4 bg-red-50 border-l-4 border-red-500 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Eroare</h3>
            <div className="mt-1 text-sm text-red-700">{error}</div>
            <div className="mt-3">
              <button 
                onClick={() => setRefreshTrigger(prev => prev + 1)}
                className="text-sm font-medium text-red-800 hover:underline focus:outline-none"
              >
                Încearcă din nou
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );

  return (
    <AdminLayout>
      <header className="bg-white shadow-sm w-full">
        <div className="w-full px-4 py-4 sm:px-6 sm:py-6 lg:px-8 box-border">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-sans font-light text-gray-900 text-center sm:text-left break-words">
            Management Utilizatori
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-full px-3 py-3 sm:px-6 sm:py-6 lg:px-8">
        <div className="py-3 sm:py-6">
          {/* Search and Button Section - Improved for mobile */}
          <div className="flex flex-col space-y-3 sm:flex-row sm:justify-between sm:items-center sm:space-y-0 mb-4 sm:mb-6">
            {/* Search box optimized for mobile */}
            <div className="relative w-full sm:w-auto">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Caută utilizatori..."
                className="pl-9 pr-3 py-2 w-full sm:w-64 text-black border border-gray-200 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 text-sm"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <Search size={16} />
              </div>
            </div>
            
            {/* View toggle and Add button */}
            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto">

              <Button
                onClick={openAddModal}
                className="flex items-center px-3 py-2 sm:px-4 sm:py-2 ml-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-md transition-colors"
              >
                <PlusCircle size={16} className="mr-1 sm:mr-2" />
                <span className="text-sm">Adaugă</span>
              </Button>
            </div>
          </div>

          {/* Items per page and info section - More compact on mobile */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-3 sm:mb-4 text-sm">
            <div className="mb-2 sm:mb-0 w-full sm:w-auto text-center sm:text-left">
              <p className="text-gray-600">
                Afișare <span className="font-medium">{filteredUsers.length > 0 ? indexOfFirstItem : 0}</span>-
                <span className="font-medium">
                  {indexOfLastItem > filteredUsers.length ? filteredUsers.length : indexOfLastItem}
                </span> din <span className="font-medium">{filteredUsers.length}</span> utilizatori
              </p>
            </div>
            <div className="flex items-center">
              <label htmlFor="itemsPerPage" className="text-gray-600 mr-2">Afișează:</label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="px-2 py-1 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>

          {/* User Table or Card List */}
          <div className="overflow-x-auto rounded-md shadow-sm">
            {filteredUsers.length === 0 ? (
              renderNoUsers()
            ) : isCompactView ? (
              <UserList
                users={currentUsers}
                onEdit={openEditModal}
                onDelete={openDeleteModal}
              />
            ) : (
              <UserTable
                users={currentUsers}
                sortConfig={sortConfig}
                requestSort={requestSort}
                getSortIcon={getSortIcon}
                onEdit={openEditModal}
                onDelete={openDeleteModal}
              />
            )}
          </div>

          {/* Pagination - Improved for mobile */}
          {filteredUsers.length > 0 && renderPagination()}
        </div>
      </main>

      {/* Modal - Now uses the responsive version */}
      <UserModal
        isOpen={isModalOpen}
        onClose={closeModal}
        modalMode={modalMode}
        title={getModalTitle()}
        selectedUser={selectedUser}
        formValues={formValues}
        handleFormChange={handleFormChange}
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
      />
    </AdminLayout>
  );
};

export default AdminUsersPage;