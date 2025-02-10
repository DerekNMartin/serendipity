export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`h-12 border-black border-3 p-2.5 bg-cyan-200 hover:bg-cyan-300 not-disabled:hover:shadow-[3px_3px_0px_rgba(0,0,0,1)] active:bg-cyan-400 rounded-md not-disabled:hover:cursor-pointer transition-all font-bold uppercase disabled:bg-neutral-200 disabled:cursor-not-allowed ${props.className}`}
    >
      {children}
    </button>
  );
}
