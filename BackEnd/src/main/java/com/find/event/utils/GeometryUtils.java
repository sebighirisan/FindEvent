package com.find.event.utils;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class GeometryUtils {
    private static final GeometryFactory geometryFactory = new GeometryFactory();

    public static Point createPoint(Double latitude, Double longitude) {
        return geometryFactory.createPoint(new Coordinate(longitude, latitude));
    }
}
