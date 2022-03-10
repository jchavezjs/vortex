import {message} from 'antd';

export const normFile = e => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

export const beforeUpload = file => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
      message.error('Solo puedes utilizar imágenes JPG o PNG');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
      message.error('La imagen debe ser menor a 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

export const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

export const dummyRequest = ({file, onSuccess}, handlePreview) => {
  setTimeout(() => {
    getBase64(file, imageUrl => {
      handlePreview(imageUrl);
    });
    onSuccess("ok");
  }, 0);
};
