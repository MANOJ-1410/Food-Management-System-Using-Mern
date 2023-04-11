export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      if (state.cartItems && state.cartItems.length > 0) {
        const alreadyExists = state.cartItems.find((item) => item._id === action.payload._id);
        if (alreadyExists) {
          return {
            ...state,
            cartItems: state.cartItems.map((item) =>
              item._id === action.payload._id ? action.payload : item
            ),
          };
        } else {
          const newCartItem = { ...action.payload, quantity: Number(action.payload.quantity) };
          return {
            ...state,
            cartItems: [...state.cartItems, newCartItem],
          };
        }
      } else {
        const newCartItem = { ...action.payload, quantity: Number(action.payload.quantity) };
        return {
          ...state,
          cartItems: [newCartItem],
        };
      }
    case "DELETE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item._id !== action.payload._id),
      };
    default:
      return state;
  }
};
