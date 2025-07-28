import { devLog } from "@/utils/helper";
import * as Calendar from 'expo-calendar';
import { useCallback, useEffect, useState } from "react";
import { Platform } from "react-native";

const DEFAULT_APP_CALENDAR = "Expo Calendar"
const GRANTED = "granted"

interface GetRemindersInterface {
    calendarIds: (null | string)[],
    status: null | Calendar.ReminderStatus,
    startDate: Date,
    endDate: Date
}

interface GetEventsInterface {
    calendarIds: string[],
    startDate: Date,
    endDate: Date
}

interface EventInterface {
    id: string,
    recurringEventOptions?: Calendar.RecurringEventOptions
}


export const useExpoCalendar = () => {
    const [isLoading, setIsLoading] = useState<boolean | undefined>(false);
    const [calendars, setCalendars] = useState<Calendar.Calendar[]>([]);

    const requestCalendarPermissions = async () => {
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        return status === GRANTED;
    }

    const getCalendarPermissions = async (): Promise<boolean> => {
        const { status } = await Calendar.getCalendarPermissionsAsync()
        return status === GRANTED;
    }

    const isCalendarAvailable = async () => {
        return Calendar.isAvailableAsync();
    }

    const requestCalendarRemindersPermission = async (): Promise<boolean> => {
        const { status } = await Calendar.requestRemindersPermissionsAsync();
        return status === GRANTED;
    }

    const getCalendarRemindersPermission = async (): Promise<boolean> => {
        const { status } = await Calendar.getRemindersPermissionsAsync();
        return status === GRANTED
    }

    const getReminders = ({ calendarIds, status, startDate, endDate }: GetRemindersInterface) => {
        const reminders = Calendar.getRemindersAsync(calendarIds, status, startDate, endDate)
    }

    const getReminder = async (id: string): Promise<Calendar.Reminder> => {
        return await Calendar.getReminderAsync(id)
    }

    const deleteReminder = async (id: string): Promise<void> => {
        return await Calendar.deleteReminderAsync(id)
    }

    const getEvents = async ({ calendarIds, startDate, endDate }: GetEventsInterface) => {
        return await Calendar.getEventsAsync(calendarIds, startDate, endDate)
    }

    const getEvent = async ({ id, recurringEventOptions }: EventInterface) => {
        return await Calendar.getEventAsync(id, recurringEventOptions)
    }

    const deleteEvent = async ({ id, recurringEventOptions }: EventInterface) => {
        return await Calendar.deleteEventAsync(id, recurringEventOptions)
    }

    const getCalendars = async () => {
        return await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
    }

    const getDefaultCalendarSource = useCallback(async () => {
        const defaultCalendar = await Calendar.getDefaultCalendarAsync();
        return defaultCalendar.source;
    }, []);

    const deleteCalendar = async (id: string) => {
        return await Calendar.deleteCalendarAsync(id)
    }

    // creating new calendar in system
    const createCalendar = async (): Promise<string> => {
        const isCalendarCreated = checkIfCalendarCreated(calendars)
        if (!getCalendarPermissions()) return "Permission not granted";
        if (isCalendarCreated) return "Calendar is already created";
        const defaultCalendarSource =
            Platform.OS === 'ios'
                ? await getDefaultCalendarSource()
                : { isLocalAccount: true, name: DEFAULT_APP_CALENDAR };
        const newCalendarID = await Calendar.createCalendarAsync({
            title: DEFAULT_APP_CALENDAR,
            color: 'blue',
            entityType: Calendar.EntityTypes.EVENT,
            sourceId: defaultCalendarSource?.id,
            source: defaultCalendarSource,
            name: 'internalCalendarName',
            ownerAccount: 'personal',
            accessLevel: Calendar.CalendarAccessLevel.OWNER,
        });
        console.log(`Your new calendar ID is: ${newCalendarID}`);
        return newCalendarID;
    }

    // creating new event in calendar
    const createCalendarEventAsync = async (calendarId: string) => {
        setIsLoading(true);
        const creationDate = new Date();
        const startDate = new Date();
        const endDate = new Date();
        endDate.setMinutes(endDate.getMinutes() + 4);
        try {
            const eventResponse = await Calendar.createEventInCalendarAsync({
                alarms: [
                    {
                        relativeOffset: -2, // 2 minutes before time give alarm
                        method: Calendar.AlarmMethod.ALERT,
                    },
                ],
                // allDay: true, // overrides the start and end time
                availability: Calendar.Availability.FREE,
                calendarId: calendarId,
                creationDate: creationDate,
                endDate: endDate,
                isDetached: true,
                notes: "This is a custom event from expo calendar",
                startDate: startDate,
                title: "This is expo event",
            })
            devLog("Event created and its id is :: ", eventResponse);
            setIsLoading(false);
            return eventResponse;
        } catch (error) {
            devLog("Error creating event :: ", { error });
            setIsLoading(false);
            return error
        }
    }

    //creating new reminder in calendar
    const createCalendarReminder = async (calendarId: string) => {
        setIsLoading(true);
        const creationDate = new Date();
        const startDate = new Date();
        const endDate = new Date();
        endDate.setMinutes(endDate.getMinutes() + 4);
        try {
            const reminderResponse = await Calendar.createReminderAsync(calendarId, {
                alarms: [
                    {
                        relativeOffset: -2, // 2 minutes before time give alarm
                        method: Calendar.AlarmMethod.ALERT,
                    },
                ],
                calendarId: calendarId,
                completed: false,
                // completionDate
                creationDate: creationDate,
                notes: "This is a custom reminder from expo calendar",
                startDate: startDate,
                title: "This is expo reminder",
            });
            setIsLoading(false);
            return reminderResponse;
        } catch (error) {
            devLog("Reminder creation error :: ", { error });
            setIsLoading(false);
            return error;
        }
    }

    //dialogs
    // open event in calendar
    const openEventInCalendar = async ({ id, instanceStartDate, allowsCalendarPreview, allowsEditing }: Calendar.CalendarDialogParams & Calendar.OpenEventPresentationOptions) => {
        const response = await Calendar.openEventInCalendarAsync({ id, instanceStartDate }, { allowsCalendarPreview, allowsEditing })
        return response;
    }

    const editEventInCalendar = async ({ id, instanceStartDate, startNewActivityTask }: Calendar.CalendarDialogParams & Calendar.PresentationOptions) => {
        const response = await Calendar.editEventInCalendarAsync({ id, instanceStartDate }, { startNewActivityTask });
        return response
    }

    useEffect(() => {
        const handleCalendarPermissionAndCreation = async (): Promise<void> => {
            if (!isCalendarAvailable()) {
                devLog("calendar is not available", { isCalendarAvailable: isCalendarAvailable() })
                return;
            }
            await requestCalendarPermissions();
            const calendars = await getCalendars();
            setCalendars(calendars);
            createCalendar()
        }
        handleCalendarPermissionAndCreation()
    }, []);

    return { createCalendar, createCalendarEventAsync, createCalendarReminder, isLoading };
};

const checkIfCalendarCreated = (calendars: Calendar.Calendar[]): boolean => {
    const calendar: Calendar.Calendar | undefined = calendars.find((item: Calendar.Calendar) => item.title === DEFAULT_APP_CALENDAR)
    if (calendar) {
        return true;
    } else {
        return false
    }
}