/**
 * Button component.
 */
export function SubmitButton({ text }: { text: string }) {
  return (
    <button
      type="submit"
      className="bg-green-500 hover:bg-opacity-80 p-2 mt-2 rounded-md text-white text-sm text-center shadow-lg"
    >
      {text}
    </button>
  );
}
