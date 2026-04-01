import type { ReactNode } from 'react';
import { Col as BsCol, type ColProps as BsColProps } from 'react-bootstrap';
import { ColTypeKey } from '../../../Interfaces/Common';

interface Props extends BsColProps {
  colType?: ColTypeKey;
  children: ReactNode;
}

export const Col = ({ colType = ColTypeKey.FULL, children, ...props }: Props) => {
  return (
    <BsCol 
      xs={12} 
      md={colType} 
      {...props}
    >
      {children}
    </BsCol>
  );
}