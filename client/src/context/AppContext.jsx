import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";


export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [searchFilter, setSearchFilter] = useState({
        title: "",
        location: ""
    })

    const [isSearched, setIsSearched] = useState(false)

    const [jobs, setJobs] = useState([])

    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false)

    const [showUserLogin, setShowUserLogin] = useState(false)

    const [companyToken, setCompanyToken] = useState(null)
    const [companyData, setCompanyData] = useState(null)

    const [userData, setUserData] = useState(null)
    const [userApplications, setUserApplications] = useState([])
    const [userToken, setUserToken] = useState(null)

    //Function to fetch job data
    const fetchJobs = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/jobs/')

            if (data.success) {
                console.log(data.jobs);
                setJobs(data.jobs);

            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    //Function to feth company data
    const fetchCompanyData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/company/company', { headers: { token: companyToken } })

            if (data.success) {
                console.log(data);
                setCompanyData(data.data)

            } else {
                toast.error(data.message || "Data not found")
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchJobs()

        const storedCompanyToken = localStorage.getItem('companyToken')

        if (storedCompanyToken) {
            setCompanyToken(storedCompanyToken)
        }

    }, [])

    useEffect(() => {
        if (companyToken) {
            fetchCompanyData()
        }
    }, [companyToken])

    // Function to fetch user data
    const fetchUserData = async (token) => {
        try {
            const { data } = await axios.get(
                backendUrl + "/api/users/user",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (data.success) {
                setUserData(data.data);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message)
        }
    };

    // Function to fetch user's applied application data 
    const fetchUserApplications = async () => {
        try {

            const token = localStorage.getItem('userToken')
            const {data} = await axios.get(backendUrl+'/api/users/applications',{ headers: { Authorization: `Bearer ${token}`}}

            )

            if (data.success) {
                // console.log(data);
                
                setUserApplications(data.data)
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            toast.error(error.message)
        }


    }

    useEffect(() => {


        const storedUserToken = localStorage.getItem('userToken')

        if (storedUserToken) {
            setUserToken(storedUserToken)
            fetchUserData(storedUserToken);
            fetchUserApplications()
        }

    }, [])

    const value = {
        searchFilter, setSearchFilter,
        isSearched, setIsSearched,
        jobs, setJobs,
        showRecruiterLogin, setShowRecruiterLogin,
        companyData, setCompanyData,
        companyToken, setCompanyToken,
        backendUrl,
        showUserLogin, setShowUserLogin,
        userApplications, setUserApplications,
        userToken, setUserToken,
        userData, setUserData,
        fetchUserData, fetchUserApplications,
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

} 