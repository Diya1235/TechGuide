import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { PROJECT_API_END_POINT } from '@/utils/Constant';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for API requests
import { toast } from 'sonner';
// ; // Import toast for notifications

const Createproject = () => {
  const [input, setInput] = useState({
    title: '',
    category: '',
    roles: '', // Array
    description: '',
    prerequisites: '',
    roadmap: '',
    scope: '',
    technology: '', // Array
    images: '', // Array
    resources: '', // Array
    linksyt: '' // Array
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    const { name, value } = e.target;

    // Split comma-separated values into an array for specific fields
    const arrayFields = ['roles', 'technology', 'images', 'resources', 'linksyt'];
    const newValue = arrayFields.includes(name) ? value.split(',').map((item) => item.trim()) : value;

    setInput({
      ...input,
      [name]: newValue
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${PROJECT_API_END_POINT}/addProject`, input, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/adminProjects');
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
      <div className="flex items-center justify-center w-screen my-5">
        <form onSubmit={submitHandler} className="py-8 max-w-4xl border border-gray-200 shadow-lg rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl px-4">
            {/* Title */}
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                placeholder="Enter project title"
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2"
              />
            </div>

            {/* Category */}
            <div>
              <Label>Category</Label>
              <select
                name="category"
                value={input.category}
                onChange={changeEventHandler}
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2"
              >
                <option value="" disabled>
                  Select Category
                </option>
                <option value="Web Development">Web Development</option>
                <option value="Application Development">Application Development</option>
                <option value="IOT">IOT</option>
              </select>
            </div>

            {/* Description */}
            <div className="col-span-2">
              <Label>Description</Label>
              <textarea
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Enter project description"
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2"
                rows="4"
              ></textarea>
            </div>

            {/* Prerequisites */}
            <div className="col-span-2">
              <Label>Prerequisites</Label>
              <Input
                type="text"
                name="prerequisites"
                value={input.prerequisites}
                onChange={changeEventHandler}
                placeholder="Enter prerequisites (comma-separated)"
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2"
              />
            </div>

            {/* Roles */}
            <div className="col-span-2">
              <Label>Roles</Label>
              <Input
                type="text"
                name="roles"
                value={input.roles}
                onChange={changeEventHandler}
                placeholder="Enter roles (comma-separated)"
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2"
              />
            </div>

            {/* Roadmap */}
            <div className="col-span-2">
              <Label>Roadmap</Label>
              <textarea
                name="roadmap"
                value={input.roadmap}
                onChange={changeEventHandler}
                placeholder="Enter roadmap details"
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2"
                rows="4"
              ></textarea>
            </div>

            {/* Scope */}
            <div>
              <Label>Scope</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {['Easy', 'Medium', 'Hard', 'Moderate'].map((scope) => (
                  <label key={scope} className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="scope"
                      value={scope.toLowerCase()}
                      onChange={changeEventHandler}
                      checked={input.scope === scope.toLowerCase()}
                    />
                    {scope}
                  </label>
                ))}
              </div>
            </div>

            {/* Technology */}
            <div>
              <Label>Technology</Label>
              <Input
                type="text"
                name="technology"
                value={input.technology}
                onChange={changeEventHandler}
                placeholder="Enter technologies used (comma-separated)"
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2"
              />
            </div>

            {/* Images */}
            <div>
              <Label>Images</Label>
              <Input
                type="text"
                name="images"
                value={input.images}
                onChange={changeEventHandler}
                placeholder="Enter image URLs (comma-separated)"
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2"
              />
            </div>

            {/* Resources */}
            <div>
              <Label>Resources</Label>
              <Input
                type="text"
                name="resources"
                value={input.resources}
                onChange={changeEventHandler}
                placeholder="Enter resource links (comma-separated)"
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2"
              />
            </div>

            {/* Linksyt */}
            <div>
              <Label>Linksyt</Label>
              <Input
                type="text"
                name="linksyt"
                value={input.linksyt}
                onChange={changeEventHandler}
                placeholder="Enter additional links (comma-separated)"
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2"
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add New Project'}
          </Button>
        </form>
      </div>
    </>
  );
};

export default Createproject;
