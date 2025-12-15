import {ButtonHTMLAttributes, FC} from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
    rounded-full cursor-pointer transition duration-200 ease-in-out hover:bg-accent-hover active:bg-accent-active
    hover:text-white active:text-white
    ${variant === 'primary' ? 'bg-accent  text-white' : ''}
    ${variant === 'secondary' ? 'bg-secondary text-[#5A5A5A]' : ''}
    ${variant === 'border' ? 'outline-white outline-[1px] outline-offset-[-2px] text-white hover:bg-accent ' +
    'hover:outline-accent active:outline-accent-active' : ''}
    ${size === 'md' ? 'h-10' : ''}
    ${size === 'sm' ? 'h-8' : ''}
    ${className ? className : ''}
    `} {...props}>
      {children}
    </button>
  );
};

export default Button;