import React, { PureComponent } from 'react';
import ReactCrop from 'react-image-crop';
import Button from '@material-ui/core/Button';
import 'react-image-crop/dist/ReactCrop.css';
import './App.css';
import img from './images/img.jpg';

import { apiURL } from './globals';

// This is a class component because of the librally
// wont bother to refactor it to functional
class Screenshot extends PureComponent {
  state = {
    showBtn: 'none',
    src: '',
    croppedImageUrl: '',
    crop: {
      unit: '%',
      width: 30,
    },
  };

  componentDidMount() {
    console.log('component did mount!');

    const fetchData = async () => {
      try {
        const { token, userId } = localStorage;

        const response = await fetch(`${apiURL}/api/user`, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, cors, *same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        const data = await response.json();
        if (response.status === 200) {
          console.log(data);
          this.setState({
            src: data.user.cachedImg,
          });
        }
      } catch (error) {
        console.log('there was an error -> ', error);
      }
    };

    fetchData();
  }

  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // If you setState the crop in here you should return false.
  onImageLoaded = image => {
    this.imageRef = image;
  };

  onCropComplete = crop => {
    this.makeClientCrop(crop);    
  };

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        'newFile.jpeg'
      );
      this.setState({ croppedImageUrl, showBtn: 'block' });

      console.log('crop is done!');
      console.log(this.state.showBtn);
      
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, 'image/jpeg');
    });
  }

  saveCroppedScreenshot = () => {
    console.log('should save cropped screenshot');
    console.log(this.state.croppedImageUrl);
  }

  renderSelectionAddon = () => (
    <Button
      color="primary"
      type="button"
      variant="contained"
      type="button"
      style={{
        position: 'absolute',
        bottom: -45,
        right: 0,
        // display: this.state.showBtn
      }}
      onClick={this.saveCroppedScreenshot}
    >
      Save Image
    </Button>
  );

  render() {
    const { crop, croppedImageUrl, src } = this.state;

    return (
      <div>
        {/* <div>
          <input type="file" onChange={this.onSelectFile} />
        </div> */}
        {src && (
          <ReactCrop
            src={src}
            crop={crop}
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
            renderSelectionAddon={this.renderSelectionAddon}
          />
        )}

        {croppedImageUrl && (
          <img alt="Crop" style={{ width: 'auto' }} src={croppedImageUrl} />
        )}
      </div>
    );
  }
}

export default Screenshot;
