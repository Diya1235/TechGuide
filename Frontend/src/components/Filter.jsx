import React, { useEffect, useState } from 'react';
import { RadioGroup } from './ui/radio-group';
import { RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setsearchedQuery } from '@/redux/projectsSlice';

const filterdata = [
  {
    filterType: 'Category',
    array: ['Web Development', 'Application Development', 'IOT Based'],
  },
  {
    filterType: 'Role',
    array: [
      'Frontend Developer',
      'Backend Developer',
      'Fullstack Developer',
      'IOT Expert',
      'Data analyst',
      'Android developer',
      'MERN developer',
      'Tester',
    ],
  },
  {
    filterType: 'Tech Stack',
    array: [
      'HTML',
      'MERN stack',
      'JavaScript',
      'Fundamentals of Java',
      'Java Full stack',
      'Kotlin',
      'Flutter',
      'Python',
      'C++',
      'Arduino',
      'Raspberry pi',
    ],
  },
];

const Filter = () => {
  const [selectedValue,setSelectedValue]= useState('');
  const dispatch = useDispatch();
  const changeHandler = (value) =>{
    setSelectedValue(value);
  }
  useEffect(()=>{
  dispatch(setsearchedQuery(selectedValue));
  },[selectedValue]);

  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="text-lg font-bold">Filter Projects</h1>
      <hr className="mt-3 border-t-4 border-blue-500" />
      <RadioGroup value={selectedValue} onValueChange= {changeHandler}>
        {
          filterdata.map((data,index)=>(
            <div>
              <h1 className='font-bold text-lg'>{data.filterType}</h1>
              {
                data.array.map((item,ix) => {
                  const itemId = `id${index}-${ix}`
                  return(
                    <div className='flex items-center space-x-2 my-2'>
                      <RadioGroupItem value={item} id={itemId}/>
                      <Label htmlFor={itemId}>{item}</Label>
                      </div>
                  )
                })
              }
            </div>
          ))
        }
      </RadioGroup>
      </div>)
};

export default Filter;
