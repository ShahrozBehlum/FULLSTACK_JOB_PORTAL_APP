import React, { useContext, useState, useEffect } from 'react'
import NavBar from '../components/NavBar.jsx'
import { assets, jobsApplied } from '../assets/assets.js'
import moment from 'moment'
import Footer from '../components/Footer.jsx'
import { AppContext } from '../context/AppContext.jsx'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Applications = () => {

  const [isEdit, setIsEdit] = useState(false)
  const [resume, setResume] = useState(null)

  const navigate = useNavigate();

  const { userData, backendUrl, userApplications, fetchUserData, fetchUserApplications, userToken } = useContext(AppContext)

  const updateResume = async () => {
  if (!resume) {
    toast.error("Please select a resume first");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("resume", resume);

    const token = localStorage.getItem("userToken");

    const { data } = await axios.post(
      `${backendUrl}/api/users/update-resume`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (data.success) {
      toast.success(data.message);

      // refresh user data after upload
      await fetchUserData(token);

      setIsEdit(false);
      setResume(null);
    } else {
      toast.error(data.message || "Resume upload failed");
    }

  } catch (error) {
    toast.error(
      error.response?.data?.message || "Something went wrong"
    );
  }
};

useEffect(() => {
  if (userToken){
    fetchUserApplications()
  }
},[userToken])
  return (
    <>
        <NavBar />
      <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
        <h2 className='text-xl font-semibold'>Your Resume</h2>
        <div className='flex gap-2 mb-6 mt-3'>
          {
            isEdit || userData && userData.resume === "" ? <>
              <label className='flex items-center' htmlFor="resumeUpload">
                <p className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2'>{resume ? resume.name : "Select resume"}</p>
                <input id='resumeUpload' onChange={e => setResume(e.target.files[0])} accept='application/pdf' type="file" hidden />
                <img src={assets.profile_upload_icon} alt="" />
              </label>
              <button onClick={updateResume} className='bg-green-100 border border-green-400 rounded-lg px-4 py-2 cursor-pointer'>Save</button>
            </>
              : <div className='flex gap-2'>
                <a className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg' href="">
                  Resume
                </a>
                <button onClick={() => setIsEdit(true)} className='text-gray-500 border border-gray-300 rounded-lg px-4 py-2 cursor-pointer'>
                  Edit
                </button>
              </div>
          }
        </div>

        <h2 className='text-xl font-semibold mb-4'>Jobs Applied</h2>
        <table className='min-w-full bg-white border border-gray-300 rounded-lg'>
          <thead>
            <tr>
              <th className='py-3 px-4 border-b text-left border-gray-300'>Company</th>
              <th className='py-3 px-4 border-b text-left border-gray-300'>Job Title</th>
              <th className='py-3 px-4 border-b text-left border-gray-300 max-sm:hidden'>Location</th>
              <th className='py-3 px-4 border-b text-left border-gray-300 max-sm:hidden'>Date</th>
              <th className='py-3 px-4 border-b text-left border-gray-300'>Status</th>
            </tr>
          </thead>
          <tbody>
            {userApplications.map((job, index) => true ? (
              <tr key={index}>
                <td className='px-4 py-3 flex items-center gap-2 border-b border-gray-300'>
                  <img className='w-8 h-8' src={job.companyId?.image} alt="" />
                  {job.companyId?.name}
                </td>
                <td className='py-2 px-4 border-b border-gray-300'>{job.jobId?.title}</td>
                <td className='py-2 px-4 border-b border-gray-300 max-sm:hidden'>{job.jobId?.location}</td>
                <td className='py-2 px-4 border-b border-gray-300 max-sm:hidden'>{moment(job?.date).format('ll')}</td>
                <td className='py-2 px-4 border-b border-gray-300'>
                  <span className={`${job.status === 'Accepted' ? 'bg-green-100' : job.status === 'Rejected' ? 'bg-red-100' : 'bg-blue-100'} px-4 py-1.5 rounded`}>
                    {job?.status}
                  </span>
                </td>
              </tr>
            ) : (null))}
          </tbody>
        </table>
      </div>
      <Footer />
        </>
      )}


export default Applications