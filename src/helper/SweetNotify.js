import Swal from "sweetalert2";

export const SweetAlertIcons = {
  WARNING: "warning",
  ERROR: "error",
  SUCCESS: "success",
  INFO: "info",
};

export const SweetNotify = (msg, icon) => {
  Swal.fire({
    title: "Soul Journey!",
    text: msg,
    icon: icon,
    confirmButtonText: "OK",
    timer: 8000,
    timerProgressBar: true,
  });
};
