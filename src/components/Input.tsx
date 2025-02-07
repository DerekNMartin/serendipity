export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const classNames = `w-96 h-12 border-black border-3 p-2.5 focus:outline-none focus:shadow-[3px_3px_0px_rgba(0,0,0,1)] focus:bg-fuchsia-400 active:shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-md transition-all font-bold ${props.className}`;

  return <input {...props} className={classNames} />;
}
