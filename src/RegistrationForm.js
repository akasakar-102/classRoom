import React, { useState } from 'react';
import axios from 'axios';

export const RegistrationForm = ({ addRegistrant, backToList  }) => {
  const [formData, setFormData] = useState({
    name: '',
    furigana: '',
    postalCode: '',
    address: '',
    address2: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePostalCodeBlur = async () => {
    if (formData.postalCode.length === 7) { // 郵便番号が7桁であることを確認
        try {
          const response = await axios.get(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${formData.postalCode}`);
          if (response.data.results) {
            const result = response.data.results[0];
            setFormData({
                ...formData,
                address: result.address1 + result.address2 + result.address3,
            });
          } else {
            alert('存在しない郵便番号です。');
          }
        } catch (error) {
          console.error('住所の取得に失敗しました:', error);
        }
      } else {
        //alert('郵便番号は7桁で入力してください。');
      }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.furigana && formData.postalCode && formData.address) {
      addRegistrant(formData);
    } else {
      alert('必須項目を入力してください。');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">新入社員登録</h2>
      <div className="mb-5 text-gray-400">
        <span className="text-red-500">*</span>マークの項目は必須入力です。
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">氏名<span className="text-red-500">*</span></label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-gray-700">ふりがな<span className="text-red-500">*</span></label>
          <input
            type="text"
            name="furigana"
            value={formData.furigana}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-gray-700">郵便番号<span className="text-red-500">*</span></label>
          <input
            type="number"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            onBlur={handlePostalCodeBlur}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-gray-700">住所<span className="text-red-500">*</span></label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-gray-700">番地・建物名</label>
          <input
            type="text"
            name="address2"
            value={formData.address2}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-gray-700">メールアドレス<span className="text-red-500">*</span></label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
        >
          登録
        </button>
      </form>
    </div>
  );
};