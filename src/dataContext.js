import React, {createContext, useState, useEffect} from 'react';
import Prismic from '@prismicio/client'



export const DataContext = createContext();

export const DataProvider = ({children}) => {
    const [pageData, setPageData] = useState(null)
    const [projectsData, setProjectsData] = useState(null);
    const [showProject, setShowProject] = useState(false);
    const [showContact, setShowContact] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);
    

    const apiEndpoint = process.env.REACT_APP_PRISMIC_API_ENDPOINT
    const accessToken = process.env.REACT_APP_PRISMIC_ACCESS_TOKEN

    const Client = Prismic.client(apiEndpoint, { accessToken });

    // Load prismic data on mount
    useEffect(() => {
        const fetchData = async () => {
          const page = await Client.query( Prismic.Predicates.at('document.type', 'page'));
          if (page) {
            setPageData(page.results[0].data);
          }
        }
        fetchData()
      }, [])

      useEffect(() => {
        const fetchData = async () => {
        const projects = await Client.query( Prismic.Predicates.at('document.type', 'project'));
          if (projects) {
            setProjectsData(projects.results);
          }
        }
        fetchData()
      }, [])

    return (
        <div>
            <DataContext.Provider value={{pageData, projectsData, showProject, setShowProject, showContact, setShowContact, currentProject, setCurrentProject}}>
                {children}
            </DataContext.Provider>
        </div>
    )
}