export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full max-w-xl">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m20 20-4-4"
        />
      </svg>

      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder="Search photos by author..."
        aria-label="Search photos by author"
        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
      />
    </div>
  );
}