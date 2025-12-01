import {ButtonHTMLAttributes, FC} from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLDivElement> {
  loading?: boolean;
  className?: string;
  variant?: 'primary' | 'secondary';
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
    rounded-full pe-7 ps-7 cursor-pointer
    ${variant === 'primary' ? 'bg-accent hover:bg-accent-hover' : 'bg-secondary'} 
    ${size === 'md' && 'h-10'}
    `}>
      {children}
    </button>
  );
};

export default Button;