export const Button = ({ children, ...props }) => (
  <button className="px-4 py-2 border border-teal-600 text-teal-600 rounded-full hover:bg-teal-100 transition" {...props}>
    {children}
  </button>
);