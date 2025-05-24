export default function Notification({ message, success }: { message: string | undefined, success: boolean | undefined }) {
  return (
    <div
      className={`
        fixed left-1/2 transform -translate-x-1/2 top-3 z-50
        px-6 py-3 rounded-xl shadow-lg text-white text-sm font-semibold
        ${success ? "bg-green-500" : "bg-red-500"}
        transition-opacity duration-700 ease-out animate-mymove
      `}
    >
      {message}
    </div>
  );
}
