import { styled } from "@pigment-css/react";
import { HTMLAttributes } from "react";

interface IAvatarProps extends HTMLAttributes<HTMLImageElement> {
  width?: string;
  height?: string;
}

const AvatarImage = styled.img({
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  objectFit: "cover",
  display: "block",
});

const AvatarContainer = styled.div({
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  overflow: "hidden",
  flexShrink: 0,
});

export default AvatarImage;
