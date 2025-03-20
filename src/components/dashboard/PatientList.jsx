import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import useAppointmentCall from "../../hooks/useAppointmentCall"
import { useEffect, useState } from "react"
import Notes from "./Notes"

const PatientList = () => {
  const { t } = useTranslation()
  const [filteredAppointments, setFilteredAppointments] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const { currentUser } = useSelector((state) => state.auth)
  const { currentUserAppointments } = useSelector((state) => state.appointments)
  const { getUserAppointments } = useAppointmentCall()
  const { userStatuses } = useSelector((state) => state.chats)

  useEffect(() => {
    if (currentUser?._id) {
      getUserAppointments(currentUser._id)
    }
  }, [currentUser])

  useEffect(() => {
    // Get unique patients from appointments
    const getUniquePatients = () => {
      return Array.from(
        new Map(currentUserAppointments.map((appointment) => [appointment.userId?._id, appointment])).values(),
      )
    }

    setFilteredAppointments(getUniquePatients())
  }, [currentUserAppointments])

  const handleChange = (e) => {
    const searchTerm = e.target.value.toLowerCase()
    setSearchTerm(searchTerm)

    if (!searchTerm) {
      // Show all unique patients when search is empty
      const uniquePatients = Array.from(
        new Map(currentUserAppointments.map((appointment) => [appointment.userId?._id, appointment])).values(),
      )
      setFilteredAppointments(uniquePatients)
      return
    }

    const uniqueFilteredPatients = Array.from(
      new Map(
        currentUserAppointments
          .filter((appointment) => appointment.userId?.firstName.toLowerCase().startsWith(searchTerm))
          .map((appointment) => [appointment.userId?._id, appointment]),
      ).values(),
    )

    setFilteredAppointments(uniqueFilteredPatients)
  }

  if (!currentUser || currentUser?.isTherapist !== true) {
    return null
  }

  return (
    <div className="w-full p-4 sm:p-6 md:p-8 xl:w-1/2">
      <div className="relative z-10 w-full">
        {/* Header */}
        <div className="flex justify-center px-4 py-2 mb-3 text-center rounded-xl bg-seaGreen-dark">
          <p className="text-base sm:text-lg md:text-xl text-offWhite">{t("patientList")}</p>
        </div>

        {/* Search Form */}
        <form action="/search" className="w-full" onChange={handleChange}>
          <div className="relative">
            <input
              type="text"
              name="q"
              className="w-full h-10 px-4 py-2 border shadow rounded-xl border-seaGreen-dark dark:border-seaGreen-dark dark:text-customBlack-dark"
              placeholder={t("searchPatient")}
            />
            <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2" aria-label="Search">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </div>
        </form>

        {/* Patient List */}
        {filteredAppointments.length === 0 ? (
          <p className="mt-3 text-xs text-gray-500 md:text-sm">{t("noPatient")}</p>
        ) : (
          <ul className="mt-4 sm:mt-6 md:mt-8 divide-y divide-offWhite-dark dark:divide-gray-700">
            {filteredAppointments?.map(({ userId }, index) => (
              <li
                key={index}
                className="flex items-center transition-colors duration-200 rounded-md hover:bg-offWhite dark:hover:bg-navy"
              >
                <span className="w-2 h-16 md:h-20 bg-seaGreen-dark rounded-r-md" />
                <div className="flex flex-1 gap-2 p-2 sm:gap-3 sm:p-3 md:p-4 md:gap-4">
                  {/* Avatar */}
                  <div className="shrink-0">
                    <img
                      className="w-10 h-10 sm:w-12 sm:h-12 md:h-14 md:w-14 rounded-full object-cover"
                      src={userId?.image || "/placeholder.svg"}
                      alt={`${userId?.firstName} ${userId?.lastName}`}
                    />
                  </div>

                  {/* Patient Info */}
                  <div className="flex-1 min-w-0 flex items-center justify-between">
                    {/* Name and Email */}
                    <div className="max-w-[calc(100%-60px)] sm:max-w-none">
                      <p className="text-sm font-semibold md:text-base text-navy dark:text-offWhite-light truncate">
                        {userId?.firstName.toUpperCase()} {userId?.lastName.toUpperCase()}
                      </p>
                      <p className="mt-1 text-xs text-gray-500 md:text-sm truncate">{userId?.email}</p>
                    </div>

                    {/* Notes Button */}
                    <div className="mt-2 sm:mt-0 sm:ml-2">
                      <Notes currentUser={currentUser} userId={userId} />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default PatientList

