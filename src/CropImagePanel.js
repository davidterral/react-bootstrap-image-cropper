import Cropper from "react-easy-crop";
import React from "react";

export default function CropImagePanel({
  imageUrl,
  value,
  onChange,
  onCropComplete,
  aspect,
  maxZoom
}) {
  const { crop, zoom } = value || {
    crop: { x: 0, y: 0 },
    zoom: 1
  };

  function handleCropChange(crop) {
    onChange({ crop, zoom });
  }

  function handleZoomChange(zoom) {
    onChange({ crop, zoom });
  }

  return (
    <div style={{ margin: '0px 40px' }}>
      <Cropper
        image={imageUrl}
        maxZoom={maxZoom}
        aspect={aspect}
        crop={crop}
        zoom={zoom}
        onCropChange={handleCropChange}
        onZoomChange={handleZoomChange}
        onCropComplete={onCropComplete}
        restrictPosition={false}
      />
    </div>
  );
}
