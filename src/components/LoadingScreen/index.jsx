import { Puff } from "react-loader-spinner";

export default function LoadingScreen() {
  return (
    <div>
      <Puff
        height="120"
        width="120"
        radius={1}
        color="#c4c4c4"
        ariaLabel="puff-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}
