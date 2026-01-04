import { User } from 'lucide-react';
import Tag from './Tag';

function TasksCard({}) {
  return (
    <div className='bg-white border border-gray-200 rounded-md p-4 hover:shadow-md hover:border-gray-400 cursor-pointer'>
      <h2 className='text-xl text-wrap'>Task Name </h2>
      <Tag/>
      <p className='text-sm pt-2'>Start Time: Today</p>
      <div className='flex pt-2'>
        <User className='border border-gray-300 rounded-full p-1 bg-gray-100'/>
        <span className='pl-2 '>John Doe</span>
      </div>
    </div>
  )
}
export default TasksCard

