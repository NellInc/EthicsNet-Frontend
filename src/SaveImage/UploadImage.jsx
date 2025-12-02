// import React from 'react';
// import ImageUploader from 'react-images-upload';

// export default class UploadImage extends React.Component {

//     constructor(props) {
//         super(props);
//          this.state = { pictures: [] };
//          this.onDrop = this.onDrop.bind(this);
//     }

//     onDrop(picture) {
//         this.setState({
//             pictures: this.state.pictures.concat(picture),
//         });

//         console.log('====================================');
//         console.log('pictures -> ', this.state.pictures);
//         console.log('====================================');
//     }

//     render() {
//         return (
//             <ImageUploader
//                 withIcon={true}
//                 buttonText='Choose images'
//                 onChange={this.onDrop}
//                 imgExtension={['.jpg', '.gif', '.png', '.gif']}
//                 maxFileSize={5242880}
//             />
//         );
//     }
// }

import React from 'react';

import FileBase64 from 'react-file-base64';

export default class UploadImage extends React.Component {
  constructor() {
    super();
    this.state = {
      files: {},
    };
  }

  // Callback~
  getFiles(files) {
    this.setState({ files: files });
    this.props.getImage(files.base64);
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <FileBase64 multiple={false} onDone={this.getFiles.bind(this)} />
        <img
          style={{
            maxWidth: '100%',
          }}
          src={this.state.files.base64}
          alt=''
          srcSet=''
        />
      </div>
    );
  }
}
