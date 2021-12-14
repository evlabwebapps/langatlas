import React, {useCallback, useEffect, useState} from "react";

type GalleryProps = {
  images: Image[];
};

export type Image = {
  UID: number;
  url: string;
};

export default function Gallery(props: GalleryProps) {
  const [images, setImages] = useState<Image[]>([]);
  const [currentImage, setCurrentImage] = useState<number | null>(null);

  useEffect(() => {
    setImages(props.images);
    if (props.images.length > 0) {
      setCurrentImage(0);
    } else {
      setCurrentImage(null);
    }
  }, [props.images]);

  const nextImage = useCallback((direction: number) =>
    (_: React.MouseEvent<HTMLElement>) => {
      if (currentImage === null) {
        return;
      }
      setCurrentImage(Math.min(images.length - 1, Math.max(0, currentImage + direction)));
    }, [images, currentImage]);

  if (currentImage === null) {
    return <></>;
  }

  return <>
    <div className="d-flex justify-content-around align-items-center mb-1">
      {(currentImage > 0 && <div style={{fontSize: '2em', flexBasis: '5%', cursor: "pointer"}} onClick={nextImage(-1)}>&lt;</div>) || <div style={{flexBasis: '5%'}} />}
      <div className="d-flex flex-column align-items-center">
        <img src={process.env.REACT_APP_BACKEND_URL + "/" + images[currentImage].url}
             alt={"Parcel " + currentImage}/>
        <div>UID: {images[currentImage].UID}</div>
      </div>
      {(currentImage < images.length - 1 && <div style={{fontSize: '2em', flexBasis: '5%', cursor: "pointer"}} onClick={nextImage(1)}>&gt;</div>) || <div style={{flexBasis: '5%'}} />}
    </div>
  </>;
};
