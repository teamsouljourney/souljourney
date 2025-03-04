
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import TabSwitch from "../components/TabSwitch"
import HeroSection from "../components/team/HeroSection"
import Join from "../components/team/Join"
import TeamCard from "../components/team/TeamCard"
import useTherapistCall from "../hooks/useTherapistCall"
import { setSearchTerm } from "../features/therapistSlice"
import { useTranslation } from "react-i18next"

const Team = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { therapists, filteredTherapists, searchTerm, loading } = useSelector((state) => state.therapists)
  const { getAllTherapists, getFilterTherapists } = useTherapistCall()

  // Initial data fetch
  useEffect(() => {
    getAllTherapists()
  }, []) 

  // Handle category selection
  const handleCategoryChange = (categoryId) => {
    
    if (categoryId) {
      getFilterTherapists(categoryId)
    } 
  }

  // Handle search input change
  const handleSearchChange = (value) => {
    dispatch(setSearchTerm(value))
  }

  



  // Filter therapists by search term if provided
  // const filteredBySearch = searchTerm
  //   ? displayTherapists.filter(
  //       (therapist) =>
  //         therapist.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //         therapist.lastName.toLowerCase().includes(searchTerm.toLowerCase()),
  //     )
  //   : displayTherapists

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-seaGreen"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-offWhite dark:bg-background-darker text-navy dark:text-offWhite-dark">
      <HeroSection />

      <TabSwitch
        itemType="therapists"
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        onAllDataFetch={getAllTherapists}
        placeholder={t("searchTherapist")}
      />

      <TeamCard 
        // therapists={filteredBySearch} 
      />
      <Join />
    </div>
  )
}

export default Team

