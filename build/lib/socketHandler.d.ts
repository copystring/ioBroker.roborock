import { Roborock } from "../main";
export declare class socketHandler {
    private adapter;
    private commandHandlers;
    constructor(adapterInstance: Roborock);
    /**
     * Handles incoming 'sendTo' messages.
     * Routes commands to the appropriate handler using the commandHandlers map.
     * @param obj The message object
     */
    handleMessage(obj: ioBroker.Message): Promise<void>;
    /**
     * Handles 'get_obstacle_image' command.
     */
    private handleGetObstacleImage;
    /**
     * Fetches robot list.
     */
    private handleGetDeviceList;
    /**
     * Handles simple commands.
     */
    private handleSimpleCommand;
    /**
     * Handles 'app_goto_target'.
     */
    private handleGotoTarget;
    /**
     * Handles 'app_zoned_clean'.
     */
    private handleZonedClean;
}
