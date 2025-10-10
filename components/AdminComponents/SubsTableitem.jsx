import React from 'react'
import { Trash2 } from "lucide-react";
const SubsTableitem = ({email,mongoId,deleteEmail,date}) => {
    
    const emailDate=new Date(date);

  return (
    <tr className="bg-white border-b text-left hover:bg-gray-50">
       <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
         {email?email:'no email'}
       </th>
       <td className='px-6 py-4 hidden sm:block'>{emailDate.toDateString()}</td>
       <td onClick={()=> deleteEmail(mongoId)} className='px-6 py-4 cursor-pointer text-red-500 hover:text-red-700 transition-all"'>
        <Trash2 size={18}/>
        </td>
    </tr>
  )
}

export default SubsTableitem