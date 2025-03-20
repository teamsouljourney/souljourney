import Swal from "sweetalert2";

export const SweetAlertIcons = {
  WARNING: "warning",
  ERROR: "error",
  SUCCESS: "success",
  INFO: "info",
  QUESTION: "question",
};

export const SweetNotify = (msg, icon, timer = 8000) => {
  Swal.fire({
    title: "Soul Journey!",
    text: msg,
    icon: icon,
    confirmButtonText: "OK",
    timer,
    timerProgressBar: true,
  });
};

export const SweetConfirm = async (title, text, icon, confirmButtonText = "Yes", cancelButtonText = "Cancel") => {
  const result = await Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText,
    cancelButtonText,
  });
  return result.isConfirmed;
};