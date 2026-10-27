const STORAGE_KEY = "photo-gallery-favourites";


export function getInitialFavourites() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return [];

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}


export function favouritesReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_FAVOURITE": {
      const photo = action.payload;

      const exists = state.some((item) => item.id === photo.id);

      if (exists) {
        return state.filter((item) => item.id !== photo.id);
      }

      return [...state, photo];
    }

    default:
      return state;
  }
}