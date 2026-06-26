import {useNavigation, useLocation} from "react-router-dom";

function BackButton(){
    const navigation = useNavigation();
    const location = useLocation();

const handleBack = () => {
  if (location.state?.from) {
    navigate(location.state.from);
  } 
  else if (location.key !== "default") {
    navigate(-1);
  } 
  else {
    navigate(fallback || "/");
  }
};
    return (
        <button onClick={handleBack}>
            Back
        </button>
    );
}