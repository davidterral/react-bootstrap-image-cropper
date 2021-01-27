import React from "react";
import { Button, Image } from "react-bootstrap";
import useObjectURL from "use-object-url";

export function InputButton({
  width,
  height,
  children = "Click Here to Select an Image",
  onClick
}) {
  return (
    <div style={{ border: '2px solid black' }}>
      <Button variant="light" onClick={onClick} style={{ width, height }}>
        {children}
      </Button>
    </div>
  );
}

export function InputPreview({ width, height, imageFile, onClick }) {
  const url = useObjectURL(imageFile);
  return (
    <div style={{ border: '1px solid gray' }}>
      <Image
        style={{ width, height, cursor: "pointer", objectFit: "contain" }}
        src={url}
        onClick={onClick}
      />
    </div>

  );
}

export default function CropImageInput({
  imageFile,
  children,
  width,
  height,
  onClick
}) {
  if (imageFile) {
    return (
      <InputPreview
        imageFile={imageFile}
        width={width}
        height={height}
        onClick={onClick}
      />
    );
  } else {
    return (
      <InputButton
        children={children}
        width={width}
        height={height}
        onClick={onClick}
      />
    );
  }
}
