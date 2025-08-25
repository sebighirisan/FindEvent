import { StyleSheet } from "react-native";

interface MapProps {
  lat: number;
  lng: number;
  locationName: string;
}

export default function Map({ lat, lng, locationName }: MapProps) {
  return (
    // <MapView
    //   style={styles.map}
    //   initialRegion={{
    //     latitude: lat,
    //     longitude: lng,
    //     latitudeDelta: 0.0922,
    //     longitudeDelta: 0.0421,
    //   }}
    // >
    //   <Marker
    //     title={locationName}
    //     coordinate={{
    //       latitude: lat,
    //       longitude: lng,
    //     }}
    //   ></Marker>
    // </MapView>
    <></>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
