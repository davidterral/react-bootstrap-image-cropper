import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, Spinner, Col, Row } from "react-bootstrap";
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { withStyles } from '@material-ui/core/styles';
import useObjectURL from "use-object-url";

import CropImagePanel from "./CropImagePanel";
import { getCroppedFile, limitImageSize } from "./utils";

const CustomSlider = withStyles({
  root: {
    color: '#68b921',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

export default function CropImageModal({
  show,
  imageFile,
  value, // crop value
  onChange, // on crop value change
  onConfirm, // (croppedFile) => void
  onCancel, // void => void
  onRemove, // void => void
  inputOptions = {}, // {maxWidth, maxHeight, mimeType, quality}
  cropOptions = {}, // {aspect, maxZoom}
  outputOptions = {}, // {maxWidth, maxHeight, mimeType, quality}
  displayOptions = {} // {title, removeButtonText, confirmButtonText, showRemoveButton, showConfirmButton}
}) {
  const {
    maxWidth: inputMaxWidth = Infinity,
    maxHeight: inputMaxHeight = Infinity,
    mimeType: inputMimeType = "image/jpeg",
    quality: inputQuality
  } = inputOptions;

  const { aspect, maxZoom } = cropOptions;

  const {
    maxWidth = Infinity,
    maxHeight = Infinity,
    mimeType = "image/jpeg",
    quality
  } = outputOptions;

  const {
    title = "Crop Image",
    removeButtonText = "Remove",
    confirmButtonText = "Confirm",
    showRemoveButton = true,
    showConfirmButton = true
  } = displayOptions;

  const imageUrl = useObjectURL(imageFile);

  const [resizedUrl, setResizedUrl] = useState();
  const [resizing, setResizing] = useState(false);

  useEffect(() => {
    if (imageUrl) {
      setResizing(true);
      limitImageSize({
        imageUrl,
        maxWidth: inputMaxWidth,
        maxHeight: inputMaxHeight,
        mimeType: inputMimeType,
        quality: inputQuality
      })
        .then(url => setResizedUrl(url))
        .catch(err => console.error(err))
        .finally(() => setResizing(false));
    } else {
      setResizedUrl();
    }
  }, [imageUrl]);

  const cropResultRef = useRef();

  function handleCropComplete(croppedArea, croppedAreaPixels) {
    cropResultRef.current = { croppedArea, croppedAreaPixels };
  }

  function handleConfirm() {
    getCroppedFile(
      resizedUrl,
      cropResultRef.current.croppedAreaPixels,
      maxWidth,
      maxHeight,
      mimeType,
      quality
    ).then(onConfirm);
  }

  function handleZoomChange(event, value) {
    onChange(prevValue => {
      return { ...prevValue, zoom: value }
    })
  }

  return (
    <Modal show={show} onHide={onCancel} size="lg" backdrop="static" centered>
      <Modal.Header closeButton>
        <Row>
          <Col xs={12} md={8}>
            <Modal.Title style={{ color: '#8c8c8d', fontSize: '18' }}>{title}</Modal.Title>
          </Col>
          <Col xs={6} md={4} />
        </Row>
        <Row>
          <Col xs={6} md={4}>
            <Button variant="outline-secondary">Change Image</Button>
          </Col>
          <Col xs={6} md={4} />
          <Col xs={6} md={4}>
            <div style={{ color: '#b3b1b1', fontSize: '14' }}>{headerText}</div>
          </Col>
        </Row>
      </Modal.Header>
      <Modal.Body style={{ height: "50vh" }}>
        {resizing && (
          <div className="d-flex justify-content-center align-items-center h-100">
            <Spinner animation="grow" />
          </div>
        )}
        {resizedUrl && (
          <CropImagePanel
            imageUrl={resizedUrl}
            value={value}
            onChange={onChange}
            onCropComplete={handleCropComplete}
            aspect={aspect}
            maxZoom={maxZoom}
          />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Grid container spacing={2} style={{ marginLeft: '20px', marginRight: 'auto', maxWidth: '40%' }}>
          <Grid item>
            <RemoveCircleOutlineIcon color="disabled" />
          </Grid>
          <Grid item xs>
            <CustomSlider
              value={value ? value.zoom || 1 : 1}
              defaultValue={1}
              max={maxZoom}
              step={0.1}
              onChange={handleZoomChange}
            />
          </Grid>
          <Grid item>
            <AddCircleOutlineIcon color="disabled" />
          </Grid>
        </Grid>

        {showRemoveButton && (
          <Button variant="light" onClick={onRemove}>
            {removeButtonText}
          </Button>
        )}
        {showConfirmButton && (
          <Button onClick={handleConfirm} style={{ backgroundColor: '#68b921', border: 'none' }}>
            {confirmButtonText}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
