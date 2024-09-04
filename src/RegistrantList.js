import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export const RegistrantList = ({ registrants, onAddNew, onDeleteRegistrant }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleMouseEnter = (index) => {
      setHoveredIndex(index);
    };
  
    const handleMouseLeave = () => {
      setHoveredIndex(null);
    };
  
    const handleDelete = (index, id) => {
      const confirmDelete = window.confirm('削除しますか？');
      if (confirmDelete) {
        onDeleteRegistrant(index, id);
      }
    };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-start mb-4">
      <h2 className="text-xl font-bold mb-4">社員管理システム</h2>
      <button
        onClick={onAddNew}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
      >
        新入社員登録
      </button>
      </div>
      <ul className="mt-4 space-y-2">
        {registrants.map((registrant, index) => (
          <li
            key={index}
            className="p-4 bg-gray-50 flex justify-between rounded-lg shadow-sm border border-gray-200"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div>
                <div className="font-semibold">{registrant.name} ({registrant.furigana})</div>
                <div className="text-gray-600 text-sm">
                {registrant.postalCode}, {registrant.address} - {registrant.email}
                </div>
            </div>
            {hoveredIndex === index && (
                <div className="w-8 flex items-center">
                    <FontAwesomeIcon
                    icon={faTrash}
                    className="text-gray-400 cursor-pointer hover:text-red-700 transition duration-300"
                    onClick={() => handleDelete(index, registrant.id)}
                    />
                </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};