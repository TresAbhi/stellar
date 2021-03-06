import { forwardRef, InputHTMLAttributes, MouseEvent } from 'react';
import styles from './index.module.scss';

export interface ButtonProps extends InputHTMLAttributes<HTMLButtonElement> {
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  color?: 'regular'; // add more as needed in the future
}
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, href, target, onClick, color = 'regular', ...props }, ref) => {
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      if (href) window.open(href, target);
      if (onClick) onClick(event);
    };

    return (
      //@ts-ignore
      <button
        {...props}
        className={`${styles.button} ${styles[color]} ${props.className ?? ''}`}
        onClick={handleClick}
        ref={ref}
      >
        {children}
      </button>
    );
  },
);
export default Button;
