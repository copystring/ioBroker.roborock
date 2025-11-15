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
     * Handles simple, parameter-less commands like start, stop, pause, dock.
     */
    private handleSimpleCommand;
    /**
     * Handles 'app_goto_target' command.
     */
    private handleGotoTarget;
    /**
     * Handles 'app_zoned_clean' command.
     */
    private handleZonedClean;
}
