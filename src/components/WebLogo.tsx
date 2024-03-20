import { FunctionComponent, useMemo, type CSSProperties } from "react";

type WebLogoType = {
  dimensionLabel?: string;

  /** Style props */
  property1selfImprovementIWidth?: CSSProperties["width"];
  property1selfImprovementIHeight?: CSSProperties["height"];
  property1selfImprovementIPosition?: CSSProperties["position"];
};

const WebLogo: FunctionComponent<WebLogoType> = ({
  dimensionLabel,
  property1selfImprovementIWidth,
  property1selfImprovementIHeight,
  property1selfImprovementIPosition,
}) => {
  const property1selfImprovementIconStyle: CSSProperties = useMemo(() => {
    return {
      width: property1selfImprovementIWidth,
      height: property1selfImprovementIHeight,
      position: property1selfImprovementIPosition,
    };
  }, [
    property1selfImprovementIWidth,
    property1selfImprovementIHeight,
    property1selfImprovementIPosition,
  ]);

  return (
    <img
      className="w-6 h-6 overflow-hidden"
      alt=""
      src={dimensionLabel}
      style={property1selfImprovementIconStyle}
    />
  );
};

export default WebLogo;
