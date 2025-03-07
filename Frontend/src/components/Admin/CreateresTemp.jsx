import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { RESUME_API_END_POINT } from '@/utils/Constant';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input'; // Replace this with your Input component
import { Button } from '../ui/button';
import Navbar from '../shared/Navbar';

const CreateresTemp = () => {
  const [input, setInput] = useState({
    name: '',
    image: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        `${RESUME_API_END_POINT}/createTemplate`,
        input,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/admintemplates');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center max-w-screen-lg mx-auto my-5">
        <form
          onSubmit={submitHandler}
          className="py-8 max-w-4xl border border-gray-200 shadow-lg rounded-md bg-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-4">
            {/* Name */}
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                placeholder="Enter template name"
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2"
              />
            </div>

            {/* Image URL */}
            <div>
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                type="text"
                name="image"
                value={input.image}
                onChange={changeEventHandler}
                placeholder="Enter image URL"
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2"
              />
            </div>
          </div>

          {/* Centered Submit Button */}
          <div className="flex justify-center mt-6">
            <Button
              type="submit"
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add New Template'}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateresTemp;
