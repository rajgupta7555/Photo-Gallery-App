export default function LoadingSpinner() {
  return (
    <div
      className="flex min-h-64 flex-col items-center justify-center gap-4"
      role="status"
    >
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />

      <p className="text-sm font-medium text-slate-600">
        Loading beautiful photos...
      </p>
    </div>
  );
}