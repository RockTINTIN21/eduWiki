import {ButtonHTMLAttributes, FC} from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLDivElement> {
  loading?: boolean;
  className?: string;
  variant?: 'primary' | 'secondary' | 'border';
  size?: 'sm' | 'md' | 'lg';
}

const Button: FC<ButtonProps> = ({
  children,
  loading,
  variant = 'primary',
  disabled,
  className,
  size = 'md',
  ...props
}) => {
  return (
    <button className={`
    rounded-full pe-7 ps-7 cursor-pointer transition duration-200 ease-in-out font-medium
    ${variant === 'primary' && 'bg-accent hover:bg-accent-hover active:bg-accent-active text-white'}
    ${variant === 'secondary' && 'bg-secondary text-black'}
    ${variant === 'border' && 'outline-white outline-[1px] outline-offset-[-2px] text-white hover:bg-accent ' +
    'hover:outline-accent active:outline-accent-active'}
    ${size === 'md' && 'h-10'}
    ${className ? className : ''}
    `}>
      {children}
    </button>
  );
};

export default Button;