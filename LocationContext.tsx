import { ReportDriverLocationService } from '@/services/ReportDriverLocationService';
import { logger } from '@/utils/config';
import * as Location from 'expo-location';
import React, { ReactNode, createContext, useCallback, useContext, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { useUser } from './UserContext';

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy?: number | null;
  speed?: number | null;
  heading?: number | null;
  altitude?: number | null;
  timestamp: number;
  formattedTime: string;
}

interface LocationContextType {
  lastUpdate: string | null;
  userMoved: boolean;
  distanceMoved: number;
  totalDistance: number;
  isTracking: boolean;
  hasPermission: boolean | null;
  error: Error | null;
  startTracking: (user: any) => Promise<boolean>;
  stopTracking: () => void;
  resetTracking: () => void;
  getCurrentLocation: () => Promise<LocationData | null>;
  requestLocationPermission: () => Promise<boolean>;
  calculateDistance: (lat1: number, lon1: number, lat2: number, lon2: number) => number;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

interface LocationProviderProps {
  children: ReactNode;
  threshold?: number;
  interval?: number;
}

export const LocationProvider: React.FC<LocationProviderProps> = ({ children, threshold = 161, interval = 30000 }) => {
  // --- Begin hook logic from useLocationChange ---
  const [isTracking, setIsTracking] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [userMoved, setUserMoved] = useState(false);
  const [distanceMoved, setDistanceMoved] = useState(0);
  const [totalDistance, setTotalDistance] = useState(0);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const locationSubscription = useRef<Location.LocationSubscription | null>(null);
  const lastSignificantLocation = useRef<LocationData | null>(null);
  const isInitialized = useRef<Boolean>(false);
  const currentLocationRef = useRef<LocationData | null>(null);
  const previousLocationRef = useRef<LocationData | null>(null);
  const isInitialLocationSet = useRef<boolean>(false);
  const { user } = useUser();

  const calculateDistance = useCallback((lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3;
    const toRad = (value: number) => (value * Math.PI) / 180;
    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lon2 - lon1);
    const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }, []);

  const requestLocationPermission = useCallback(async (): Promise<boolean> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      const granted = status === 'granted';
      setHasPermission(granted);
      if (!granted) {
        Alert.alert('Permission Denied', 'Location permission is required.');
      }
      return granted;
    } catch (err) {
      console.warn('Permission error:', err);
      setHasPermission(false);
      return false;
    }
  }, []);

  const getCurrentLocation = useCallback(async (): Promise<LocationData | null> => {
    const granted = await requestLocationPermission();
    if (!granted) return null;
    try {
      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      const { latitude, longitude, accuracy, speed, heading, altitude } = loc.coords;
      const newLoc: LocationData = {
        latitude,
        longitude,
        accuracy,
        speed,
        heading,
        altitude,
        timestamp: loc.timestamp,
        formattedTime: new Date(loc.timestamp).toISOString(),
      };
      return newLoc;
    } catch (err) {
      handleLocationError(err as Error);
      return null;
    }
  }, [requestLocationPermission]);

  const onLocationChange = async (location: LocationData, userParam: any, isInitial: Boolean = false) => {
    // call API for location update
    try {
      let userData = user;
      if (isInitial && (!userData || !userData?.selectedRestaurant || !userData?.user_id)) {
        userData = userParam;
      }
      if (!userData?.user_id) {
        throw new Error("User ID is required");
      }
      if (!userData?.selectedRestaurant) {
        throw new Error("Restaurant is required");
      }
      await ReportDriverLocationService.reportDriverLocationService(
        "report_driver_location",
        location.latitude,
        location.longitude,
        userData?.user_id,
        userData?.selectedRestaurant?.restaurant_id
      );
    } catch (error: any) {
      if (error instanceof Error) {
        Alert.alert("Error occured while reporting location", error.message);
      }
      logger.error("Erorr updating location with api ", error);
    }
  };

  const onSignificantMove = (location: LocationData, distance: number, totalDistance: number) => {
    //console.log('onSignificantMove', location, distance, totalDistance);
  };

  const onError = (error: Error) => {
    logger.error('error occured in location context', error.message);
  };

  const handleLocationError = useCallback(
    (err: Error) => {
      setError(err);
      onError(err);
    },
    []
  );

  const handleLocationUpdate = useCallback(
    (location: Location.LocationObject) => {
      const { latitude, longitude, accuracy, speed, heading, altitude } = location.coords;
      const timestamp = location.timestamp;
      const currentTime = new Date(timestamp).toISOString();
      //   if (accuracy && accuracy > 20) {
      //     return;
      //   }
      const newLoc: LocationData = {
        latitude,
        longitude,
        accuracy,
        speed,
        heading,
        altitude,
        timestamp,
        formattedTime: currentTime,
      };
      if (!isInitialLocationSet.current || !currentLocationRef.current) {
        currentLocationRef.current = newLoc;
        lastSignificantLocation.current = newLoc;
        isInitialLocationSet.current = true;
        setLastUpdate(currentTime);
        setError(null);
        return;
      }
      const distance = calculateDistance(
        currentLocationRef.current.latitude,
        currentLocationRef.current.longitude,
        newLoc.latitude,
        newLoc.longitude
      );
      const hasMoved = distance >= threshold;
      if (hasMoved) {
        previousLocationRef.current = currentLocationRef.current;
        currentLocationRef.current = newLoc;
        setLastUpdate(currentTime);
        setError(null);
        onLocationChange(newLoc, null);
        setUserMoved(true);
        setDistanceMoved(distance);
        setTotalDistance((prev) => prev + distance);
        lastSignificantLocation.current = newLoc;
        onSignificantMove(newLoc, distance, totalDistance + distance);
      }
    },
    [calculateDistance, threshold, totalDistance, onLocationChange, onSignificantMove]
  );

  const startTracking = useCallback(async (user: any): Promise<boolean> => {
    const granted = await requestLocationPermission();
    if (!granted) return false;
    try {
      const initialLocation = await getCurrentLocation();
      if (!initialLocation) {
        handleLocationError(new Error('Could not get initial location'));
        Alert.alert("Error getting user initial location");
        return false;
      }
      currentLocationRef.current = initialLocation;
      lastSignificantLocation.current = initialLocation;
      isInitialLocationSet.current = true;
      setLastUpdate(initialLocation.formattedTime);
      setError(null);
      onLocationChange(initialLocation, user, true);
      const sub = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: interval,
          distanceInterval: 0
        },
        (loc) => {
          handleLocationUpdate(loc)
        }
      );
      locationSubscription.current = sub;
      setIsTracking(true);
      return true;
    } catch (err) {
      handleLocationError(err as Error);
      return false;
    }
  }, [threshold, handleLocationUpdate, handleLocationError, requestLocationPermission, getCurrentLocation, onLocationChange]);

  const stopTracking = useCallback(() => {
    if (locationSubscription.current) {
      locationSubscription.current.remove();
      locationSubscription.current = null;
      setIsTracking(false);
    }
  }, []);

  const resetTracking = useCallback(() => {
    setUserMoved(false);
    setDistanceMoved(0);
    setTotalDistance(0);
    previousLocationRef.current = null;
    currentLocationRef.current = null;
    lastSignificantLocation.current = null;
    isInitialLocationSet.current = false;
    setLastUpdate(null);
    setError(null);
  }, []);

  // useEffect(() => {
  //   const sub = AppState.addEventListener('change', (state) => {
  //   });
  //   // return () => sub.remove();
  // }, []);

  const value: LocationContextType = {
    lastUpdate,
    userMoved,
    distanceMoved,
    totalDistance,
    isTracking,
    hasPermission,
    error,
    startTracking,
    stopTracking,
    resetTracking,
    getCurrentLocation,
    requestLocationPermission,
    calculateDistance,
  };

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}; 