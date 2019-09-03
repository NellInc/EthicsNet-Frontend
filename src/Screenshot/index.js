import React, { PureComponent } from 'react';
import ReactCrop from 'react-image-crop';
import Button from '@material-ui/core/Button';
import 'react-image-crop/dist/ReactCrop.css';
import '../App.css';

import { apiURL } from '../globals';
import { Loader } from '../components';

// This is a class component because of the librally
// wont bother to refactor it to functional
class Screenshot extends PureComponent {
  state = {
    showBtn: 'none',
    loading: true,
    src: '',
    croppedImageUrl: '',
    imageFont: '',
    crop: {
      unit: '%',
      width: 30,
    },
  };

  componentDidMount() {
    console.log('component did mount!');

    const fetchData = async () => {
      try {
        const { token } = localStorage;

        const response = await fetch(`${apiURL}/api/user`, {
          method: 'GET',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.status === 200) {
          console.log(data);
          this.setState({
            src: data.user.cachedImg,
            imageFont: data.user.imageFont,
            loading: false
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

    const base64Image = canvas.toDataURL('image/jpeg');
    return base64Image;

    // return new Promise((resolve, reject) => {
    //   canvas.toBlob(blob => {
    //     if (!blob) {
    //       //reject(new Error('Canvas is empty'));
    //       console.error('Canvas is empty');
    //       return;
    //     }
    //     blob.name = fileName;
    //     window.URL.revokeObjectURL(this.fileUrl);
    //     this.fileUrl = window.URL.createObjectURL(blob);
    //     resolve(this.fileUrl);
    //   }, 'image/jpeg');
    // });
  }

  saveCroppedScreenshot = () => {
    console.log('\n\n\nshould save cropped screenshot');
    console.log(this.state.croppedImageUrl);
    localStorage.img = this.state.croppedImageUrl;
    localStorage.imageFont = this.state.imageFont;

    this.props.history.push('./save')
  }

  renderSelectionAddon = () => (
    <Button
      color="primary"
      type="button"
      variant="contained"
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

    if (this.state.loading) {
      return <Loader />
    }

    return (
      <div style={{
        position: 'absolute',
        width: '100%',
        left: '0',
        top: '82px'
      }}>
        <h4 style={{backgroundColor: 'red', textAlign: 'center'}}>If the image hasn't loaded or if it's an old image, plese reload the page in a few seconds</h4>
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
