import React from "react";
import styled, { css } from "styled-components";
import { MAX_DISK_HEIGHT } from "../util/constants";
import { Disk } from "./Disk";

const Wrapper = styled.div<{
  width: number;
  isHolding: boolean;
  numDisks: number;
  diskHeight: number;
  numChildren: number;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  width: ${(p) => p.width}%;
  height: min(
    calc(100vh - 125px),
    ${(p) => (p.numDisks + 3) * MAX_DISK_HEIGHT}px
  );

  ${Disk}:first-child {
    position: absolute;
    bottom: ${(p) => p.diskHeight * (p.numChildren - 1)}px;
    ${({ isHolding, numDisks }) =>
      isHolding &&
      css`
        // transition: bottom 0.3s linear;
        bottom: ${(numDisks + 3) * MAX_DISK_HEIGHT + 40}px;
      `};
  }
`;

const PegWrapper = styled.div`
  position: absolute;
  width: inherit;
  bottom: 0;
`;

const Peg = styled.div<{ numDisks: number }>`
  left: 50%;
  transform: translateX(-50%);
  z-index: -1;
  position: relative;
  background-color: orange;
  width: 10px;
  border-radius: 4px;
  height: min(
    calc(100vh - 125px),
    ${(p) => (p.numDisks + 3) * MAX_DISK_HEIGHT}px
  );
`;

interface Props {
  width: number;
  showPeg: boolean;
  children: React.ReactNode;
  numDisks: number;
  diskHeight: number;
  isHolding: boolean;
  onClick: () => void;
}

export const Stack = ({
  width,
  showPeg,
  children,
  numDisks,
  diskHeight,
  isHolding,
  onClick,
}: Props) => {
  return (
    <Wrapper
      width={width}
      isHolding={isHolding}
      numDisks={numDisks}
      diskHeight={diskHeight}
      numChildren={React.Children.count(children)}
    >
      {children}
      {showPeg && (
        <PegWrapper onClick={onClick}>
          <Peg numDisks={numDisks} />
        </PegWrapper>
      )}
    </Wrapper>
  );
};
