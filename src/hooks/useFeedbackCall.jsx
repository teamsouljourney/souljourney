import { useDispatch } from "react-redux"
import { fetchFail, fetchStart, getAllFeedbacksSuccess, getSingleTherapistFeedbacksSuccess } from "../features/feedbackSlice"
import { toastErrorNotify } from "../helper/ToastNotify"
import useAxios, { axiosPublic } from "./useAxios"

const useFeedbackCall = () => {
  const dispatch = useDispatch()
  const axiosWithToken = useAxios()

  const getAllFeedbacks = async () => {
    dispatch(fetchStart())
    try {
      const {data} = await axiosPublic.get("feedbacks")
      dispatch(getAllFeedbacksSuccess(data))
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify(
        error.response.data.message,
        "Failed to fetch all feedbacks!"
      )
    }
  }

  const getSingleTherapistFeedbacks = async (therapistId) => {
    dispatch(fetchStart())
    try {
      const {data} = await axiosPublic.get(`feedbacks/therapists/${therapistId}`)
      dispatch(getSingleTherapistFeedbacksSuccess(data.data))
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify(
        error.response.data.message,
        "Failed to fetch Therapist's feedbacks!"
      )
    }
  }

  const postTherapistFeedback = async (info) => {
    dispatch(fetchStart())
    try {
      await axiosWithToken.post("feedbacks", info)      
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify(
        error.response.data.message,
        "Failed to post Therapist's feedbacks!"
      )
    }
  }


  return {
    getAllFeedbacks,
    getSingleTherapistFeedbacks,
    postTherapistFeedback
  }
}

export default useFeedbackCall