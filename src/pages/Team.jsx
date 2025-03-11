import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TabSwitch from "../components/TabSwitch";
import HeroSection from "../components/team/HeroSection";
import Join from "../components/team/Join";
import TeamCard from "../components/team/TeamCard";
import useTherapistCall from "../hooks/useTherapistCall";
import { setSearchTerm } from "../features/therapistSlice";
import { useTranslation } from "react-i18next";
import Pagination from "../components/adminPanel/Pagination";

const Team = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {pagTherapists} = useSelector((state)=>state.pagination)
  const { therapists, filteredTherapists, searchTerm, loading } = useSelector((state) => state.therapists);
  const { selectedCategory } = useSelector((state) => state.categories);
  const { getAllTherapists, getFilterTherapists } = useTherapistCall();

  // Initial data fetch
  useEffect(() => {
    getAllTherapists();
  }, []);

  // Handle category selection
  const handleCategoryChange = (categoryId) => {
    if (categoryId) {
      getFilterTherapists(categoryId);
    }
  };

  // Handle search input change
  const handleSearchChange = (value) => {
    dispatch(setSearchTerm(value));
  };

  const displayedTherapists = selectedCategory
    ? (filteredTherapists?.length > 0
      ? filteredTherapists
      : therapists)
    : therapists;

  const displayedSearchTherapists =
    searchTerm.trim() === ""
      ? displayedTherapists
      : displayedTherapists?.filter((therapist) =>
          [therapist?.userName, therapist?.email]
            .filter(Boolean)
            .some((name) =>
              name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-seaGreen"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-y-10 bg-offWhite dark:bg-background-darker text-navy dark:text-offWhite-dark">
      {/* Hero Section */}
      <div className="w-full h-1/5">
        <HeroSection />
      </div>
      
      {/* Category Selection Section */}
      <TabSwitch
        itemType="therapists"
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        onAllDataFetch={getAllTherapists}
        placeholder={t("searchTherapist")}
      />

      {/* Therapist Cards Section */}
      <div className="w-full max-w-screen-2xl px-4 py-8">
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-10">
          {/* {pagTherapists?.map((therapist) => ( */}
          {displayedSearchTherapists?.map((therapist) => (
            <TeamCard therapist={therapist} key={therapist._id} />
          ))}
        </div>
      </div>
      {/* <Pagination endpoint={`therapists`} slice={"pagTherapists"} data={displayedSearchTherapists} /> */}
      <Join />
    </div>
  );
};

export default Team;
