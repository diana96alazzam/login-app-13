/**
 * Loading spinner component.
 */
export function Spinner({ isLoading }: { isLoading: boolean }) {
  return (
    isLoading && (
      <div className="w-full h-full flex justify-center items-center">
        <div
          className="text-green-500 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    )
  );
}
