import { IKImage } from "imagekitio-react";

const Image = ({ path, src, alt, className, w, h }) => {
  return (
    <IKImage
      urlEndpoint={import.meta.env.VITE_URL_IK_ENDPOINT}
      path={path}
      src={src}
      transformation={[
        {
          height: h,
          width: w,
        },
      ]}
      alt={alt}
      loading="lazy"
      lqip={{ active: true, quality: 20 }}
      className={className}
    />
  );
};

export default Image;
