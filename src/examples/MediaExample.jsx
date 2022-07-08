import { useLayoutEffect } from "react";
import { useRef } from "react";
import { useQuery } from "react-query";

const MediaExample = () => {
  const videoRef = useRef(null);
  const {
    data: mediaStream,
    isSuccess,
    isLoading,
    isError,
  } = useQuery(
    ["media-stream"],
    async () => {
      return navigator.mediaDevices.getUserMedia({ video: true });
    },
    {
      staleTime: Infinity,
    }
  );

  useLayoutEffect(() => {
    if (!isSuccess) return;
    videoRef.current.srcObject = mediaStream;
    videoRef.current.play();
    return () => {
      videoRef.current.stop();
    };
  }, [isSuccess, mediaStream]);

  return (
    <div>
      {isLoading ? <p>Loading...</p> : null}
      {isError ? <div>Could not load the video</div> : null}
      {isSuccess ? <video ref={videoRef} /> : null}
    </div>
  );
};

export default MediaExample;
