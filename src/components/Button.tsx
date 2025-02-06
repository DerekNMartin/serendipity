export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, ...props }: ButtonProps) {
  const classNames = `h-12 border-black border-3 p-2.5 bg-cyan-200 hover:bg-cyan-300 hover:shadow-[3px_3px_0px_rgba(0,0,0,1)] active:bg-cyan-400 rounded-md hover:cursor-pointer transition-all font-bold uppercase ${props.className}`;

  return (
    <button {...props} className={classNames}>
      {children}
    </button>
  );
}
