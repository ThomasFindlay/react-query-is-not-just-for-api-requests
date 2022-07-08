const MediaExample = () => {
  const { data: mediaStream, isError } = useQuery(
    ['media-stream'],
    async () => {
      return navigator.mediaDevices.getUserMedia({ video: true });
    },
    {
      staleTime: Infinity,
    }
  );

  return (
    <div>
      {isError ? (
        <div>Could not load the video</div>
      ) : (
        <video src={mediaStream} />
      )}
    </div>
  );
};

export default MediaExample;
