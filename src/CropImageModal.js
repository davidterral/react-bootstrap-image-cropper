import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, Spinner, Col, Row, Container } from "react-bootstrap";
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
  displayOptions = {} // {title, headerText, removeButtonText, confirmButtonText, showRemoveButton, showConfirmButton}
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
    title = "Image Uploader",
    headerText = "JPG, Send Largest Photo Possible",
    removeButtonText = "Remove",
    confirmButtonText = "Upload",
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

  function handleZoomIn(event, value) {
    onChange(prevValue => {
      return { ...prevValue, zoom: prevValue.zoom + 0.1 }
    })
  }

  function handleZoomOut(event, value) {
    onChange(prevValue => {
      return { ...prevValue, zoom: prevValue.zoom - 0.1 }
    })
  }

  return (
    <Modal show={show} onHide={onCancel} size="lg" backdrop="static" centered>
      <Modal.Header closeButton style={{ borderBottom: 'none', padding: '10px 30px 10px 40px' }}>
        <Container>
          <Row style={{ padding: '30px 0px 10px 0px' }}>
            <Col md="auto" style={{ paddingLeft: '0px' }}>
              <Modal.Title style={{ color: '#212529', fontSize: '18', fontWeight: '400' }}>{title}</Modal.Title>
            </Col>
            <Col />
          </Row>
          <Row style={{ paddingBottom: '5px' }}>
            <Col xs={6} md={4} style={{ paddingLeft: '0px' }}>
              {/* <Button variant="light" style={{ fontWeight: 'bold', border: '1px solid', minWidth: '120px' }}>Change Image</Button> */}
            </Col>
            <Col />
            <Col md="auto">
              <div style={{ color: '#b3b1b1', fontSize: '14', paddingRight: '0px' }}>{headerText}</div>
            </Col>
          </Row>
        </Container>
      </Modal.Header>
      <Modal.Body style={{ height: "50vh", margin: '0px 40px' }}>
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
      <Modal.Footer style={{ borderTop: 'none', padding: '20px 40px' }}>
        <Grid container spacing={2} style={{ marginLeft: '0px', marginRight: 'auto', maxWidth: '40%' }}>
          <Grid item style={{ paddingLeft: '0px' }}>
            <RemoveCircleOutlineIcon color="disabled" onClick={handleZoomOut} />
          </Grid>
          <Grid item xs>
            <CustomSlider
              value={value ? value.zoom || 1 : 1}
              defaultValue={1}
              max={maxZoom}
              step={0.1}
              onChange={handleZoomChange}
              style={{ padding: '10px 0px 13px 0px' }}
            />
          </Grid>
          <Grid item>
            <AddCircleOutlineIcon color="disabled" onClick={handleZoomIn} />
          </Grid>
        </Grid>

        {showRemoveButton && (
          <Button variant="light" onClick={onRemove} style={{ fontWeight: 'bold', border: '1px solid', minWidth: '120px' }}>
            {removeButtonText}
          </Button>
        )}
        {showConfirmButton && (
          <Button onClick={handleConfirm} style={{ backgroundColor: '#68b921', border: '1px solid #68b921', fontWeight: 'bold', marginRight: '0px', minWidth: '120px' }}>
            {confirmButtonText}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
