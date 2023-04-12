import { tourSliceActions } from "./tour-slice";

export const fetchAllTours = () => {
  return async (dispatch) => {
    dispatch(tourSliceActions.setIsLoading(true))
    try {
      const response = await fetch("http://localhost:8080/api/v1/tours?page=1&limit=4");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json();
      dispatch(tourSliceActions.setHasError(null))
      dispatch(tourSliceActions.populateTours(data.data.tours));
    } catch (err) {
      dispatch(tourSliceActions.setHasError(err.message))
    }
    dispatch(tourSliceActions.setIsLoading(false))
  };
};
