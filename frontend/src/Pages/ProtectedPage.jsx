import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../Components/Header';
import {useAuth} from '../../context/AuthContext'
const LIMIT = 6;

const ProtectedPage = () => {
  const {user}= useAuth();
  const [categories, setCategories] = useState([]);
  const [interests, setInterests] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCategories = async (page) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/categories?page=${page}&limit=${LIMIT}`);
      setCategories(res.data.categories);
      setTotalPages(Math.ceil(res.data.total / LIMIT));
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

 const fetchInterests = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/interests`,
      {
        headers: {
          Authorization: `${user.token}`,
        },
      }
    );
    setInterests(res.data.interests || []);
  } catch (err) {
    console.error('Error fetching interests:', err);
  }
};


const saveInterests = async (updatedInterests) => {
  try {
    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/interests`,
      { interests: updatedInterests },
      {
        headers: {
          Authorization: `${user.token}`, 
        },
      }
    );
  } catch (err) {
    console.error('Error saving interests:', err);
  }
};

  const toggleInterest = async (item) => {
    const updated = interests.includes(item)
      ? interests.filter(i => i !== item)
      : [...interests, item];

    setInterests(updated);
    await saveInterests(updated);
  };

  useEffect(() => {
    fetchCategories(page);
    fetchInterests();
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  return (
    <>
    <Header/>
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md border border-gray-300 rounded-xl px-8 py-10 text-center">
       
        <h2 className="text-2xl font-semibold mb-1">Please mark your interests!</h2>
        <p className="text-gray-500 text-sm mb-4">We will keep you notified.</p>
        <hr className="mb-6" />

        <div className="text-left mb-6">
          <h3 className="font-medium text-lg mb-2">My saved interests!</h3>
          {categories.map((category) => (
            <label key={category._id} className="flex items-center space-x-3 mb-2 cursor-pointer">
              <input
                type="checkbox"
                checked={interests.includes(category.name)}
                onChange={() => toggleInterest(category.name)}
                className="form-checkbox h-5 w-5 rounded border-gray-400 checked:bg-black checked:border-black"
              />
              <span className="text-gray-800">{category.name}</span>
            </label>
          ))}
        </div>

       <div className="flex justify-center items-center space-x-2 text-gray-400 text-sm">
  <button
    onClick={() => handlePageChange(1)}
    disabled={page === 1}
    className={`px-2 ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    {'<<'}
  </button>
  <button
    onClick={() => handlePageChange(page - 1)}
    disabled={page === 1}
    className={`px-2 ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    {'<'}
  </button>

  {[...Array(totalPages).keys()]
    .slice(0, 7)
    .map((num) => (
      <button
        key={num + 1}
        onClick={() => handlePageChange(num + 1)}
        className={`px-2 ${page === num + 1 ? 'text-black font-semibold' : ''}`}
      >
        {num + 1}
      </button>
    ))}

  {totalPages > 7 && <span>...</span>}

  <button
    onClick={() => handlePageChange(page + 1)}
    disabled={page === totalPages}
    className={`px-2 ${page === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    {'>'}
  </button>
  <button
    onClick={() => handlePageChange(totalPages)}
    disabled={page === totalPages}
    className={`px-2 ${page === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    {'>>'}
  </button>
</div>

      </div>
    </div>
    </>
  );
};

export default ProtectedPage;
