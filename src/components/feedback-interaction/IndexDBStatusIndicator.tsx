import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

interface IndexDBStatusIndicatorProps {
  sliceName: keyof RootState; // e.g. "tnaTask" or "anotherSlice"
  flagKey?: string;           // default: "isIndexDBStoreUpdated"
}

const IndexDBStatusIndicator = ({ sliceName, flagKey = "isIndexDBStoreUpdated" }: IndexDBStatusIndicatorProps) => {
  const isUpdated = useSelector((state: RootState) => (state[sliceName] as any)[flagKey]);

  return (
    <div style={{ position: "fixed", top: 80, right: 10 }}>
      <span
        style={{
          display: "inline-block",
          width: 12,
          height: 12,
          borderRadius: "50%",
          backgroundColor: isUpdated ? "green" : "red",
          zIndex: 1000,
        }}
        title={isUpdated ? `${sliceName} IndexDB is synced` : `${sliceName} IndexDB not synced`}
      />
    </div>
  );
};

export default IndexDBStatusIndicator;
