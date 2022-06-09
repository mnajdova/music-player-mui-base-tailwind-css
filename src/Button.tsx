import * as React from 'react';
import ButtonUnstyled, { ButtonUnstyledProps } from '@mui/base/ButtonUnstyled';

const Button = React.forwardRef(function Button(props: ButtonUnstyledProps, ref: React.ForwardedRef<HTMLButtonElement>) {
  const { className, ...other } = props;
  return (<ButtonUnstyled className={`hover:text-cyan-500 transition-colors ${className}`} {...other} ref={ref} />);
});

export default Button;