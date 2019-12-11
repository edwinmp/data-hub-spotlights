import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

export interface LegendItemProps {
  className?: string;
  bgColor?: string;
  textColor?: string;
}

export const LegendItem: FunctionComponent<LegendItemProps> = ({ children, className }) =>
  <span className={ className } data-testid="spotlight-legend-item">
    { children }
  </span>;

export const StyledLegendItem = styled(LegendItem)`
  && {
    background-color: ${props => props.bgColor || 'inherit'}
    color: ${props => props.textColor || 'inherit'}
  }
`;
