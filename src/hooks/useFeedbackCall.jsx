import { useDispatch } from "react-redux"
import { fetchFail, fetchStart, getAllFeedbacksSuccess } from "../features/feedbackSlice"
import { toastErrorNotify } from "../helper/ToastNotify"
import { axiosPublic } from "./useAxios"

const useFeedbackCall = () => {
  const dispatch = useDispatch()

  const getAllAppointments = async () => {
    dispatch(fetchStart())
    try {
      const {data} = await axiosPublic.get("feedback")
      dispatch(getAllFeedbacksSuccess(data))
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify(
        error.response.data.message,
        "Failed to fetch feedbacks!"
      )
    }
  }


  return {}
}

export default useFeedbackCall