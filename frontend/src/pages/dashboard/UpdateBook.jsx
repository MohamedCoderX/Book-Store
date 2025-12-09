import React, { useEffect, useState } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchBookByIdQuery, useUpdateBookMutation } from '../../redux/features/book';
import axios from 'axios';
import { getBaseUrl } from '../../utils/baseUrl';
import { toast } from 'react-toastify';
import { getImgUrl } from '../../utils/getImgUrl';

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: bookData, isLoading, isError, refetch } = useFetchBookByIdQuery(id);
  const { register, handleSubmit, setValue } = useForm();

const [updatebook]= useUpdateBookMutation();
  const [previewImage, setPreviewImage] = useState('');
  const [newFile, setNewFile] = useState(null);

  useEffect(() => {
    if (bookData) {
      setValue('title', bookData.title);
      setValue('description', bookData.description);
      setValue('category', bookData.category);
      setValue('trending', bookData.trending);
      setValue('oldPrice', bookData.oldPrice);
      setValue('newPrice', bookData.newPrice);
      setPreviewImage(`${getImgUrl(bookData.coverImage)}`); // ✅ show current image
    }
  }, [bookData, setValue]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewFile(file);
      setPreviewImage(URL.createObjectURL(file)); // ✅ show new preview
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('trending', data.trending);
    formData.append('oldPrice', data.oldPrice);
    formData.append('newPrice', data.newPrice);
    if (newFile) {
      formData.append('coverImage', newFile); // ✅ new file
    } else {
      formData.append('coverImage', bookData.coverImage); // keep old image
    }

    try {
        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
          }
      await updatebook({id,formData}).unwrap();
      toast.success('Book updated successfully!');
      
      refetch();
      navigate("/dashboard/allbooks");
    } catch (error) {
      console.error(error);
      toast.error('Failed to update book!');
    }
  };

  if (isLoading) return <p>Loading book data...</p>;
  if (isError) return <p>Error loading book.</p>;

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Book</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField label="Title" name="title" register={register} />
        <InputField label="Description" name="description" register={register} type="textarea" />
        <SelectField
          label="Category"
          name="category"
          options={[
            { value: '', label: 'Choose A Category' },
            { value: 'business', label: 'Business' },
            { value: 'technology', label: 'Technology' },
            { value: 'fiction', label: 'Fiction' },
            { value: 'horror', label: 'Horror' },
            { value: 'adventure', label: 'Adventure' },
          ]}
          register={register}
        />

        {/* Trending */}
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register('trending')}
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">Trending</span>
          </label>
        </div>

        {/* Price fields */}
        <InputField label="Old Price" name="oldPrice" type="number" register={register} />
        <InputField label="New Price" name="newPrice" type="number" register={register} />

        {/* ✅ Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
          {previewImage && (
            <img
              src={previewImage}
              alt="Book Preview"
              className="w-32 h-32 object-cover rounded mb-2 border"
            />
          )}
          <input type="file" accept="image/*" onChange={handleFileChange} className="w-full" />
        </div>

        <button type="submit" className="w-full py-2 bg-blue-500 text-white font-bold rounded-md">
          Update Book
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;
