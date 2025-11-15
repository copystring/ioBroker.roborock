import { Roborock } from "../main";
export declare class socketHandler {
    private adapter;
    private commandHandlers;
    constructor(adapterInstance: Roborock);
    /**
     * Handles all incoming messages from 'sendTo' (e.g., from Admin or Vis).
     * Routes commands to the appropriate handler using the commandHandlers map.
     * @param obj The message object
     */
    handleMessage(obj: ioBroker.Message): Promise<void>;
    /**
     * Handles the 'get_obstacle_image' command.
     * This method manages its own try/catch and response due to its complexity.
     */
    private handleGetObstacleImage;
    /**
     * Fetches the list of robot devices from the adapter's objects.
     */
    private handleGetDeviceList;
    /**
     * Handles 'app_start' command.
     */
    private handleAppStart;
    /**
     * Handles 'app_zoned_clean' command.
     */
    private handleAppZonedClean;
}
