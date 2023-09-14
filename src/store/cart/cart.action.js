import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

const fetchCartCountFromAPI = async (userId, cartId) => {
  try {
    const apiUrl = process.env.REACT_APP_BE_API_URL;
    const url = apiUrl + `/cart/count?userId=${userId}&cartId=${cartId}`;
    const response = await fetch(url, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzUxMiJ9.eyJzZWNyZXQiOiJiZmE3MzhhNjdkOGU5NGNmNDI4ZTdjZWE5Y2E1YzY3YiJ9.o4k544e1-NWMTBT28lOmEJe_D4TMOuwb11_rXLWb_SNhd6Oq70lWWqVdHzenEr1mhnVTDAtcOufnc4CMlIxUiw",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.data.cartCount;
    } else {
      console.error("API request failed with status:", response.status);
    }
  } catch (error) {
    console.error("Error fetching cart count:", error);
  }
  return 0;
};

export const storeCartCount = (userId, cartId) => {
  return async (dispatch) => {
    try {
      const cartCount = await fetchCartCountFromAPI(userId, cartId);
      dispatch(createAction(CART_ACTION_TYPES.SET_CART_COUNT, cartCount));
    } catch (error) {
      console.error("Error storing cart count:", error);
    }
  };
};
