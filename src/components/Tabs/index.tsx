import { FC, InputHTMLAttributes } from 'react';
import './index.scss';

export const Container: FC<InputHTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
}) => (
  <div
    className={`
      tabs-container
      ${className}
    `}
  >
    {children}
  </div>
);

type TabProps = {
  selected?: boolean;
};
export const Tab: FC<TabProps> = ({ children, selected = false }) => (
  <button
    className={`
      tab
      ${selected ? 'selected' : ''}
    `}
  >
    {children}
  </button>
);