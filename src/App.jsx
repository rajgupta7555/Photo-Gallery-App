
import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

import useFetchPhotos from "./hooks/useFetchPhotos";
import {
  favouritesReducer,
  getInitialFavourites,
} from "./reducers/favouritesReducer";

import PhotoCard from "./components/PhotoCard";
import SearchBar from "./components/SearchBar";
import LoadingSpinner from "./components/LoadingSpinner";

const STORAGE_KEY = "photo-gallery-favourites";

export default function App() {
  
  const { photos, loading, error } = useFetchPhotos();

  
  const [searchQuery, setSearchQuery] = useState("");

  
  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    undefined,
    getInitialFavourites
  );

   
  const handleSearchChange = useCallback((event) => {
    setSearchQuery(event.target.value);
  }, []);

   
  const handleToggleFavourite = useCallback((photo) => {
    dispatch({
      type: "TOGGLE_FAVOURITE",
      payload: photo,
    });
  }, []);

  
  const filteredPhotos = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return photos;

    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(query)
    );
  }, [photos, searchQuery]);

  
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(favourites)
      );
    } catch (err) {
      console.error("Unable to save favourites:", err);
    }
  }, [favourites]);

  
  const favouriteIds = useMemo(
    () => new Set(favourites.map((photo) => photo.id)),
    [favourites]
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 sm:px-6 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
              Discover & Collect
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Photo Gallery
            </h1>

            <p className="mt-2 text-slate-500">
              Explore beautiful photos and save your favourites.
            </p>
          </div>

          {/* Search */}
          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
          />

          {/* Gallery statistics */}
          <div className="flex flex-wrap items-center gap-5 text-sm">
            <p className="text-slate-500">
              {loading
                ? "Loading photos..."
                : `${filteredPhotos.length} ${
                    filteredPhotos.length === 1 ? "photo" : "photos"
                  } found`}
            </p>

            <p className="font-medium text-rose-500">
              ♥ {favourites.length} favourites
            </p>
          </div>
        </div>
      </header>

      {/* Gallery */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div
            className="rounded-xl border border-red-200 bg-red-50 p-6 text-center"
            role="alert"
          >
            <h2 className="font-semibold text-red-700">
              Unable to load photos
            </h2>

            <p className="mt-2 text-sm text-red-600">
              {error}
            </p>

            <p className="mt-2 text-sm text-red-600">
              Please check your internet connection and refresh the page.
            </p>
          </div>
        ) : filteredPhotos.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <h2 className="text-lg font-semibold text-slate-800">
              No photos found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Try another author name.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredPhotos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                isFavourite={favouriteIds.has(photo.id)}
                onToggleFavourite={handleToggleFavourite}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-8 border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 text-center text-sm text-slate-500">
          Photo Gallery · Powered by Picsum Photos
        </div>
      </footer>
    </div>
  );
}
