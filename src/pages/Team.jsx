import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TabSwitch from "../components/TabSwitch";
import HeroSection from "../components/team/HeroSection";
import Join from "../components/team/Join";
import TeamCard from "../components/team/TeamCard";
import useTherapistCall from "../hooks/useTherapistCall";
import { setSearchTerm } from "../features/therapistSlice";
import { useTranslation } from "react-i18next";

const Team = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { therapists, filteredTherapists, searchTerm, loading } = useSelector(
    (state) => state.therapists
  );
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
    ? filteredTherapists.length > 0
      ? filteredTherapists
      : therapists
    : therapists;

  const displayedSearchTherapists =
    searchTerm.trim() === ""
      ? displayedTherapists
      : displayedTherapists?.filter((therapist) =>
          [therapist.userName, therapist.email]
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
    <div className="min-h-screen bg-offWhite dark:bg-background-darker text-navy dark:text-offWhite-dark">
      <HeroSection />
      {/* Category Select Section */}
      <TabSwitch
        itemType="therapists"
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        onAllDataFetch={getAllTherapists}
        placeholder={t("searchTherapist")}
      />

      {/* Therapist Cards Section */}
      <div className="flex items-center justify-center p-4 border border-red-700">
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 lg:gap-14 mx-4 border border-red-700">
          {displayedSearchTherapists.map((therapist) => (
            <TeamCard therapist={therapist} key={therapist._id} />
          ))}
        </div>
      </div>
      
      <Join />
    </div>
  );
};

export default Team;
