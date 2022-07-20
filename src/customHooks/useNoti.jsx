import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const useNoti = (typeMessage) => {
  const dispatch = useDispatch();

  const checkDataStatus = (apiResponse) => {
    const { statusCode } = apiResponse;
    if (statusCode === 200) {
    }

    switch (statusCode) {
      case 200: {
        toast.success(`${typeMessage} successfullt`);
        break;
      }
      case 403: {
        toast.error("Unauthorized, please contact the project owner!");
        break;
      }

      default:
        break;
    }
  };

  return { checkDataStatus };
};

export default useNoti;
