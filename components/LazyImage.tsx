import { JSX, useEffect, useRef, useState } from "react";
import type { ImgHTMLAttributes, RefObject } from "react";

type ImageTypeProps = {
  srcProp: string;
  onLazyLoading?: (image: RefObject<HTMLImageElement | null>) => void;
};
type ImageNativeProps = ImgHTMLAttributes<HTMLImageElement>;
type Props = ImageTypeProps & ImageNativeProps;

function LazyImage({ srcProp, onLazyLoading, ...props }: Props): JSX.Element {
  const nodeRef = useRef<HTMLImageElement>(null);
  const loadingSqueleton =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=";
  const [currentUrl, setCurrentUrl] = useState<string>(loadingSqueleton);

  useEffect(() => {
    if (!nodeRef.current) return;
    //1. declarar el observer
    const observer = new IntersectionObserver((entries) => {
      if (!entries) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentUrl(srcProp);
          onLazyLoading ? onLazyLoading(nodeRef) : null;
        }
      });
    });

    //2. Observar nodos
    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }
    //3. Desconectar observador cuando se desmonte el componente - evitar fugas de memoria
    return () => {
      observer.disconnect();
    };
  }, [srcProp, nodeRef]);

  return (
    <div className="m-60">
      <img src={currentUrl} ref={nodeRef} {...props} />
    </div>
  );
}

export { LazyImage };
