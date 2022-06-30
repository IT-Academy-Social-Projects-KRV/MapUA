import * as L from 'leaflet';
import { createPathComponent } from '@react-leaflet/core';
import 'leaflet.markercluster';

const MarkerClusterGroup = createPathComponent(
  ({ children: _c, ...props }, ctx) => {
    const clusterProps: Record<string, string> = {};
    const clusterEvents: Record<string, any> = {};

    Object.entries(props).forEach(([propName, prop]) => {
      // eslint-disable-next-line no-unused-expressions
      propName.startsWith('on')
        ? (clusterEvents[propName] = prop)
        : (clusterProps[propName] = prop);
    });

    const markerClusterGroup = L.markerClusterGroup(clusterProps);

    Object.entries(clusterEvents).forEach(([eventAsProp, callback]) => {
      const clusterEvent = `cluster${eventAsProp.substring(2).toLowerCase()}`;
      markerClusterGroup.on(clusterEvent, callback);
    });

    return {
      instance: markerClusterGroup,
      context: { ...ctx, layerContainer: markerClusterGroup }
    };
  }
);

export default MarkerClusterGroup;
